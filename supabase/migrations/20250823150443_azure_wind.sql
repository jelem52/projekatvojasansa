/*
  # Remove authentication-related tables and simplify schema

  1. Changes
    - Remove stripe_subscriptions table (not needed for one-time payments)
    - Remove user_id from stripe_customers (no user accounts)
    - Remove auth-related views
    - Keep only stripe_customers and stripe_orders for payment tracking

  2. Security
    - Remove RLS policies since no user authentication
    - Keep basic table structure for payment tracking
*/

-- Drop views that depend on user authentication
DROP VIEW IF EXISTS stripe_user_subscriptions;
DROP VIEW IF EXISTS stripe_user_orders;

-- Drop subscription table (not needed for one-time payments)
DROP TABLE IF EXISTS stripe_subscriptions;

-- Modify stripe_customers table to remove user_id dependency
DO $$
BEGIN
  -- Remove foreign key constraint if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'stripe_customers_user_id_fkey' 
    AND table_name = 'stripe_customers'
  ) THEN
    ALTER TABLE stripe_customers DROP CONSTRAINT stripe_customers_user_id_fkey;
  END IF;

  -- Remove user_id column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stripe_customers' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE stripe_customers DROP COLUMN user_id;
  END IF;

  -- Add email column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stripe_customers' AND column_name = 'email'
  ) THEN
    ALTER TABLE stripe_customers ADD COLUMN email text;
  END IF;
END $$;

-- Disable RLS on all tables since we don't have user authentication
ALTER TABLE stripe_customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_orders DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own customer data" ON stripe_customers;
DROP POLICY IF EXISTS "Users can view their own subscription data" ON stripe_subscriptions;
DROP POLICY IF EXISTS "Users can view their own order data" ON stripe_orders;