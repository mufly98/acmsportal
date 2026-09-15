import { useState, type FormEvent } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { sendFormEmail } from '@/lib/email';
import { contactInfo } from '@/data/school';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        subject: form.subject,
        message: form.message,
      });
      if (error) throw error;
      void sendFormEmail({ type: 'contact', data: form });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative bg-white py-24 lg:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Get in Touch</span>
          <h2 className="section-title mt-3">Contact Us</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Have a question or want to visit our campus? We'd love to hear from
            you.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          {/* Info cards */}
          <div className="reveal space-y-5 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-stone-50 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPin className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">Our Address</h3>
                  <address className="mt-1 space-y-0.5 not-italic text-sm leading-relaxed text-slate-600">
                    {contactInfo.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-stone-50 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                  <Phone className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">Phone Numbers</h3>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    {contactInfo.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p}`}
                        className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-700"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-stone-50 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Mail className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">Email</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="mt-1 block text-sm font-medium text-slate-600 transition-colors hover:text-brand-700"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-stone-50 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <Clock className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">Office Hours</h3>
                  <div className="mt-1 space-y-0.5 text-sm text-slate-600">
                    {contactInfo.hours.map((h) => (
                      <p key={h}>{h}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal lg:col-span-3" style={{ transitionDelay: '0.1s' }}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input-field"
                    placeholder="0801 234 5678"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="input-field"
                    placeholder="How can we help?"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Write your message..."
                />
              </div>

              {status === 'success' && (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  Your message has been sent. We'll get back to you shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
                  <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
                  Something went wrong. Please try again or call us.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary mt-6 w-full sm:w-auto"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
