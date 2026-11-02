import { useStore } from '../../store';
import { downloadCsv } from '../../ui';

// Weekly throughput + shift figures from the Stitch "Operations Analytics" screen (aggregates the backend will supply).
export const THROUGHPUT: [string, number, number][] = [
  ['MON', 680, 600],
  ['TUE', 750, 720],
  ['WED', 850, 800],
  ['THU', 780, 760],
  ['FRI', 940, 880],
  ['SAT', 520, 550],
  ['SUN', 300, 510.5],
];
export const SHIFTS = [
  { lead: 'Devon Vance', shift: 'Morning', hours: '06:00 - 14:00', icon: 'wb_sunny', orders: 512, kg: '2,284.0', sla: '98.2%', tare: '0.02%', tareNote: 'Optimal', dot: 'bg-primary', tareCls: 'text-primary' },
  { lead: 'Marcus Sterling', shift: 'Evening', hours: '14:00 - 22:00', icon: 'wb_twilight', orders: 438, kg: '1,940.5', sla: '92.4%', tare: '0.05%', tareNote: 'Review', dot: 'bg-secondary', tareCls: 'text-secondary' },
  { lead: 'Althea Ramos', shift: 'Night', hours: '22:00 - 06:00', icon: 'bedtime', orders: 134, kg: '596.0', sla: '96.0%', tare: '0.01%', tareNote: 'Pristine', dot: 'bg-outline', tareCls: 'text-primary' },
];

export function exportAudit() {
  downloadCsv('washify_facility_audit_oct2026.csv', [
    ['Shift Lead', 'Shift', 'Hours', 'Orders', 'Total KG', 'Turnaround SLA', 'Tare Discrepancy'],
    ...SHIFTS.map((x) => [x.lead, x.shift, x.hours, x.orders, x.kg, x.sla, x.tare]),
    [],
    ['Day', 'Intake (KG)', 'Dispatched (KG)'],
    ...THROUGHPUT,
  ]);
}

