import { useState, type FormEvent } from 'react';
import {
  ClipboardList,
  FileText,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Upload,
  X,
  FileCheck2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { sendFormEmail } from '@/lib/email';
import {
  admissionRequirements,
  admissionSchedule,
  academicSections,
  resultsCheckerUrl,
} from '@/data/school';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const allLevels = academicSections
  .filter((s) => s.id !== 'cocurricular')
  .flatMap((s) => s.levels);

const applicationLevels = [
  'Playgroup',
  'Pre Nursery',
  'Nursery 1',
  'Primary 1',
  'Primary 3',
  'Primary 5',
  'JSS1',
  'SS 1',
  'SS 3',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/pdf',
  'image/webp',
];

type UploadedFile = {
  file: File;
  label: string;
  url: string;
};

export default function Admissions() {
  const [tab, setTab] = useState<'inquiry' | 'application'>('inquiry');

  // Inquiry form
  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    phone: '',
    level: allLevels[0],
    message: '',
  });
  const [inquiryStatus, setInquiryStatus] = useState<FormStatus>('idle');

  // Application form
  const [application, setApplication] = useState({
    applicant_name: '',
    guardian_name: '',
    email: '',
    phone: '',
    level: applicationLevels[0],
    start_date: '',
    previous_school: '',
    notes: '',
  });
  const [appStatus, setAppStatus] = useState<FormStatus>('idle');

  // File uploads
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError(null);
    setIsUploading(true);

    const newFiles: UploadedFile[] = [];

    for (const file of Array.from(files)) {
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`${file.name} is too large. Maximum size is 10 MB.`);
        continue;
      }
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setUploadError(
          `${file.name} is not a supported format. Please upload PDF, JPG, PNG, or WebP files.`,
        );
        continue;
      }

      const folder = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `${folder}/${safeName}`;

      const { error } = await supabase.storage
        .from('application-files')
        .upload(path, file);

      if (error) {
        setUploadError(`Failed to upload ${file.name}. Please try again.`);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('application-files')
        .getPublicUrl(path);

      newFiles.push({ file, label: file.name, url: urlData.publicUrl });
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setIsUploading(false);
    e.target.value = '';
  };

  const removeFile = (idx: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleInquiry = async (e: FormEvent) => {
    e.preventDefault();
    setInquiryStatus('submitting');
    try {
      const { error } = await supabase.from('inquiries').insert({
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        level: inquiry.level,
        message: inquiry.message,
      });
      if (error) throw error;
      void sendFormEmail({ type: 'inquiry', data: inquiry });
      setInquiryStatus('success');
      setInquiry({
        name: '',
        email: '',
        phone: '',
        level: allLevels[0],
        message: '',
      });
    } catch {
      setInquiryStatus('error');
    }
  };

  const handleApplication = async (e: FormEvent) => {
    e.preventDefault();
    setAppStatus('submitting');
    try {
      const { error } = await supabase.from('applications').insert({
        applicant_name: application.applicant_name,
        guardian_name: application.guardian_name,
        email: application.email,
        phone: application.phone,
        level: application.level,
        start_date: application.start_date,
        previous_school: application.previous_school || null,
        notes: application.notes || null,
      });
      if (error) throw error;

      const fileLinks = uploadedFiles.map((f) => ({
        name: f.label,
        url: f.url,
      }));

      void sendFormEmail({
        type: 'application',
        data: { ...application, files: fileLinks },
      });
      setAppStatus('success');
      setApplication({
        applicant_name: '',
        guardian_name: '',
        email: '',
        phone: '',
        level: applicationLevels[0],
        start_date: '',
        previous_school: '',
        notes: '',
      });
      setUploadedFiles([]);
    } catch {
      setAppStatus('error');
    }
  };

  return (
    <section id="admissions" className="relative bg-white py-24 lg:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Join Us</span>
          <h2 className="section-title mt-3">Admissions</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Begin your journey with ACMS Portal. Submit an inquiry or a full
            application and our admissions team will reach out to you.
          </p>
        </div>

        {/* Schedule + Requirements */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="reveal rounded-2xl border border-slate-200 bg-stone-50 p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Calendar className="h-6 w-6" />
              </span>
              <h3 className="font-serif text-xl font-semibold text-slate-900">
                Admission Schedule
              </h3>
            </div>
            <dl className="mt-5 space-y-3">
              {admissionSchedule.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Clock className="h-4 w-4 text-brand-500" />
                    {item.label}
                  </dt>
                  <dd className="text-sm font-semibold text-slate-900">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal rounded-2xl border border-slate-200 bg-stone-50 p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                <ClipboardList className="h-6 w-6" />
              </span>
              <h3 className="font-serif text-xl font-semibold text-slate-900">
                Requirements
              </h3>
            </div>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {admissionRequirements.map((req) => (
                <li
                  key={req}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Results checker */}
        <div className="reveal mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-brand-200 bg-brand-50/60 p-6 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Search className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                Check Results Online
              </h3>
              <p className="text-sm text-slate-600">
                View examination and term results on the ACMS Portal results hub.
              </p>
            </div>
          </div>
          <a
            href={resultsCheckerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary whitespace-nowrap"
          >
            Check Results
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Forms */}
        <div className="reveal mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-stone-50">
            <button
              onClick={() => setTab('inquiry')}
              className={`flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-semibold transition-colors ${tab === 'inquiry'
                  ? 'border-b-2 border-brand-600 bg-white text-brand-700'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              <FileText className="h-4 w-4" />
              Quick Inquiry
            </button>
            <button
              onClick={() => setTab('application')}
              className={`flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-semibold transition-colors ${tab === 'application'
                  ? 'border-b-2 border-brand-600 bg-white text-brand-700'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              <ClipboardList className="h-4 w-4" />
              Full Application
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {tab === 'inquiry' ? (
              <form onSubmit={handleInquiry} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      value={inquiry.name}
                      onChange={(e) =>
                        setInquiry({ ...inquiry, name: e.target.value })
                      }
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
                      value={inquiry.email}
                      onChange={(e) =>
                        setInquiry({ ...inquiry, email: e.target.value })
                      }
                      className="input-field"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      value={inquiry.phone}
                      onChange={(e) =>
                        setInquiry({ ...inquiry, phone: e.target.value })
                      }
                      className="input-field"
                      placeholder="0801 234 5678"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Class of Interest
                    </label>
                    <select
                      value={inquiry.level}
                      onChange={(e) =>
                        setInquiry({ ...inquiry, level: e.target.value })
                      }
                      className="input-field"
                    >
                      {allLevels.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={inquiry.message}
                    onChange={(e) =>
                      setInquiry({ ...inquiry, message: e.target.value })
                    }
                    className="input-field resize-none"
                    placeholder="Tell us what you'd like to know..."
                  />
                </div>

                <StatusBanner status={inquiryStatus} />

                <button
                  type="submit"
                  disabled={inquiryStatus === 'submitting'}
                  className="btn-primary w-full sm:w-auto"
                >
                  {inquiryStatus === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleApplication} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Applicant Name
                    </label>
                    <input
                      required
                      type="text"
                      value={application.applicant_name}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          applicant_name: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="Student's full name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Parent / Guardian Name
                    </label>
                    <input
                      required
                      type="text"
                      value={application.guardian_name}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          guardian_name: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="Parent or guardian name"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={application.email}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          email: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      value={application.phone}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          phone: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="0801 234 5678"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Desired Class
                    </label>
                    <select
                      value={application.level}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          level: e.target.value,
                        })
                      }
                      className="input-field"
                    >
                      {applicationLevels.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Desired Start Date
                    </label>
                    <input
                      required
                      type="date"
                      value={application.start_date}
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          start_date: e.target.value,
                        })
                      }
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Previous School (optional)
                  </label>
                  <input
                    type="text"
                    value={application.previous_school}
                    onChange={(e) =>
                      setApplication({
                        ...application,
                        previous_school: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="Last school attended"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Additional Notes (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={application.notes}
                    onChange={(e) =>
                      setApplication({ ...application, notes: e.target.value })
                    }
                    className="input-field resize-none"
                    placeholder="Anything else we should know..."
                  />
                </div>

                {/* File upload section */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Upload Requirement Documents
                  </label>
                  <p className="mb-3 text-xs text-slate-500">
                    Upload birth certificate, transcripts, medical certificate,
                    passport photos, etc. Accepted: PDF, JPG, PNG, WebP. Max 10
                    MB per file.
                  </p>

                  <label
                    className={`flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-8 transition-colors ${isUploading
                        ? 'border-brand-400 bg-brand-50/50'
                        : 'border-slate-300 bg-stone-50 hover:border-brand-400 hover:bg-brand-50/30'
                      }`}
                  >
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.webp"
                      onChange={handleFileSelect}
                      disabled={isUploading}
                      className="hidden"
                    />
                    {isUploading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin text-brand-600" />
                        <span className="text-sm font-medium text-brand-700">
                          Uploading...
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 text-brand-600" />
                        <span className="text-sm font-medium text-slate-700">
                          Click to upload documents
                        </span>
                      </>
                    )}
                  </label>

                  {uploadError && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {uploadError}
                    </div>
                  )}

                  {uploadedFiles.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {uploadedFiles.map((f, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <FileCheck2 className="h-4 w-4 shrink-0 text-emerald-600" />
                            <span className="truncate text-sm font-medium text-slate-700">
                              {f.label}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <StatusBanner status={appStatus} />

                <button
                  type="submit"
                  disabled={appStatus === 'submitting'}
                  className="btn-primary w-full sm:w-auto"
                >
                  {appStatus === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusBanner({ status }: { status: FormStatus }) {
  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
        Thank you! Your submission was received. Our admissions team will
        contact you soon.
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
        <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
        Something went wrong. Please try again or call us directly.
      </div>
    );
  }
  return null;
}
