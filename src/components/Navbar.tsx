import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/school';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 shadow-md shadow-slate-900/5 backdrop-blur-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('#home')}
          className="flex items-center gap-3 text-left"
        >
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${
              scrolled
                ? 'bg-white ring-1 ring-slate-200'
                : 'bg-white/90 backdrop-blur-md ring-1 ring-white/25'
            }`}
          >
            <img
              src="/images/logo.png"
              alt="AMFUS Comprehensive Model School logo"
              className="h-full w-full object-contain p-1"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className={`font-serif text-lg font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              AMFUS
            </span>
            <span
              className={`text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                scrolled ? 'text-brand-600' : 'text-white/80'
              }`}
            >
              Comprehensive Model School
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                  active === link.href
                    ? scrolled
                      ? 'text-brand-700'
                      : 'text-white'
                    : scrolled
                      ? 'text-slate-600 hover:text-brand-700'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold-400 transition-all duration-300 ${
                    active === link.href ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <button onClick={() => handleNav('#admissions')} className="btn-gold">
            Apply Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors lg:hidden ${
            scrolled
              ? 'text-slate-800 hover:bg-slate-100'
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white shadow-xl transition-all duration-400 lg:hidden ${
          open ? 'max-h-[480px] border-t border-slate-100' : 'max-h-0'
        }`}
      >
        <ul className="container-x flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                  active === link.href
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <button
              onClick={() => handleNav('#admissions')}
              className="btn-gold w-full"
            >
              Apply Now
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
