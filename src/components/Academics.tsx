import {
  Baby,
  Pencil,
  GraduationCap,
  BookOpen,
  Trophy,
  Check,
} from 'lucide-react';
import { academicSections } from '@/data/school';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Baby,
  Pencil,
  GraduationCap,
  BookOpen,
  Trophy,
};

export default function Academics() {
  return (
    <section id="academics" className="relative bg-white py-24 lg:py-32">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container-x relative">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Programs</span>
          <h2 className="section-title mt-3">Academics</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            From kindergarten to secondary school, we offer a comprehensive
            curriculum designed to develop the whole child — academically,
            morally, and socially.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {academicSections.map((section, i) => {
            const Icon = iconMap[section.icon] ?? BookOpen;
            return (
              <div
                key={section.id}
                className="reveal group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-700/10"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                {/* Hover gradient accent */}
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-gold-400 transition-transform duration-500 group-hover:scale-x-100" />

                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 transition-all duration-300 group-hover:from-brand-600 group-hover:to-brand-800 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-slate-900">
                      {section.title}
                    </h3>
                    <p className="text-sm font-medium text-brand-600">
                      {section.range}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {section.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {section.levels.map((level) => (
                    <li
                      key={level}
                      className="flex items-center gap-2.5 text-sm text-slate-700"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        <Check className="h-3 w-3" />
                      </span>
                      {level}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
