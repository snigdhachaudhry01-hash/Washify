import { useState } from 'react';
import { useStore } from '../../store';
import * as L from '../../logic';
import { EditPlanModal, usePlanBuilder } from '../../ui';

const STRIPES = ['bg-outline', 'bg-primary', 'bg-tertiary'];

/** Stitch "Quota Packages & Pricing Engine". `wide` = rendered inside the desktop shell. */
export default function Packages({ wide = false }: { wide?: boolean }) {
  const s = useStore();
  const b = usePlanBuilder();
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <>
      {!wide && (
        <header className="bg-surface-container-lowest text-primary border-b border-outline-variant shadow-sm flex justify-between items-center w-full px-margin-mobile h-14 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary select-none text-[22px]">local_laundry_service</span>
            <div className="flex flex-col">
              <span className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight leading-none">Washify Ops</span>
              <span className="text-label-meta font-label-meta text-secondary">
                {s.role === 'owner' ? 'Owner' : 'Staff'} Portal • {s.user.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-full border border-outline-variant">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-label-badge font-label-badge text-primary font-semibold">Shift Active</span>
          </div>
        </header>
      )}
      <main className={wide ? 'p-space-xl max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 items-start' : 'w-full max-w-md mx-auto px-margin-mobile pt-4 pb-24 space-y-4'}>
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className={`${wide ? 'text-headline-lg font-headline-lg' : 'text-headline-md font-headline-md'} text-on-surface tracking-tight`}>Quota Packages &amp; Pricing Engine</h1>
            <p className="text-body-sm font-body-sm text-secondary">Direct Pricing, Student Quota &amp; Add-on Management</p>
          </div>
          {/* Quick Package Builder */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              b.publish();
            }}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-4 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                <h2 className="text-headline-sm font-headline-sm text-on-surface font-semibold">Quick Package Builder</h2>
              </div>
              <span className="text-label-meta font-label-meta bg-surface-container text-secondary px-2 py-0.5 rounded">Dynamic Engine</span>
            </div>
            <input value={b.name} onChange={(e) => b.setName(e.target.value)} aria-label="Package name" placeholder="Package name (optional)" className="w-full h-11 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-label-badge font-label-badge text-secondary block" htmlFor="weightInput">
                  Enter Total Weight (KG)
                </label>
                <div className="relative">
                  <input value={b.quota} onChange={(e) => b.setQuota(e.target.value)} className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-label-numeric font-label-numeric text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-semibold" id="weightInput" type="number" inputMode="decimal" />
                  <span className="absolute right-3 top-3 text-label-meta font-label-meta text-secondary uppercase">KG</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-label-badge font-label-badge text-secondary block" htmlFor="rateInput">
                  Rate per KG (₹)
                </label>
                <div className="relative">
                  <input value={b.rate} onChange={(e) => b.setRate(e.target.value)} className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-label-numeric font-label-numeric text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-semibold" id="rateInput" type="number" inputMode="decimal" />
                  <span className="absolute right-3 top-3 text-label-meta font-label-meta text-secondary">/ KG</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-lg p-3.5 border border-surface-variant flex items-center justify-between">
              <div>
                <span className="text-label-meta font-label-meta uppercase tracking-wider text-secondary block">Auto Calculated Monthly Price</span>
                <span className="text-body-sm font-body-sm text-secondary">Calculated via Live Tier Engine</span>
              </div>
              <div className="text-right">
                <span className="text-headline-md font-headline-md font-bold text-primary tracking-tight">{L.inr(b.price)}</span>
                <span className="text-label-meta font-label-meta text-secondary block">/ Student</span>
              </div>
            </div>
            <button className="w-full h-12 bg-primary text-on-primary font-body-lg text-body-lg font-semibold rounded-lg shadow-sm hover:bg-primary-container active:scale-95 transition-all duration-150 flex items-center justify-center gap-2" type="submit">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>+ Save &amp; Publish Plan</span>
            </button>
          </form>
          {/* Package Utilization Stats */}
          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
                <h2 className="text-headline-sm font-headline-sm text-on-surface font-semibold">Package Utilization Stats</h2>
              </div>
              <span className="text-label-meta font-label-meta text-secondary">Campus Cohort</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-container-low rounded-lg p-3 border border-outline-variant space-y-1">
                <span className="text-label-meta font-label-meta text-secondary block">Avg. Consumption</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-headline-md font-headline-md font-bold text-on-surface">31.4</span>
                  <span className="text-label-meta font-label-meta text-secondary uppercase font-semibold">KG/mo</span>
                </div>
                <div className="w-full bg-outline-variant h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-primary h-full w-[62%] rounded-full"></div>
                </div>
                <span className="text-label-meta font-label-meta text-primary font-medium block pt-0.5">Optimal tier balance</span>
              </div>
              <div className="bg-surface-container-low rounded-lg p-3 border border-outline-variant space-y-1">
                <span className="text-label-meta font-label-meta text-secondary block">Quota Renewal Rate</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-headline-md font-headline-md font-bold text-on-surface">94.2%</span>
                </div>
                <div className="w-full bg-outline-variant h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-primary h-full w-[94.2%] rounded-full"></div>
                </div>
                <span className="text-label-meta font-label-meta text-primary font-medium block pt-0.5">+3.1% vs last month</span>
              </div>
            </div>
          </section>
        </div>

        {/* Active Published Packages */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm font-headline-sm text-on-surface font-semibold">Active Published Packages</h2>
            <span className="text-label-badge font-label-badge bg-secondary-container text-on-secondary-fixed-variant px-2.5 py-0.5 rounded-full">{s.plans.length} Live</span>
          </div>
          {s.plans.map((p, i) => (
            <article key={p.id} className={`bg-surface-container-lowest rounded-xl p-4 space-y-3 relative overflow-hidden shadow-sm ${p.popular ? 'border-2 border-primary-container' : 'border border-outline-variant'}`}>
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${STRIPES[i] ?? 'bg-outline'}`}></div>
              <div className="flex items-center justify-between pl-1 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <h3 className="text-body-lg font-body-lg font-bold text-on-surface truncate">{p.name}</h3>
                  <span className={`text-label-badge font-label-badge px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap ${p.popular ? 'bg-primary text-on-primary' : 'bg-surface-container text-secondary'}`}>{p.popular ? 'Most Popular' : p.tag}</span>
                </div>
                <span className={`text-label-numeric font-label-numeric font-bold whitespace-nowrap ${p.popular ? 'text-primary' : 'text-on-surface'}`}>
                  {L.inr(p.quotaKg * p.ratePerKg)} <span className="text-label-meta font-label-meta text-secondary font-normal">/ {p.period}</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-body-sm font-body-sm text-secondary pl-1 py-1 bg-surface-container-low rounded-lg px-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">scale</span>
                  <span className="font-medium text-on-surface">{L.kg(p.quotaKg, 1)} KG Quota</span>
                </div>
                <span className="text-outline">•</span>
                <div className="font-medium text-on-surface">₹{p.ratePerKg} / KG</div>
              </div>
              <div className="flex items-center justify-between pt-1 pl-1">
                <div className="flex items-center gap-1.5 text-label-meta font-label-meta text-secondary">
                  <span className={`material-symbols-outlined text-[16px] ${p.popular ? 'text-primary' : 'text-secondary'}`}>groups</span>
                  <span className="font-semibold text-on-surface">{p.students} Active Students</span>
                </div>
                <button onClick={() => setEditing(p.id)} className={`h-9 px-3.5 text-label-badge font-label-badge font-semibold rounded-lg active:scale-95 transition-all flex items-center gap-1 ${p.popular ? 'bg-primary-container hover:bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-variant text-on-surface'}`} type="button">
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>Edit Rates</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
      {editing && <EditPlanModal planId={editing} onClose={() => setEditing(null)} />}
    </>
  );
}
