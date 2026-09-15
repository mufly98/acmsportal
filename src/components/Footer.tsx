import { MapPin, Phone, Mail, Globe, ArrowUp, Search } from 'lucide-react';
import { navLinks, contactInfo, resultsCheckerUrl } from '@/data/school';

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-blue-100">
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,158,11,0.08),transparent_40%)]" />

      <div className="container-x relative">
        {/* Top */}
        <div className="grid gap-10 py-16 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg">
                <img
                  src="/images/logo.png"
                  alt="AMFUS Comprehensive Model School logo"
                  className="h-full w-full object-contain p-1"
                />
              </span>
              <div className="leading-tight">
                <p className="font-serif text-lg font-bold text-white">AMFUS</p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-blue-300">
                  Comprehensive Model School
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-blue-200/80">
              Building excellent leaders for tomorrow through quality education
              and strong moral values.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-300">
              <Globe className="h-4 w-4" />
              ACMS PORTAL
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-blue-200/80 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white">
              Our Sections
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-blue-200/80">
              <li>Kindergarten</li>
              <li>Primary School</li>
              <li>Secondary School</li>
              <li>Islamiyya</li>
              <li>Co-Curricular Activities</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white">
              Reach Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-blue-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{contactInfo.address.join(', ')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{contactInfo.phones.join(' | ')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="transition-colors hover:text-gold-300"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Search className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={resultsCheckerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-300"
                >
                  Check Results Online
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-blue-300/70">
            &copy; {new Date().getFullYear()} AMFUS Comprehensive Model School.
            All rights reserved.
          </p>
          <button
            onClick={() => scrollTo('#home')}
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
