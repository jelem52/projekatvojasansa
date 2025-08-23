/*
  # Add download tokens system

  1. New Tables
    - `download_tokens`
      - `id` (uuid, primary key)
      - `email` (text, customer email)
      - `token` (text, unique download token)
      - `expires_at` (timestamp, token expiration)
      - `downloaded_at` (timestamp, when file was downloaded)
      - `is_used` (boolean, whether token has been used)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `download_tokens` table
    - Add policy for public access to valid tokens only

  3. Changes
    - Tokens expire 24 hours after creation
    - Tokens become invalid after first download
*/

CREATE TABLE IF NOT EXISTS download_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  token text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  downloaded_at timestamptz DEFAULT NULL,
  is_used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;

-- Allow public access to valid tokens for download
CREATE POLICY "Allow access to valid download tokens"
  ON download_tokens
  FOR SELECT
  TO anon, authenticated
  USING (
    NOT is_used 
    AND downloaded_at IS NULL 
    AND expires_at > now()
  );

-- Allow service role to manage tokens
CREATE POLICY "Service role can manage tokens"
  ON download_tokens
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_download_tokens_token ON download_tokens(token);
CREATE INDEX IF NOT EXISTS idx_download_tokens_expires_at ON download_tokens(expires_at);