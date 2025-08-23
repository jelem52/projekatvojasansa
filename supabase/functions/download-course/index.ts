import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders });
    }

    if (req.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new Response(
        'Invalid or missing download token',
        { status: 400, headers: corsHeaders }
      );
    }

    // Verify the token and check if it's valid
    const { data: tokenData, error: tokenError } = await supabase
      .from('download_tokens')
      .select('*')
      .eq('token', token)
      .single();

    if (tokenError || !tokenData) {
      return new Response(
        'Invalid download token',
        { status: 404, headers: corsHeaders }
      );
    }

    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return new Response(
        'Download link has expired',
        { status: 410, headers: corsHeaders }
      );
    }

    // Check if token has already been used
    if (tokenData.is_used || tokenData.downloaded_at) {
      return new Response(
        'Download link has already been used',
        { status: 410, headers: corsHeaders }
      );
    }

    // Mark token as used
    const { error: updateError } = await supabase
      .from('download_tokens')
      .update({
        is_used: true,
        downloaded_at: new Date().toISOString(),
      })
      .eq('token', token);

    if (updateError) {
      console.error('Error updating token:', updateError);
      return new Response(
        'Error processing download',
        { status: 500, headers: corsHeaders }
      );
    }

    // Replace this with your actual Google Docs link
    // You can also redirect to a Google Drive download link if you have the file stored there
    const googleDocsLink = 'https://docs.google.com/document/d/YOUR_GOOGLE_DOCS_ID/edit?usp=sharing';
    
    // For a direct download, you might want to use a Google Drive direct download link:
    // const googleDriveDownloadLink = 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID';

    // Redirect to the Google Docs link
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': googleDocsLink,
      },
    });

  } catch (error: any) {
    console.error('Error processing download:', error);
    return new Response(
      'Internal server error',
      { status: 500, headers: corsHeaders }
    );
  }
});