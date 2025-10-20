/*
  # Cargo Labels Tracking Table

  1. New Tables
    - `cargo_labels`
      - `id` (uuid, primary key) - Unique identifier
      - `recipient_info` (text) - Recipient information
      - `items` (jsonb) - Array of ordered items with product, weight, quantity, grind type
      - `created_at` (timestamptz) - When the label was created/printed
      - `email_sent` (boolean) - Whether this label was included in daily email
      - `sent_at` (timestamptz) - When the daily email was sent

  2. Security
    - Enable RLS on `cargo_labels` table
    - Add policy for inserting new cargo labels (public access for simplicity)
    - Add policy for reading cargo labels (authenticated access)

  3. Indexes
    - Index on created_at for efficient date queries
    - Index on email_sent for filtering unsent labels
*/

CREATE TABLE IF NOT EXISTS cargo_labels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_info text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  email_sent boolean DEFAULT false,
  sent_at timestamptz
);

ALTER TABLE cargo_labels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert cargo labels"
  ON cargo_labels
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read cargo labels"
  ON cargo_labels
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update cargo labels"
  ON cargo_labels
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_cargo_labels_created_at ON cargo_labels(created_at);
CREATE INDEX IF NOT EXISTS idx_cargo_labels_email_sent ON cargo_labels(email_sent);