export default function Reports() {
  const { notYet, customers } = useStore();
  return (
    <main className="p-space-xl bg-background icons-20">
      <div className="max-w-[1440px] mx-auto space-y-space-xl pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-label-badge font-label-badge text-primary bg-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Audit Console</span>
              <span className="text-label-meta font-label-meta text-secondary">Synchronized 2 min ago</span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight mt-1">Operations Analytics &amp; Facility Reports</h1>
            <p className="text-body-md font-body-md text-secondary mt-0.5">Shift performance, facility throughput, turnaround time, and quota utilization metrics.</p>
          </div>
          <div className="flex items-center gap-space-md shrink-0">
            <button onClick={() => notYet('Custom date ranges')} className="h-11 px-space-md rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface text-body-sm font-medium flex items-center gap-2.5 hover:bg-surface-container-low transition-colors shadow-sm">
              <span className="material-symbols-outlined text-secondary">date_range</span>
              <span className="font-semibold">Oct 01 - Oct 24, 2026</span>
              <span className="material-symbols-outlined text-secondary text-sm">expand_more</span>
            </button>
            <button onClick={exportAudit} className="h-11 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold text-body-sm flex items-center gap-2 transition-all duration-150 active:scale-95 shadow-sm">
              <span className="material-symbols-outlined">file_download</span>
              <span>Export Full Audit Report (CSV)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant shadow-sm hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-label-badge font-label-badge tracking-wider uppercase">Total Volume Processed</span>
              <span className="material-symbols-outlined text-primary bg-surface-container-low p-1.5 rounded-lg">scale</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-display-weight font-display-weight text-on-surface tracking-tight">4,820.5</span>
              <span className="text-label-numeric font-label-numeric text-secondary uppercase">KG</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-body-sm">
              <span className="inline-flex items-center text-primary font-semibold text-label-badge">
                <span className="material-symbols-outlined text-sm font-bold">trending_up</span> +14.2%
              </span>
              <span className="text-secondary text-label-meta">vs last month throughput</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant shadow-sm hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-label-badge font-label-badge tracking-wider uppercase">Average Turnaround Time</span>
              <span className="material-symbols-outlined text-primary bg-surface-container-low p-1.5 rounded-lg">timer</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-display-weight font-display-weight text-on-surface tracking-tight">18.4</span>
              <span className="text-label-numeric font-label-numeric text-secondary uppercase">Hours</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-body-sm">
              <span className="text-label-badge font-label-badge text-secondary bg-surface-container-low px-2 py-0.5 rounded">Target &lt;24h</span>
              <span className="text-primary font-semibold text-label-badge">94.6% SLA Compliant</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant shadow-sm hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-label-badge font-label-badge tracking-wider uppercase">Active Subscribers</span>
              <span className="material-symbols-outlined text-primary bg-surface-container-low p-1.5 rounded-lg">group</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-display-weight font-display-weight text-on-surface tracking-tight">{626 + customers.length}</span>
              <span className="text-label-numeric font-label-numeric text-secondary uppercase">Students</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-surface-container-low h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '96%' }}></div>
              </div>
              <span className="text-label-badge font-label-badge font-semibold text-primary">96% active rate</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant shadow-sm hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-label-badge font-label-badge tracking-wider uppercase">Total Intake Orders</span>
              <span className="material-symbols-outlined text-primary bg-surface-container-low p-1.5 rounded-lg">inventory_2</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-display-weight font-display-weight text-on-surface tracking-tight">1,084</span>
              <span className="text-label-numeric font-label-numeric text-secondary uppercase">Orders</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-body-sm">
              <span className="text-secondary text-label-meta">Batch standard capacity</span>
              <span className="text-on-surface font-semibold text-label-badge bg-surface-container-low px-2 py-0.5 rounded">Avg 4.45 KG/order</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-surface-container-lowest rounded-xl p-space-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-outline-variant gap-4">
              <div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Daily Intake &amp; Dispatch Throughput</h3>
                <p className="text-body-sm font-body-sm text-secondary">Audited metric comparison: KG Received vs KG Dispatched across active cycle</p>
              </div>
              <div className="flex items-center gap-6 text-label-badge">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-sm bg-primary"></span>
                  <span className="text-on-surface font-medium">Intake (KG)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-sm bg-secondary-container border border-outline-variant"></span>
                  <span className="text-secondary font-medium">Dispatched (KG)</span>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-7 gap-4 md:gap-8 h-56 items-end pt-8 px-4 border-b border-outline-variant">
                {THROUGHPUT.map(([day, intake, out]) => (
                  <div key={day} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="text-label-meta text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{intake} KG</div>
                    <div className="w-full flex justify-center items-end gap-2 md:gap-3 h-full">
                      <div className="w-6 md:w-8 bg-primary rounded-t transition-all hover:brightness-110" style={{ height: `${intake / 10}%` }} title={`${day} Intake: ${intake} KG`}></div>
                      <div className="w-6 md:w-8 bg-secondary-container border border-outline-variant rounded-t transition-all hover:brightness-95" style={{ height: `${out / 10}%` }} title={`${day} Dispatched: ${out} KG`}></div>
                    </div>
                    <span className="text-label-meta font-semibold text-secondary mt-1">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-body-sm text-secondary bg-surface-container-low p-space-sm rounded-lg border border-outline-variant gap-2">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-primary text-base">check_circle</span> Facility Tare Calibration: Automated (Zero Delta verified)
            </span>
            <span className="font-semibold text-on-surface">Net Balance: +22.5 KG Backlog</span>
          </div>
        </div>

        <div className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-space-lg border-b border-outline-variant flex items-center justify-between gap-3">
              <div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Shift-wise Productivity Table</h3>
                <p className="text-body-sm font-body-sm text-secondary">Audited output, gross scale weight, SLA achievement, and tare variations across full operating cycles</p>
              </div>
              <span className="text-label-badge font-label-badge bg-surface-container px-2.5 py-1 rounded text-primary font-semibold whitespace-nowrap">Today's Cycles</span>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse table-auto">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant text-label-badge text-secondary uppercase tracking-wider">
                    <th className="py-3.5 px-space-lg font-semibold text-left">Shift Lead</th>
                    <th className="py-3.5 px-space-md font-semibold text-center">Orders</th>
                    <th className="py-3.5 px-space-lg font-semibold text-right">Total KG</th>
                    <th className="py-3.5 px-space-md font-semibold text-center">Turnaround SLA</th>
                    <th className="py-3.5 px-space-lg font-semibold text-right whitespace-nowrap">Tare Discrepancy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant text-body-sm">
                  {SHIFTS.map((x) => (
                    <tr key={x.lead} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-4 px-space-lg">
                        <div className="flex items-center gap-3">
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${x.dot}`}></span>
                          <div>
                            <span className="font-semibold text-on-surface block leading-tight">{x.lead}</span>
                            <span className="text-label-meta text-secondary">
                              {x.shift} ({x.hours})
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-space-md text-center font-label-numeric font-medium text-on-surface">{x.orders}</td>
                      <td className="py-4 px-space-lg text-right font-label-numeric font-bold text-on-surface whitespace-nowrap">{x.kg} KG</td>
                      <td className="py-4 px-space-md text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-badge font-semibold bg-surface-container text-primary">{x.sla}</span>
                      </td>
                      <td className="py-4 px-space-lg text-right whitespace-nowrap">
                        <div className={`font-label-numeric font-semibold text-body-sm ${x.tareCls}`}>{x.tare}</div>
                        <span className="text-label-meta text-secondary block">Tare &lt;0.1% limit</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-space-md bg-surface-container-low border-t border-outline-variant flex items-center justify-between text-label-badge text-secondary">
            <span>Facility Operations Log #OPS-2026-884</span>
            <span className="font-semibold text-on-surface">Gross Cycle Throughput: 4,820.5 KG</span>
          </div>
        </div>
      </div>
    </main>
  );
}
