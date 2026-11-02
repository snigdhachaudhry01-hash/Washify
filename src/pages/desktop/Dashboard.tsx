import { useState } from 'react';
import { useStore } from '../../store';
import * as L from '../../logic';
import { downloadCsv, go, href, previewNote, useIntakeForm } from '../../ui';

type Tab = 'all' | 'ready' | 'washing' | 'delivered';
const PAGE = 4;

export function StatusPill({ o }: { o: L.Order }) {
  if (o.status === 'ready')
    return (
      <span className="bg-primary-fixed text-on-primary-fixed font-label-badge text-label-badge px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Ready for Delivery
      </span>
    );
  if (o.status === 'washing')
    return (
      <span className="bg-secondary-container text-on-secondary-fixed font-label-badge text-label-badge px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1 whitespace-nowrap">
        <span className="material-symbols-outlined text-xs animate-spin">progress_activity</span> In Washer #{L.pad((o.seq % 6) + 1)}
      </span>
    );
  if (o.status === 'in_cart')
    return <span className="bg-amber-100 text-amber-800 font-label-badge text-label-badge px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1 whitespace-nowrap">Loaded in Cart {L.pad(o.cart ?? 1)}</span>;
  return (
    <span className="bg-surface-container-high text-on-surface font-label-badge text-label-badge px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1 whitespace-nowrap">
      <span className="material-symbols-outlined text-xs text-primary">check_circle</span> Handover Done
    </span>
  );
}

