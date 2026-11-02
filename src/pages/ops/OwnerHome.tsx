import { useRef, useState } from 'react';
import { useStore } from '../../store';
import * as L from '../../logic';
import { EditPlanModal, go, usePlanBuilder } from '../../ui';
import { exportAudit, SHIFTS } from '../desktop/Reports';

/** Stitch "Washify Ops – Owner Portal" (mobile). */
export default function OwnerHome() {
  const s = useStore();
  const b = usePlanBuilder();
  const [editing, setEditing] = useState<string | null>(null);
  const builderRef = useRef<HTMLFormElement>(null);

  return (
    <div className="icons-22 select-none">
      <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm flex justify-between items-center w-full px-margin-mobile h-14 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined fill-1">local_laundry_service</span>
          </div>
          <div>
            <h1 className="text-headline-sm font-headline-sm font-bold text-primary leading-tight">Washify Ops</h1>
            <p className="text-label-meta font-label-meta text-secondary">Owner Portal • {s.user.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-badge font-label-badge bg-primary-fixed text-on-primary-fixed border border-primary/20">Shift Active</span>
          <button onClick={() => s.notYet('Facility settings')} aria-label="Facility Settings" className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:bg-surface-container active:scale-95 duration-100 ease-in-out transition-colors" type="button">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
      </header>
      <div className="bg-surface-container-lowest px-margin-mobile py-2.5 border-b border-outline-variant/40 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[18px]">domain</span>
          <span className="text-body-sm font-body-sm font-medium text-on-surface">Facility Hub 01 (Central)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-label-meta font-label-meta text-primary font-semibold tracking-wider">Oct 2026 (Live)</span>
        </div>
      </div>
      <main className="max-w-md mx-auto px-margin-mobile pt-4 pb-24 space-y-5">
        <section aria-labelledby="exec-analytics-title">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-headline-sm font-headline-sm font-semibold text-on-surface" id="exec-analytics-title">
              Executive Overview
            </h2>
            <span className="text-label-badge font-label-badge text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">sync</span> 3m ago
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary"></div>
              <div className="flex justify-between items-start">
                <span className="text-label-badge font-label-badge text-secondary">MTD GROSS REVENUE</span>
                <span className="inline-flex items-center text-label-meta font-label-meta font-semibold text-primary bg-primary-fixed/40 px-1.5 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> +18.4%
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-display-weight font-display-weight text-on-surface tracking-tight">₹1,42,850</span>
              </div>
              <div className="mt-2 pt-2 border-t border-outline-variant/30 flex justify-between items-center text-body-sm font-body-sm text-secondary">
                <span>Processed Output:</span>
                <span className="font-label-numeric font-semibold text-on-surface">
                  4,820.5 KG <span className="text-primary font-normal text-xs">(+14.2%)</span>
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/50 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-meta font-label-meta text-secondary">SLA COMPLIANCE</span>
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              </div>
              <div className="my-2">
                <div className="text-headline-md font-headline-md text-on-surface">98.4%</div>
                <div className="text-label-meta font-label-meta text-primary font-medium mt-0.5">Target: 95.0%</div>
              </div>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '98.4%' }}></div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/50 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-meta font-label-meta text-secondary">ACTIVE SUBSCRIBERS</span>
                <span className="material-symbols-outlined text-secondary text-[18px]">group</span>
              </div>
              <div className="my-2">
                <div className="text-headline-md font-headline-md text-on-surface">{626 + s.customers.length}</div>
                <div className="text-label-meta font-label-meta text-secondary font-medium mt-0.5">Students enrolled</div>
              </div>
              <div className="flex items-center gap-1 text-label-meta font-label-meta text-primary font-semibold">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 38 this week
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="packages-config-title">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-headline-sm font-headline-sm font-semibold text-on-surface" id="packages-config-title">
                Quota Packages
              </h2>
              <p className="text-label-meta font-label-meta text-secondary">Direct Pricing &amp; Student Tier Control</p>
            </div>
            <button onClick={() => builderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-label-badge font-label-badge active:scale-95 transition-all shadow-sm" type="button">
              <span className="material-symbols-outlined text-[16px]">add</span> Add New
            </button>
          </div>
          <div className="space-y-2.5">
            {s.plans.map((p) => (
              <div key={p.id} className={`bg-surface-container-lowest rounded-xl p-3.5 shadow-sm relative ${p.popular ? 'border-2 border-primary/30 mt-3' : 'border border-outline-variant/60'}`}>
                {p.popular && <div className="absolute -top-2.5 right-4 bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Most Popular</div>}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-body-lg font-semibold text-on-surface">{p.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-label-meta font-label-meta ${p.popular ? 'bg-primary-fixed text-on-primary-fixed font-semibold' : 'bg-surface-container text-secondary font-medium'}`}>{p.tag}</span>
                    </div>
                    <p className="text-body-sm font-body-sm text-secondary mt-0.5">
                      {L.kg(p.quotaKg, 1)} KG Quota • ₹{p.ratePerKg} / KG
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-headline-sm font-headline-sm text-primary font-bold">{L.inr(p.quotaKg * p.ratePerKg)}</span>
                    <p className="text-label-meta font-label-meta text-secondary">{p.period === 'mo' ? 'per student / mo' : 'per semester'}</p>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-outline-variant/30 flex items-center justify-between text-body-sm font-body-sm">
                  <span className="flex items-center gap-1 text-secondary text-label-meta font-label-meta">
                    <span className="material-symbols-outlined text-[16px] text-primary">school</span> <strong className="text-on-surface">{p.students}</strong> Students subscribed
                  </span>
                  <button onClick={() => setEditing(p.id)} className="text-primary font-label-badge flex items-center gap-1 hover:underline active:scale-95 transition-transform" type="button">
                    <span className="material-symbols-outlined text-[16px]">edit</span> Edit Rates
                  </button>
                </div>
              </div>
            ))}
          </div>
          <form
            ref={builderRef}
            onSubmit={(e) => {
              e.preventDefault();
              b.publish();
            }}
            className="mt-3 bg-surface-container-low rounded-xl p-4 border border-outline-variant/40"
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-label-numeric font-label-numeric text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">calculate</span> Quick Package Builder
              </span>
              <span className="text-label-meta font-label-meta text-secondary">Auto-calculator</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-label-meta font-label-meta text-secondary mb-1" htmlFor="pkg-weight-input">
                  TOTAL WEIGHT (KG)
                </label>
                <div className="relative">
                  <input value={b.quota} onChange={(e) => b.setQuota(e.target.value)} className="w-full h-11 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-semibold text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" id="pkg-weight-input" type="number" inputMode="decimal" />
                  <span className="absolute right-3 top-3 text-label-meta font-label-meta text-secondary">KG</span>
                </div>
              </div>
              <div>
                <label className="block text-label-meta font-label-meta text-secondary mb-1" htmlFor="pkg-rate-input">
                  RATE PER KG (₹)
                </label>
                <div className="relative">
                  <input value={b.rate} onChange={(e) => b.setRate(e.target.value)} className="w-full h-11 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-semibold text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" id="pkg-rate-input" type="number" inputMode="decimal" />
                  <span className="absolute right-3 top-3 text-label-meta font-label-meta text-secondary">₹/KG</span>
                </div>
              </div>
            </div>
            <div className="mt-3 p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
              <span className="text-body-sm font-body-sm text-secondary">Auto Calculated Price:</span>
              <span className="text-headline-sm font-headline-sm font-bold text-primary">{L.inr(b.price)}</span>
            </div>
            <button className="w-full mt-3 h-12 bg-primary active:bg-primary-container text-on-primary font-semibold rounded-lg flex items-center justify-center gap-2 active:scale-95 duration-100 ease-in-out transition-all shadow-sm" type="submit">
              <span className="material-symbols-outlined text-[20px]">save</span> Save &amp; Publish Plan
            </button>
          </form>
        </section>

        <section aria-labelledby="shifts-oversight-title">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-headline-sm font-headline-sm font-semibold text-on-surface" id="shifts-oversight-title">
                Shift Productivity
              </h2>
              <p className="text-label-meta font-label-meta text-secondary">Daily Output by Floor Supervisor</p>
            </div>
            <span className="text-label-badge font-label-badge bg-surface-container text-secondary px-2 py-0.5 rounded-full">3 Shifts</span>
          </div>
          <div className="space-y-2.5">
            {SHIFTS.map((x, i) => (
              <div key={x.lead} className="bg-surface-container-lowest rounded-xl p-3.5 border border-outline-variant/50 shadow-sm flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mt-0.5 ${i === 0 ? 'text-primary' : 'text-secondary'}`}>
                    <span className="material-symbols-outlined">{x.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline-sm text-body-md font-semibold text-on-surface">{x.lead}</h3>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${i === 0 ? 'bg-primary-fixed/40 text-on-primary-fixed' : 'bg-surface-container text-secondary'}`}>{x.shift}</span>
                    </div>
                    <p className="text-body-sm font-body-sm text-secondary mt-0.5">
                      {x.orders} Orders • {x.kg} KG
                    </p>
                    <p className="text-label-meta font-label-meta text-secondary/80">{x.hours}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-headline-sm font-headline-sm font-bold ${i === 1 ? 'text-secondary' : 'text-primary'}`}>{x.sla}</span>
                  <p className="text-label-meta font-label-meta text-secondary">SLA Rate</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="owner-actions-title" className="pb-4">
          <h2 className="text-headline-sm font-headline-sm font-semibold text-on-surface mb-3" id="owner-actions-title">
            Owner Audits &amp; Controls
          </h2>
          <div className="grid grid-cols-1 gap-2.5">
            {(
              [
                ['download', 'Export Audit Report (CSV)', exportAudit],
                ['assignment', 'Audit Shift Logs & Exceptions', () => go('ops', 'analytics')],
                ['account_balance_wallet', 'View Customer Ledgers', () => go('cart', 'customers')],
              ] as [string, string, () => void][]
            ).map(([icon, label, onClick]) => (
              <button key={label} onClick={onClick} className="w-full h-12 bg-surface-container-lowest border border-outline-variant/70 text-on-surface rounded-xl px-4 flex items-center justify-between active:bg-surface-container active:scale-95 duration-100 ease-in-out transition-all shadow-sm" type="button">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">{icon}</span>
                  <span className="font-body-md font-medium text-body-md">{label}</span>
                </div>
                <span className="material-symbols-outlined text-secondary text-[18px]">chevron_right</span>
              </button>
            ))}
          </div>
        </section>
      </main>
      {editing && <EditPlanModal planId={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}
