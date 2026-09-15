import { ArrowRight, Sparkles } from 'lucide-react';
export default function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/building-bg.jpg"
          alt="AMFUS Comprehensive Model School building"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/75 via-brand-950/65 to-brand-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.15),transparent_50%)]" />
      </div>

      {/* Decorative floating shapes */}
      <div className="pointer-events-none absolute right-[8%] top-[28%] hidden h-24 w-24 rounded-3xl bg-gold-400/20 backdrop-blur-xl lg:block animate-float" />
      <div
        className="pointer-events-none absolute bottom-[18%] left-[6%] hidden h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-xl lg:block animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="container-x relative flex min-h-screen flex-col justify-center pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Motto: Knowledge is Light
          </div>

          <h1
            className="animate-fade-up mt-6 font-serif text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ animationDelay: '0.1s' }}
          >
            Welcome to ACMS
            <span className="block text-gold-300">Portal</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-lg text-blue-50/90 sm:text-xl"
            style={{ animationDelay: '0.2s' }}
          >
            Building excellent leaders for tomorrow through quality education,
            strong moral values, and a nurturing learning environment.
          </p>

          <p
            className="animate-fade-up mt-4 text-sm font-semibold text-gold-200"
            style={{ animationDelay: '0.3s' }}
          >
            ACMS PORTAL
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '0.4s' }}
          >
            <button
              onClick={() => scrollTo('#admissions')}
              className="btn-gold group"
            >
              Apply Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('#about')}
              className="btn-outline"
            >
              Discover ACMS
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
