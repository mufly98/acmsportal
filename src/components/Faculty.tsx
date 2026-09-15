import { Quote } from 'lucide-react';
import { faculty } from '@/data/school';

export default function Faculty() {
  return (
    <section id="faculty" className="relative bg-stone-50 py-24 lg:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our Team</span>
          <h2 className="section-title mt-3">Our Faculty</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Meet the dedicated educators and leaders who make excellence
            possible at AMFUS every single day.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((member, i) => (
            <article
              key={member.name}
              className="reveal group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              {/* Decorative quote */}
              <Quote className="absolute right-4 top-4 h-8 w-8 text-slate-100 transition-colors duration-300 group-hover:text-gold-200" />

              {/* Avatar */}
              <div className="relative mx-auto mb-5 h-24 w-24">
                <div
                  className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${member.accent} font-serif text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105`}
                >
                  {member.initials}
                </div>
                <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />
              </div>

              <h3 className="font-serif text-lg font-semibold text-slate-900">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand-600">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
