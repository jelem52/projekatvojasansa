import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    const { email, customerName } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pristup kursu - Tvoja Šansa</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #ec4899 0%, #ef4444 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0 0 10px 0;">Dobrodošao u "Tvoja Šansa"! 🎉</h1>
            <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">Tvoja transformacija počinje sada</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Pozdrav${customerName ? ` ${customerName}` : ''},
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              Čestitamo na kupovini kursa "Tvoja Šansa"! Vaša kupovina je uspešno završena.
            </p>
            
            <div style="background-color: #f1f5f9; border-radius: 12px; padding: 24px; margin: 30px 0;">
              <h3 style="color: #1f2937; font-size: 18px; font-weight: bold; margin: 0 0 16px 0;">Pristup kursu:</h3>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
                Kontaktiraćemo vas uskoro sa linkom za pristup kursu preko Instagram-a ili email-a.
              </p>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">
                Pratite nas na 
                <a href="https://www.instagram.com/tvojaa_sansa" style="color: #ec4899; text-decoration: none;">@tvojaa_sansa</a>
                za najnovije savete i ažuriranja.
              </p>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
              Ukoliko imate bilo kakva pitanja, slobodno nas kontaktirajte preko Instagram-a 
              <a href="https://www.instagram.com/tvojaa_sansa" style="color: #ec4899; text-decoration: none;">@tvojaa_sansa</a>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2024 Tvoja šansa. Sva prava zadržana.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Tvoja Šansa <noreply@tvojasansa.com>',
        to: [email],
        subject: 'Pristup kursu - Tvoja Šansa 🎉',
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Resend API error:', errorData);
      throw new Error(`Failed to send email: ${errorData.message || 'Unknown error'}`);
    }

    const emailResult = await emailResponse.json();
    console.log('Course email sent successfully:', emailResult.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Course email sent successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error sending course email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});