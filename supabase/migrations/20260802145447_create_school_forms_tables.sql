/*
# Create tables for AMFUS school website forms

1. New Tables
- `inquiries` — quick admission inquiries submitted from the website.
  - id (uuid, primary key)
  - name (text, not null) — full name of the inquirer
  - email (text, not null) — contact email
  - phone (text, not null) — contact phone number
  - level (text, not null) — class/level of interest
  - message (text, not null) — inquiry message
  - created_at (timestamptz, default now())
- `applications` — full admission applications submitted from the website.
  - id (uuid, primary key)
  - applicant_name (text, not null) — applicant full name
  - guardian_name (text, not null) — parent/guardian name
  - email (text, not null) — contact email
  - phone (text, not null) — contact phone number
  - level (text, not null) — desired class/level
  - start_date (date, not null) — desired start date
  - previous_school (text) — previous school if any
  - notes (text) — application notes or special requests
  - created_at (timestamptz, default now())
- `contact_messages` — general contact messages submitted from the website.
  - id (uuid, primary key)
  - name (text, not null) — sender name
  - email (text, not null) — sender email
  - phone (text) — optional phone number
  - subject (text, not null) — message subject
  - message (text, not null) — message body
  - created_at (timestamptz, default now())

2. Security
- This is a public, no-auth school website. All forms are submitted by anonymous visitors.
- Enable RLS on all three tables.
- Allow anon + authenticated INSERT only (public visitors can submit forms).
- No SELECT/UPDATE/DELETE for anon — form data is private to school staff (managed via dashboard/SQL), not exposed to the public site.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  level text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries"
ON inquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name text NOT NULL,
  guardian_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  level text NOT NULL,
  start_date date NOT NULL,
  previous_school text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_applications" ON applications;
CREATE POLICY "anon_insert_applications"
ON applications FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated WITH CHECK (true);