/*
# Create storage bucket for admission application files

1. New Storage Bucket
- `application-files` — stores documents uploaded with admission applications
  (birth certificates, transcripts, medical certificates, photos, etc.)
- Public bucket so files can be accessed via signed URLs from the edge function
  when building the email notification.

2. Security
- Enable RLS-style storage policies on the bucket.
- Allow anon + authenticated to INSERT (upload) files — visitors submit forms anonymously.
- Allow anon + authenticated to SELECT (read) files — needed to generate public URLs
  for the email notification.
- No UPDATE/DELETE for anon — files are immutable once uploaded.

3. Important Notes
- Files are stored with a unique folder per submission to avoid name collisions.
- The bucket is public so the edge function can fetch file URLs without needing
  a service role key for read access.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('application-files', 'application-files', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "anon_upload_application_files" ON storage.objects;
CREATE POLICY "anon_upload_application_files"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'application-files');

DROP POLICY IF EXISTS "anon_read_application_files" ON storage.objects;
CREATE POLICY "anon_read_application_files"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'application-files');
