import { supabase } from '@/lib/supabase';

type FileLink = { name: string; url: string };

type EmailPayload =
  | { type: 'inquiry'; data: Record<string, unknown> }
  | {
      type: 'application';
      data: Record<string, unknown> & { files?: FileLink[] };
    }
  | { type: 'contact'; data: Record<string, unknown> };

/**
 * Calls the send-form-email edge function to forward a submission to the
 * school email. Fire-and-forget — we don't want an email failure to block
 * the form's success state since the data is already saved in the database.
 */
export async function sendFormEmail(payload: EmailPayload): Promise<void> {
  try {
    const { data, error } = await supabase.functions.invoke(
      'send-form-email',
      { body: payload },
    );
    if (error) {
      console.warn('Email notification failed:', error.message);
    }
    void data;
  } catch (err) {
    console.warn('Email notification failed:', err);
  }
}
