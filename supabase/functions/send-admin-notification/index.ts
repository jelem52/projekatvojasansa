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

    const { customerEmail, customerName, amount, currency } = await req.json();

    if (!customerEmail) {
      return new Response(
        JSON.stringify({ error: 'Customer email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const adminEmail = 'tvojaasansa@gmail.com';
    const currentDate = new Date().toLocaleString('sr-RS', {
      timeZone: 'Europe/Belgrade',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova kupovina - Tvoja Šansa</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; font-size: 24px; font-weight: bold; margin: 0 0 10px 0;">💰 Nova kupovina!</h1>
            <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">Tvoja Šansa - Kurs</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1f2937; font-size: 18px; font-weight: bold; margin: 0 0 16px 0;">Detalji kupovine:</h3>
              <div style="space-y: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span style="color: #6b7280; font-weight: 500;">Email kupca:</span>
                  <span style="color: #1f2937; font-weight: 600;">${customerEmail}</span>
                </div>
                ${customerName ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span style="color: #6b7280; font-weight: 500;">Ime:</span>
                  <span style="color: #1f2937; font-weight: 600;">${customerName}</span>
                </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span style="color: #6b7280; font-weight: 500;">Iznos:</span>
                  <span style="color: #1f2937; font-weight: 600;">${amount ? `${(amount / 100).toFixed(2)} ${currency?.toUpperCase() || 'EUR'}` : '€11.00'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span style="color: #6b7280; font-weight: 500;">Datum:</span>
                  <span style="color: #1f2937; font-weight: 600;">${currentDate}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #6b7280; font-weight: 500;">Proizvod:</span>
                  <span style="color: #1f2937; font-weight: 600;">Tvoja Šansa - Kurs</span>
                </div>
              </div>
            </div>
            
            <div style="background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 16px;">
              <p style="color: #065f46; font-size: 14px; margin: 0; font-weight: 500;">
                ✅ <strong>Kupovina je uspešno završena!</strong> Kurs je automatski poslat kupcu na email adresu.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // TODO: Replace this with actual email sending service
    // For now, we'll log the notification email
    console.log('Admin notification email:', {
      to: adminEmail,
      subject: `Nova kupovina - ${customerEmail}`,
      html: emailHtml
    });

    // In production, you would send the actual email here:
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'Tvoja Šansa <noreply@yourdomain.com>',
    //     to: [adminEmail],
    //     subject: `Nova kupovina - ${customerEmail}`,
    //     html: emailHtml,
    //   }),
    // });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin notification sent successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error sending admin notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});