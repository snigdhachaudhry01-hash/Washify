import { useStore } from '../../store';
import { go } from '../../ui';
import { exportAudit, SHIFTS } from '../desktop/Reports';

const WEEK: [string, number, number][] = [
  ['M', 65, 60],
  ['T', 78, 74],
  ['W', 85, 82],
  ['T', 92, 90],
  ['F', 95, 91],
  ['S', 70, 76],
  ['S', 100, 96],
];
const TARE_NOTE = ['(Optimal)', '(Review)', '(Pristine)'];

/** Stitch "Owner Analytics & Audits" (mobile). */
export default function Analytics() {
  const s = useStore();
  return (
    <>
      <header className="sticky top-0 z-40 bg-surface-container-lowest border-b border-outline-variant shadow-sm">
        <div className="flex justify-between items-center w-full px-margin-mobile h-14">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary">local_laundry_service</span>
            <span className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">Washify Ops</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-space-md py-0.5 rounded-full bg-primary-container text-on-primary-container text-label-badge font-label-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span> Shift Active
          </span>
        </div>
      </header>
      <main className="max-w-md mx-auto px-margin-mobile pt-space-md pb-24 space-y-space-lg">
        <section className="flex items-center justify-between bg-surface-container-lowest rounded-xl p-space-md border border-outline-variant/60 shadow-sm">
          <div className="flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-sm font-bold text-headline-sm">{s.user.initials}</div>
            <div>
              <div className="flex items-center gap-space-xs">
                <h1 className="text-body-lg font-body-lg text-on-surface font-semibold leading-tight">{s.user.name}</h1>
                <span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container text-label-meta font-label-meta font-semibold uppercase">{s.role}</span>
              </div>
              <p className="text-label-meta font-label-meta text-secondary">Shift Analytics &amp; Audits</p>
            </div>
          </div>
          <span className="inline-block px-space-sm py-1 rounded bg-surface-container-low text-secondary text-label-meta font-label-meta">Campus Hub #04</span>
        </section>

        <section className="space-y-space-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm font-headline-sm text-on-surface tracking-tight">Facility Overview</h2>
            <span className="text-label-meta font-label-meta text-secondary">Current Billing Cycle</span>
          </div>
          <div className="grid grid-cols-2 gap-space-sm">
            <div className="col-span-2 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-space-md shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-label-meta font-label-meta text-secondary font-medium">MTD Gross Revenue</p>
                  <p className="text-headline-lg font-headline-lg text-on-surface tracking-tight mt-0.5">₹1,42,850</p>
                </div>
                <span className="inline-flex items-center gap-0.5 px-space-sm py-0.5 rounded-full bg-primary-fixed/30 text-primary text-label-badge font-label-badge font-semibold">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +18.4%
                </span>
              </div>
              <div className="mt-space-sm pt-space-xs border-t border-surface-container flex items-center justify-between text-label-meta font-label-meta text-secondary">
                <span>Target: ₹1,35,000</span>
                <span className="text-primary font-semibold">105.8% of pacing</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-space-md shadow-sm">
              <div className="flex items-start justify-between">
                <span className="material-symbols-outlined text-primary text-xl">scale</span>
                <span className="text-label-meta font-label-meta text-primary font-semibold">+14.2%</span>
              </div>
              <p className="text-label-meta font-label-meta text-secondary mt-space-sm">Gross Output</p>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="text-headline-sm font-headline-sm text-on-surface">4,820.5</span>
                <span className="text-label-meta font-label-meta text-secondary uppercase font-semibold">KG</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-space-md shadow-sm">
              <div className="flex items-start justify-between">
                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                <span className="text-label-meta font-label-meta text-primary font-semibold">Benchmark: 95%</span>
              </div>
              <p className="text-label-meta font-label-meta text-secondary mt-space-sm">SLA Compliance</p>
              <div className="mt-0.5">
                <span className="text-headline-sm font-headline-sm text-on-surface">98.4%</span>
              </div>
            </div>
            <div className="col-span-2 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-space-md shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <div>
                  <p className="text-label-meta font-label-meta text-secondary">Active Enrolled Students</p>
                  <p className="text-headline-sm font-headline-sm text-on-surface">
                    {626 + s.customers.length} <span className="text-body-sm font-body-sm text-secondary font-normal">subscribers</span>
                  </p>
                </div>
              </div>
              <span className="text-label-meta font-label-meta text-primary font-semibold">{s.stats.carried.n} Carried Forward</span>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-space-md shadow-sm space-y-space-md">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-headline-sm font-headline-sm text-on-surface">Daily Throughput</h2>
              <p className="text-label-meta font-label-meta text-secondary">Intake vs Dispatch Volume (KG)</p>
            </div>
            <div className="flex items-center gap-space-md text-label-meta font-label-meta">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-primary-container"></span>
                <span className="text-secondary">Intake</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-surface-dim"></span>
                <span className="text-secondary">Dispatch</span>
              </div>
            </div>
          </div>
          <div className="pt-space-xs">
            <div className="h-32 flex items-end justify-between gap-2 border-b border-outline-variant/40 pb-2">
              {WEEK.map(([d, a, b], i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-1 h-24">
                    <div className="w-2.5 bg-primary-container rounded-t-sm" style={{ height: `${a}%` }}></div>
                    <div className="w-2.5 bg-surface-dim rounded-t-sm" style={{ height: `${b}%` }}></div>
                  </div>
                  <span className={`text-label-meta font-label-meta ${i === 6 ? 'text-primary font-bold' : 'text-secondary'}`}>{d}</span>
                </div>
              ))}
            </div>
            <div className="mt-space-sm flex items-center justify-between text-label-meta font-label-meta">
              <span className="text-secondary">Weekly Avg: 688.6 KG / Day</span>
              <span className="text-primary font-semibold">Net Balance: +48.0 KG</span>
            </div>
          </div>
        </section>

        <section className="space-y-space-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm font-headline-sm text-on-surface tracking-tight">Shift Productivity</h2>
            <span className="text-label-meta font-label-meta text-secondary">Last 24 Hours</span>
          </div>
          {SHIFTS.map((x, i) => (
            <article key={x.lead} className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm relative pl-1">
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${i === 1 ? 'bg-surface-dim' : 'bg-primary'}`}></div>
              <div className="p-space-md space-y-space-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-body-lg font-body-lg font-semibold text-on-surface">{x.lead}</h3>
                    <p className="text-label-meta font-label-meta text-secondary flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">{x.icon}</span> {x.shift} Shift • {x.hours}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-space-sm py-0.5 rounded text-label-badge font-label-badge font-semibold ${i === 1 ? 'bg-surface-container-high text-on-surface' : 'bg-primary-container/15 text-primary'}`}>SLA {x.sla}</span>
                </div>
                <div className="grid grid-cols-2 gap-space-sm pt-space-xs border-t border-surface-container">
                  <div className="bg-surface-container-low/60 rounded-lg p-space-xs px-space-sm">
                    <span className="text-label-meta font-label-meta text-secondary block">Shift Output</span>
                    <span className="text-label-numeric font-label-numeric text-on-surface">
                      {x.orders} Orders • {x.kg} KG
                    </span>
                  </div>
                  <div className="bg-surface-container-low/60 rounded-lg p-space-xs px-space-sm flex flex-col justify-center">
                    <span className="text-label-meta font-label-meta text-secondary block">Tare Discrepancy</span>
                    <span className={`text-label-numeric font-label-numeric font-semibold ${x.tareCls}`}>
                      {x.tare} <span className="text-label-meta font-normal text-secondary">{TARE_NOTE[i]}</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="space-y-space-sm pt-space-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm font-headline-sm text-on-surface tracking-tight">Owner Audits &amp; Governance</h2>
            <span className="text-label-meta font-label-meta text-secondary">Append-only Ledger</span>
          </div>
          <div className="space-y-space-sm">
            {(
              [
                ['download', 'Export Audit Report (CSV)', 'Complete shift logs with timestamp verifications', exportAudit],
                ['assignment', 'Audit Shift Logs & Tare Exceptions', 'Review overrides, manual tare changes & re-weighs', () => s.notYet('Shift exception logs')],
                ['receipt_long', 'Customer Ledgers & Adjustments', 'Per-student append-only deduction history', () => go('desktop', 'accounts')],
              ] as [string, string, string, () => void][]
            ).map(([icon, title, sub, onClick]) => (
              <button key={title} onClick={onClick} className="w-full bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/60 rounded-xl p-space-md text-left flex items-center justify-between transition-colors active:scale-95 duration-100 ease-in-out min-h-[48px] shadow-sm" type="button">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <div>
                    <p className="text-body-md font-body-md font-semibold text-on-surface">{title}</p>
                    <p className="text-label-meta font-label-meta text-secondary">{sub}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary">chevron_right</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
