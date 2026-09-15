import { Target, Eye, Users, Award, Calendar, TrendingUp } from 'lucide-react';
import { stats } from '@/data/school';

const statIcons = [Users, Award, Calendar, TrendingUp];

export default function About() {
  return (
    <section id="about" className="relative bg-stone-50 py-24 lg:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our Story</span>
          <h2 className="section-title mt-3">About Our School</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            AMFUS Comprehensive Model School is dedicated to providing quality
            education and holistic development for students. We nurture
            excellence through innovative teaching methods and a supportive
            learning environment.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="reveal relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/20">
              <img
                src="/images/building-bg.jpg"
                alt="AMFUS Comprehensive Model School building"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-brand-700 px-6 py-5 text-white shadow-xl sm:block lg:-right-6">
              <p className="font-serif text-3xl font-bold">5+</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                Years of Excellence
              </p>
            </div>
            {/* Decorative dot grid */}
            <div className="absolute -left-6 -top-6 -z-10 hidden h-32 w-32 rounded-3xl bg-gold-200/60 lg:block" />
          </div>

          {/* Text */}
          <div className="reveal space-y-6" style={{ transitionDelay: '0.1s' }}>
            <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Target className="h-6 w-6" />
                </span>
                <h3 className="font-serif text-xl font-semibold text-slate-900">
                  Our Mission
                </h3>
              </div>
              <p className="mt-4 leading-relaxed text-slate-600">
                To Effectively Implement the National Curriculum of Education
                through Deployment of Qualified Teaching Personnel and other
                Resources in a Conducive and friendly Learning Environment.
              </p>
            </div>

            <div className="rounded-2xl border border-gold-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                  <Eye className="h-6 w-6" />
                </span>
                <h3 className="font-serif text-xl font-semibold text-slate-900">
                  Our Vision
                </h3>
              </div>
              <p className="mt-4 leading-relaxed text-slate-600">
                Empower Students To Acquire Knowledge, Skills And Moral Discipline
                That Will Enable Them Play Key Roles In Nation Building.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="reveal mt-20 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-700/10"
              >
                <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-700/20 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="font-serif text-3xl font-bold text-slate-900 lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