export default function Dashboard() {
  const s = useStore();
  const f = useIntakeForm();
  const [tab, setTab] = useState<Tab>('all');
  const [page, setPage] = useState(0);
  const { stats } = s;
  const note = previewNote(f.preview, f.plan.ratePerKg);

  const counts = { all: s.orders.length, ready: stats.ready.n, washing: stats.washing.n, delivered: stats.delivered.n };
  const rows = s.orders.filter((o) => tab === 'all' || o.status === tab).sort(L.newestFirst);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const shown = rows.slice(page * PAGE, page * PAGE + PAGE);

  const exportManifest = () =>
    downloadCsv(`washify_manifest_24oct.csv`, [
      ['Order #', 'Day', 'Time', 'Customer ID', 'Customer', 'Weight (KG)', 'Service', 'Priority', 'Status'],
      ...[...s.orders].sort(L.newestFirst).map((o) => [o.id, `${o.day} Oct`, o.time, o.customerId, s.customer(o.customerId).name, L.kg(o.kg), o.service, o.express ? 'Express' : 'Standard', o.status]),
    ]);

  return (
    <main className="p-space-xl flex flex-col gap-space-xl max-w-[1600px] mx-auto w-full">
      {/* Command Center Headline & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">Operations Command Center</h2>
            <span className="bg-secondary-container text-on-secondary-fixed font-label-badge text-label-badge px-2.5 py-1 rounded-full font-bold">Station 01 Live</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">High-frequency laundry intake processing, manual audit weights, and campus dispatch.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-on-surface font-body-sm text-body-sm font-semibold shadow-sm">
            <span className="material-symbols-outlined text-base text-primary mr-2">calendar_today</span>
            <span>Today, 24 Oct</span>
          </div>
          <button onClick={exportManifest} className="bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant px-3.5 py-2 rounded-lg font-body-md text-body-md font-semibold flex items-center gap-1.5 shadow-sm transition-colors">
            <span className="material-symbols-outlined text-lg">file_download</span>
            <span>Export Manifest</span>
          </button>
          <a href={href('desktop', 'intake')} className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg font-body-md text-body-md font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]">
            <span className="material-symbols-outlined text-lg">add_task</span>
            <span>+ Record Laundry Intake</span>
          </a>
        </div>
      </div>

      {/* KPI Metric Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi icon="inventory_2" iconCls="bg-surface-container text-primary" badge={<><span className="material-symbols-outlined text-xs">trending_up</span> 12% vs y'day</>} badgeCls="bg-primary-fixed text-on-primary-fixed flex items-center gap-0.5" label="Today's Intake" n={stats.intake.n} kgVal={stats.intake.kg} kgCls="text-primary" bar="bg-primary" width="78%" />
        <Kpi icon="local_shipping" iconCls="bg-secondary-container text-on-secondary-fixed" badge="Dispatch Stage" badgeCls="bg-surface-container-high text-on-surface" label="Ready for Delivery" n={stats.ready.n} kgVal={stats.ready.kg} kgCls="text-tertiary" bar="bg-tertiary" width="52%" />
        <Kpi icon="schedule" iconCls="bg-error-container text-on-error-container" badge="2d Older Alert" badgeCls="bg-error-container text-on-error-container" label="Carried Forward" n={stats.carried.n} nCls="text-error" kgVal={stats.carried.kg} kgCls="text-error" bar="bg-error" width="25%" />
        <Kpi icon="check_circle" iconCls="bg-surface-container text-primary" badge="Completed Handover" badgeCls="bg-surface-container-high text-on-surface" label="Delivered Today" n={stats.delivered.n} kgVal={stats.delivered.kg} kgCls="text-primary" bar="bg-primary" width="68%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* LEFT: Manual Intake Station */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">scale</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Manual Intake Station</h3>
              </div>
              <span className="font-label-meta text-label-meta text-secondary font-bold uppercase tracking-wider">Entry Mode: Keypad</span>
            </div>
            {/* Customer Lookup (name / customer ID only) */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-meta text-label-meta font-bold text-on-surface-variant uppercase tracking-wider">Customer Lookup</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-xl">person_search</span>
                <input {...f.search.inputProps} className="w-full pl-10 pr-10 py-2.5 bg-surface-container-lowest border-2 border-primary rounded-lg font-body-md text-body-md font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Search customer name or ID... e.g. Aarav Patel" type="text" />
                <button type="button" aria-label="Clear search" onClick={f.search.clear} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
                {f.search.results}
              </div>
            </div>
            {/* Active Customer Card with Direct Phone Call */}
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-space-md flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body-lg text-body-lg font-bold text-on-surface">{f.c.name}</span>
                    <span className="bg-surface-container text-on-surface font-label-badge text-label-badge px-2 py-0.5 rounded font-bold">{f.c.id}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {L.yearLabel(f.c)} · Plan: {f.plan.name} {f.plan.quotaKg}kg/{f.plan.period}
                  </p>
                </div>
                <span className="bg-primary-fixed text-on-primary-fixed font-label-badge text-label-badge px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap">Active Subscriber</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant">
                <div className="flex items-center gap-1.5 text-secondary">
                  <span className="material-symbols-outlined text-base">call</span>
                  <span className="font-body-sm text-body-sm font-medium">{f.c.phone}</span>
                </div>
                <a className="bg-surface-container hover:bg-secondary-container text-on-surface font-body-sm text-body-sm font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border border-outline-variant" href={L.telHref(f.c.phone)}>
                  <span className="material-symbols-outlined text-sm text-primary">phone_forwarded</span>
                  <span>Direct Call</span>
                </a>
              </div>
            </div>
            {/* Manual Weight Numeric Input */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="manual-weight-input" className="font-label-meta text-label-meta font-bold text-on-surface-variant uppercase tracking-wider">Direct Weight Entry (Manual)</label>
                <span className="font-label-meta text-label-meta text-primary font-semibold">Single Entry Baseline</span>
              </div>
              <div className={`bg-surface-container-low border rounded-xl p-space-md flex items-center justify-between focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all ${f.weightValid ? 'border-outline-variant' : 'border-error'}`}>
                <div className="flex flex-col">
                  <span className="font-label-meta text-label-meta text-secondary uppercase font-bold tracking-wider">Gross Bundle Weight</span>
                  <span className="font-body-sm text-body-sm text-outline">Enter exact facility weight</span>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-lg border border-outline-variant shadow-inner">
                  <input value={f.weight} onChange={(e) => f.setWeight(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && f.submit()} className="font-display-weight text-display-weight text-on-surface bg-transparent text-right w-32 border-0 p-0 focus:ring-0 focus:outline-none" id="manual-weight-input" max="50" min="0" step="0.01" type="number" inputMode="decimal" />
                  <span className="font-headline-sm text-headline-sm font-bold text-outline uppercase">KG</span>
                </div>
              </div>
            </div>
            {/* Bag Count & Wash Priority */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-meta text-label-meta font-bold text-on-surface-variant uppercase tracking-wider">Total Laundry Bags</label>
                <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-lg px-2 py-1.5">
                  <button type="button" aria-label="Fewer bags" onClick={f.decBags} className="w-7 h-7 rounded bg-surface-container-lowest border border-outline-variant font-bold active:scale-95">-</button>
                  <span className="font-body-md text-body-md font-bold text-on-surface">
                    {f.bags} Canvas {f.bags === 1 ? 'Bag' : 'Bags'}
                  </span>
                  <button type="button" aria-label="More bags" onClick={f.incBags} className="w-7 h-7 rounded bg-surface-container-lowest border border-outline-variant font-bold active:scale-95">+</button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-meta text-label-meta font-bold text-on-surface-variant uppercase tracking-wider">Wash Priority</label>
                <button type="button" onClick={() => f.setExpress(!f.express)} title="Tap to switch Standard / Express" className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 hover:border-primary transition-colors">
                  <span className="font-body-md text-body-md font-bold text-on-surface">{f.express ? 'Express (12h)' : 'Standard (24h)'}</span>
                  <span className={`material-symbols-outlined text-base ${f.express ? 'text-error fill-1' : 'text-primary'}`}>bolt</span>
                </button>
              </div>
            </div>
            {/* Service Types */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-meta text-label-meta font-bold text-on-surface-variant uppercase tracking-wider">Service Types Selected</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ['Wash & Fold', 'Tumble dry standard'],
                  ['Steam Press', '+₹35 / 5 units'],
                ].map(([name, sub]) => {
                  const on = f.services.includes(name);
                  return (
                    <label key={name} className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer ${on ? 'border-2 border-primary bg-surface-container-low' : 'border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low'}`}>
                      <input checked={on} onChange={() => f.toggleService(name)} className="rounded border-outline text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm font-bold text-on-surface">{name}</span>
                        <span className="font-label-meta text-label-meta text-secondary">{sub}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
            {/* Instant Ledger Impact Preview */}
            <div className="bg-surface-container rounded-xl p-space-md border border-outline-variant flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-meta text-label-meta font-bold text-on-surface-variant uppercase tracking-wider">Ledger Impact Preview</span>
                <span className="font-label-meta text-label-meta font-bold text-tertiary">Verified Quota</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1 text-center">
                <div className="bg-surface-container-lowest p-2 rounded-lg border border-outline-variant">
                  <p className="font-label-meta text-label-meta text-secondary">Current Balance</p>
                  <p className="font-label-numeric text-label-numeric font-bold text-on-surface">{L.kg(f.c.balanceKg)} KG</p>
                </div>
                <div className="bg-surface-container-lowest p-2 rounded-lg border border-outline-variant">
                  <p className="font-label-meta text-label-meta text-secondary">This Deduction</p>
                  <p className="font-label-numeric text-label-numeric font-bold text-error">- {L.kg(f.preview.weight)} KG</p>
                </div>
                <div className="bg-surface-container-lowest p-2 rounded-lg border border-outline-variant">
                  <p className="font-label-meta text-label-meta text-secondary">Remaining Quota</p>
                  <p className={`font-label-numeric text-label-numeric font-bold ${f.preview.after < 0 ? 'text-error' : 'text-primary'}`}>{L.kg(f.preview.after)} KG</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs text-secondary px-1 pt-1">
                <span>
                  Billable Excess: <strong>{L.inr(f.preview.excessCharge)}.00</strong>
                </span>
                <span className={`font-semibold flex items-center gap-1 text-right ${note.cls}`}>
                  <span className="material-symbols-outlined text-sm">{f.preview.tone === 'ok' ? 'check' : 'warning'}</span> {note.text}
                </span>
              </div>
            </div>
            <button onClick={f.submit} disabled={!f.weightValid} className="w-full min-h-[48px] bg-primary hover:bg-primary-container text-on-primary rounded-lg font-body-lg text-body-lg font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="material-symbols-outlined text-xl">print</span>
              <span>Confirm &amp; Generate Intake Tag</span>
            </button>
          </div>
        </div>

        {/* RIGHT: Operational Order Stream */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-space-sm border-b border-outline-variant">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Operational Order Stream</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Live station pipeline and delivery staging manifest</p>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant">
                {(['all', 'ready', 'washing', 'delivered'] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTab(t);
                      setPage(0);
                    }}
                    className={`px-3 py-1 rounded font-body-sm text-body-sm capitalize whitespace-nowrap ${tab === t ? 'bg-surface-container-lowest font-bold text-primary shadow-sm' : 'hover:bg-surface-container text-secondary transition-colors'}`}
                  >
                    {t} ({counts[t]})
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant text-on-surface-variant font-label-meta text-label-meta uppercase tracking-wider">
                    <th className="py-2.5 px-2">Order #</th>
                    <th className="py-2.5 px-2">Customer &amp; Academic Info</th>
                    <th className="py-2.5 px-2 text-right">Weight</th>
                    <th className="py-2.5 px-2">Service</th>
                    <th className="py-2.5 px-2">Status</th>
                    <th className="py-2.5 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant font-body-md text-body-md">
                  {shown.map((o) => {
                    const c = s.customer(o.customerId);
                    const carried = L.isCarried(o);
                    const done = o.status === 'delivered';
                    return (
                      <tr key={o.id} className={`hover:bg-surface-container-low/60 transition-colors group ${done ? 'opacity-80' : ''}`}>
                        <td className="py-3 px-2">
                          <span className={`font-label-numeric text-label-numeric font-bold ${done ? 'text-secondary' : 'text-primary'}`}>#{o.id}</span>
                          <span className={`block font-label-meta text-label-meta whitespace-nowrap ${carried ? 'text-error font-bold' : 'text-secondary'}`}>{o.day === L.TODAY ? o.time : `${L.dayLabel(o.day)} ${o.time}`}</span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="font-body-md text-body-md font-bold text-on-surface">{c.name}</div>
                          <div className="font-label-meta text-label-meta text-secondary">
                            {c.id} · {L.yearLabel(c, true)}
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <span className={`inline-block bg-surface-container px-2 py-1 rounded font-label-numeric text-label-numeric font-bold whitespace-nowrap ${done ? 'text-secondary' : 'text-on-surface'}`}>{L.kg(o.kg)} KG</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="font-body-sm text-body-sm text-on-surface">{o.service}</span>
                          {done ? (
                            <span className="block font-label-meta text-label-meta text-secondary">Completed</span>
                          ) : o.express ? (
                            <span className="block font-label-meta text-label-meta text-tertiary font-semibold">Express 12h</span>
                          ) : carried ? (
                            <span className="block font-label-meta text-label-meta text-error font-semibold">Priority Aged</span>
                          ) : (
                            <span className="block font-label-meta text-label-meta text-secondary">Standard</span>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <StatusPill o={o} />
                        </td>
                        <td className="py-3 px-2 text-right">
                          {done ? (
                            <span className="font-label-meta text-label-meta text-secondary font-semibold">Ledger Billed</span>
                          ) : (
                            <div className="flex items-center justify-end gap-1.5">
                              {o.status === 'washing' && (
                                <button onClick={() => s.act.markReady([o.id])} className="bg-surface-container hover:bg-surface-container-high text-on-surface px-2.5 py-1 rounded font-body-sm text-body-sm font-semibold transition-colors whitespace-nowrap" title="Washing done — move to ready">
                                  Mark Ready
                                </button>
                              )}
                              {o.status === 'ready' && (
                                <button onClick={() => s.act.pushToCart([o.id])} className="bg-primary hover:bg-primary-container text-on-primary px-2.5 py-1 rounded font-body-sm text-body-sm font-semibold flex items-center gap-1 transition-all">
                                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                                  <span>Dispatch</span>
                                </button>
                              )}
                              {o.status === 'in_cart' && (
                                <button onClick={() => s.act.handover([o.id])} className="bg-primary hover:bg-primary-container text-on-primary px-2.5 py-1 rounded font-body-sm text-body-sm font-semibold flex items-center gap-1 transition-all">
                                  <span className="material-symbols-outlined text-sm">verified</span>
                                  <span>Handover</span>
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between pt-space-sm border-t border-outline-variant font-body-sm text-body-sm text-secondary">
              <span>
                Showing {shown.length} of {rows.length} facility manifests
              </span>
              <div className="flex items-center gap-2">
                <button aria-label="Previous page" onClick={() => setPage((p) => p - 1)} className="p-1 rounded hover:bg-surface-container text-on-surface disabled:opacity-40" disabled={page === 0}>
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <span className="font-semibold text-on-surface px-1">
                  Page {page + 1} of {pages}
                </span>
                <button aria-label="Next page" onClick={() => setPage((p) => p + 1)} className="p-1 rounded hover:bg-surface-container text-on-surface disabled:opacity-40" disabled={page >= pages - 1}>
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-md shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Shift Weight Audit</h4>
                <span className="font-label-meta text-label-meta text-primary font-bold">Morning Batch</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-body-sm font-body-sm p-2 rounded bg-surface-container-low">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">check_box</span>
                    <span className="font-semibold text-on-surface">Station Tare Check</span>
                  </div>
                  <span className="text-tertiary font-bold">0.00 KG Confirmed</span>
                </div>
                <div className="flex items-center justify-between text-body-sm font-body-sm p-2 rounded bg-surface-container-low">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">bolt</span>
                    <span className="font-semibold text-on-surface">Dryer Cycle Capacity</span>
                  </div>
                  <span className="text-on-surface font-bold">34.2 / 40.0 KG</span>
                </div>
              </div>
            </div>
            <div className="bg-secondary-container/40 border border-outline-variant rounded-xl p-space-md shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-lg text-primary">notifications_active</span>
                  <span className="font-headline-sm text-headline-sm font-bold">Direct Pickup Notification</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {stats.ready.n} ready bundles scheduled for cart load #{L.pad(s.nextCart)} dispatch at 11:30 AM. Call customer in advance if laundry holds express tag.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-label-meta text-label-meta text-secondary font-bold">Dispatch Officer: Devon Vance</span>
                <button onClick={() => go('desktop', 'delivery')} className="text-primary hover:text-primary-container font-body-sm text-body-sm font-bold flex items-center gap-0.5">
                  View Route Manifest <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Kpi(p: { icon: string; iconCls: string; badge: React.ReactNode; badgeCls: string; label: string; n: number; nCls?: string; kgVal: number; kgCls: string; bar: string; width: string }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-lg shadow-sm relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${p.iconCls}`}>
          <span className="material-symbols-outlined text-2xl">{p.icon}</span>
        </div>
        <span className={`font-label-badge text-label-badge px-2 py-0.5 rounded-full font-bold ${p.badgeCls}`}>{p.badge}</span>
      </div>
      <div className="mt-4">
        <p className="font-label-meta text-label-meta text-on-surface-variant font-bold uppercase tracking-wider">{p.label}</p>
        <div className="flex items-baseline gap-2 mt-1 flex-wrap">
          <span className={`font-headline-lg text-headline-lg font-extrabold ${p.nCls ?? 'text-on-surface'}`}>{p.n}</span>
          <span className="font-body-md text-body-md font-semibold text-secondary">Orders</span>
          <span className="text-outline-variant font-bold">·</span>
          <span className={`font-headline-sm text-headline-sm font-bold ${p.kgCls}`}>{L.kg(p.kgVal, 1)} KG</span>
        </div>
      </div>
      <div className="w-full bg-surface-container h-1 rounded-full mt-3 overflow-hidden">
        <div className={`${p.bar} h-full rounded-full`} style={{ width: p.width }}></div>
      </div>
    </div>
  );
}
