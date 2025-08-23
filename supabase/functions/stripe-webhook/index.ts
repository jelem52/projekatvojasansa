import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

Deno.serve(async (req) => {
  try {
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // get the signature from the header
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return new Response('No signature found', { status: 400 });
    }

    // get the raw body
    const body = await req.text();

    // verify the webhook signature
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    EdgeRuntime.waitUntil(handleEvent(event));

    return Response.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function handleEvent(event: Stripe.Event) {
  const stripeData = event?.data?.object ?? {};

  if (!stripeData) {
    return;
  }

  if (!('customer' in stripeData)) {
    return;
  }

  // Handle successful one-time payments
  if (event.type === 'checkout.session.completed') {
    const session = stripeData as Stripe.Checkout.Session;
    
    if (session.mode === 'payment' && session.payment_status === 'paid') {
      try {
        // Store the order in database
        const { error: orderError } = await supabase.from('stripe_orders').insert({
          checkout_session_id: session.id,
          payment_intent_id: session.payment_intent as string,
          customer_id: session.customer as string,
          amount_subtotal: session.amount_subtotal || 0,
          amount_total: session.amount_total || 0,
          currency: session.currency || 'eur',
          payment_status: session.payment_status,
          status: 'completed',
        });

        if (orderError) {
          console.error('Error inserting order:', orderError);
          return;
        }

        // Get customer email from Stripe
        const customer = await stripe.customers.retrieve(session.customer as string);
        const customerEmail = 'email' in customer ? customer.email : null;

        if (customerEmail) {
          // Send course access email to customer
          const emailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-course-email`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: customerEmail,
              customerName: 'name' in customer ? customer.name : null,
            }),
          });

          if (!emailResponse.ok) {
            console.error('Failed to send course email');
          } else {
            console.log('Course email sent successfully to:', customerEmail);
          }

          // Send admin notification email
          const adminNotificationResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-admin-notification`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerEmail: customerEmail,
              customerName: 'name' in customer ? customer.name : null,
              amount: session.amount_total,
              currency: session.currency,
            }),
          });

          if (!adminNotificationResponse.ok) {
            console.error('Failed to send admin notification');
          } else {
            console.log('Admin notification sent successfully');
          }
        }

        console.info(`Successfully processed one-time payment for session: ${session.id}`);
      } catch (error) {
        console.error('Error processing one-time payment:', error);
      }
    }
  }
}