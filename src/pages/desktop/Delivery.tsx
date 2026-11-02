import { useRef, useState } from 'react';
import { useStore } from '../../store';
import * as L from '../../logic';
import { CART_CARRIERS, CART_ROUTES, downloadCsv, seqLabel, useRangeDispatch } from '../../ui';

type Tab = 'in_cart' | 'ready' | 'delivered';
const TABS: [Tab, string][] = [
  ['in_cart', 'Active Carts'],
  ['ready', 'Staged for Pickup'],
  ['delivered', 'Completed Runs'],
];
const PAGE = 4;

export default function Delivery() {
  const s = useStore();
  const r = useRangeDispatch();
  const [tab, setTab] = useState<Tab>('in_cart');
  const [page, setPage] = useState(0);
  const [alertOpen, setAlertOpen] = useState(true);
  const bulkRef = useRef<HTMLDivElement>(null);
  const { stats } = s;

  const rows = s.orders.filter((o) => o.status === tab).sort(tab === 'delivered' ? L.newestFirst : (a, b) => a.day - b.day || a.seq - b.seq);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const shown = rows.slice(page * PAGE, page * PAGE + PAGE);
  const count = { in_cart: stats.inCart.n, ready: stats.ready.n, delivered: stats.delivered.n };

  const exportRoster = () =>
    downloadCsv(`washify_${tab}_roster.csv`, [
      ['Seq', 'Order #', 'Customer', 'Academic Info', 'Weight (KG)', 'Packaging', 'Service', 'Stage', 'Phone'],
      ...rows.map((o) => {
        const c = s.customer(o.customerId);
        return [L.pad(o.seq), o.id, c.name, L.yearLabel(c, true), L.kg(o.kg), o.bags, o.service, stageText(o), c.phone];
      }),
    ]);

  return (
    <main className="px-space-xl py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Delivery Management &amp; Campus Dispatch</h1>
          <p className="font-body-md text-secondary mt-0.5">Manage cart assignments, route dispatching, and handover verification.</p>
        </div>
        <button onClick={() => bulkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="bg-primary hover:bg-primary-container text-on-primary font-body-md font-semibold px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-2 transition-all duration-150 active:scale-95">
          <span className="material-symbols-outlined text-[20px]">add_circle</span> + Create Cart Run
        </button>
      </div>

      {/* Summary KPI Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Ready for Dispatch" icon="inventory_2" iconCls="bg-surface-container-high text-primary" value={stats.ready.n} foot={`${L.kg(stats.ready.kg, 1)} KG Total Load`} footIcon="scale" footCls="text-primary" bar="bg-primary" />
        <Kpi label="En Route / In Cart" icon="departure_board" iconCls="bg-secondary-container text-secondary" value={stats.inCart.n} foot={`${L.kg(stats.inCart.kg, 1)} KG Active Transit`} footIcon="scale" footCls="text-secondary" bar="bg-secondary" />
        <Kpi label="Handed Over Today" icon="task_alt" iconCls="bg-emerald-100 text-emerald-800" value={stats.delivered.n} foot={`${L.kg(stats.delivered.kg, 1)} KG Verified Dropped`} footIcon="check_circle" footCls="text-emerald-700" bar="bg-emerald-600" />
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-label-meta text-secondary font-medium tracking-wide uppercase">Delivery Success Rate</span>
            <span className="p-1.5 rounded-lg bg-surface-container-high text-primary">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </span>
          </div>
          <div className="mt-2">
            <span className="font-display-weight text-3xl font-bold text-primary">98.4%</span>
            <p className="font-label-meta text-xs font-medium text-secondary mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">timer</span> Avg handover time 4.2 mins
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-tertiary"></div>
        </div>
      </section>

      {alertOpen && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 rounded-xl px-4 py-3 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-600 text-[24px]">warning</span>
            <div>
              <span className="font-headline-sm text-sm font-bold">Mandatory Pre-Departure Tag Check:</span>{' '}
              <span className="font-body-sm text-amber-800 ml-1">Dispatch Alert: Always verify waterproof bundle barcodes against the physical cart manifest before unlocking wheels. Double-check bags exceeding 6.0 KG.</span>
            </div>
          </div>
          <button onClick={() => setAlertOpen(false)} className="text-amber-900 font-label-badge text-xs underline font-semibold hover:text-amber-950 whitespace-nowrap">
            Acknowledge SOP
          </button>
        </div>
      )}

      <div className="w-full space-y-4">
        {/* Bulk Order Range Dispatch */}
        <div ref={bulkRef} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-outline-variant mb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">splitscreen</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface">Bulk Order Range Dispatch</h3>
                  <span className="bg-secondary-container text-on-secondary-container font-label-badge text-[11px] px-2 py-0.5 rounded-full font-semibold">Batch Automation</span>
                </div>
                <p className="font-label-meta text-xs text-secondary mt-0.5">Select date, filter order sequence range, and dispatch directly to cart runs or staging bays.</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-surface-container px-2.5 py-1 rounded-md border border-outline-variant w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Auto-Sequence Ready
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
            <div className="bg-surface-container-low/60 rounded-lg p-3.5 border border-outline-variant flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-meta text-[11px] font-bold text-secondary uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary">calendar_month</span> 1. Pending Overview
                  </span>
                  <span className="text-[11px] font-bold text-primary bg-surface-container px-2 py-0.5 rounded border border-outline-variant">{r.totalPending} Pending</span>
                </div>
                <p className="text-xs text-secondary mb-2.5 leading-tight">Unassigned orders awaiting cart allocation across active dates:</p>
                <div className="space-y-1.5">
                  {r.pools.length === 0 && <p className="text-xs text-secondary bg-surface-container-lowest p-2 rounded-md border border-outline-variant">All ready orders are allocated to carts.</p>}
                  {r.pools.map(([day, list]) => (
                    <button key={day} onClick={() => r.setDay(day)} className={`w-full bg-surface-container-lowest p-2 rounded-md border flex items-center justify-between text-xs ${r.day === day ? 'border-primary ring-1 ring-primary' : 'border-outline-variant hover:border-primary'}`}>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${day === L.TODAY ? 'bg-primary' : 'bg-amber-500'}`}></span>
                        <span className="font-semibold text-on-surface">
                          {day} Oct{day === L.TODAY ? ' (Today)' : ''}
                        </span>
                        <span className="text-secondary text-[11px]">
                          (#{L.pad(list[0].seq)} - #{L.pad(list.at(-1)!.seq)})
                        </span>
                      </div>
                      <span className="font-semibold text-primary bg-surface-container-low px-1.5 py-0.5 rounded text-[11px]">{list.length} Orders</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-secondary flex items-center gap-1 pt-1">
                <span className="material-symbols-outlined text-[13px] text-emerald-700">verified</span> Station 04 live queue synchronized
              </div>
            </div>
            <div className="bg-surface-container-low/60 rounded-lg p-3.5 border border-outline-variant flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-meta text-[11px] font-bold text-secondary uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary">pin</span> 2. Range Selection
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">{L.kg(r.load, 1)} KG Load</span>
                </div>
                <div className="mb-2.5">
                  <label className="block text-[11px] font-medium text-secondary mb-1">Particular Date</label>
                  <select value={r.day} onChange={(e) => r.setDay(Number(e.target.value))} className="w-full px-2.5 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-md text-xs font-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-medium">
                    {r.pools.map(([day, list]) => (
                      <option key={day} value={day}>
                        {day} Oct 2026 ({day === L.TODAY ? 'Today • ' : ''}
                        {list.length} Pending)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-secondary mb-1">From Order Seq</label>
                    <select value={r.from ?? ''} onChange={(e) => r.setFrom(e.target.value)} className="w-full px-2 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-md text-xs font-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                      {r.pool.map((o) => (
                        <option key={o.id} value={o.seq}>
                          {seqLabel(o)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-secondary mb-1">To Order Seq</label>
                    <select value={r.to ?? ''} onChange={(e) => r.setTo(e.target.value)} className="w-full px-2 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-md text-xs font-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                      {r.pool
                        .filter((o) => r.from === undefined || o.seq >= r.from)
                        .map((o) => (
                          <option key={o.id} value={o.seq}>
                            {seqLabel(o)}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-md p-2 border border-outline-variant flex items-center justify-between text-xs mb-3">
                  <span className="text-secondary text-[11px] font-medium">Selected Range:</span>
                  <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_box</span>
                    {r.selected.length} Orders{r.selected.length > 0 && ` (#${L.pad(r.from!)} to #${L.pad(r.to!)})`}
                  </span>
                </div>
              </div>
              <button onClick={r.push} disabled={!r.selected.length} className="w-full bg-primary hover:bg-primary-container text-on-primary font-bold px-4 py-3 rounded-xl transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined text-[20px]">add_task</span>
                <span>+ Push Range to Delivery Slot</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cart Manifest */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden w-full">
          <div className="p-4 border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-bright">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Cart Manifest &amp; Active Delivery Runs</h2>
                <span className="bg-primary text-on-primary font-label-badge text-xs px-2.5 py-0.5 rounded-full font-bold">Live Sync</span>
              </div>
              <p className="font-body-sm text-secondary mt-0.5">Synchronized live with Station 04 sorting scale &amp; RFID campus dispatch checkpoints</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center bg-surface-container rounded-lg p-1 border border-outline-variant">
                {TABS.map(([t, label]) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTab(t);
                      setPage(0);
                    }}
                    className={`px-3.5 py-1.5 rounded-md font-body-sm text-xs transition-colors ${tab === t ? 'font-semibold bg-surface-container-lowest text-primary shadow-sm' : 'font-medium text-secondary hover:text-on-surface'}`}
                  >
                    {label} ({count[t]})
                  </button>
                ))}
              </div>
              <button onClick={exportRoster} className="px-3 py-1.5 rounded-lg border border-outline-variant text-secondary hover:bg-surface-container hover:text-on-surface font-body-sm text-xs font-medium flex items-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-[18px]">download</span> Export Roster
              </button>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant text-secondary font-label-meta uppercase text-[11px] tracking-wider whitespace-nowrap">
                  <th className="py-3 px-2.5 font-semibold">Seq &amp; Order ID</th>
                  <th className="py-3 px-2.5 font-semibold">Customer Details</th>
                  <th className="py-3 px-2.5 font-semibold">Load &amp; Packaging</th>
                  <th className="py-3 px-2.5 font-semibold">Service Type</th>
                  <th className="py-3 px-2.5 font-semibold">Dispatch Stage</th>
                  <th className="py-3 px-2.5 font-semibold">Contact</th>
                  <th className="py-3 px-2.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant font-body-sm text-sm">
                {shown.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-secondary text-sm">
                      Nothing here yet.
                    </td>
                  </tr>
                )}
                {shown.map((o) => (
                  <ManifestRow key={o.id} o={o} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-surface-bright border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondary">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-medium">
                Showing <strong className="text-on-surface">{shown.length}</strong> of <strong className="text-on-surface">{rows.length}</strong> manifest allocations
              </span>
              <span className="text-outline-variant">•</span>
              <span>Station 04 Scale Synced</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <button onClick={() => setPage(page - 1)} className="px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container disabled:opacity-50 font-medium transition-colors" disabled={page === 0}>
                Previous
              </button>
              <span className="px-2 py-1 text-primary font-semibold">
                {page + 1} / {pages}
              </span>
              <button onClick={() => setPage(page + 1)} disabled={page >= pages - 1} className="px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container disabled:opacity-50 font-medium transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function stageText(o: L.Order) {
  if (o.status === 'in_cart') return `Cart ${L.pad(o.cart ?? 1)} • ${CART_ROUTES[((o.cart ?? 1) - 1) % 3]}`;
  if (o.status === 'ready') return `Staging Bay B • Slot ${L.pad((o.seq % 12) + 1)}`;
  return 'Handover Verified';
}

function ManifestRow({ o }: { o: L.Order }) {
  const s = useStore();
  const c = s.customer(o.customerId);
  const done = o.status === 'delivered';
  const loaded = o.status === 'in_cart';
  return (
    <tr className={`transition-colors relative group ${done ? 'hover:bg-emerald-50/40 bg-emerald-50/20' : 'hover:bg-surface-container-low/40'}`}>
      <td className="py-3 px-2.5 align-middle whitespace-nowrap">
        <div className="flex items-center gap-2.5">
          <div className={`w-1 h-9 rounded-full shrink-0 ${done ? 'bg-emerald-600' : loaded ? 'bg-amber-500' : 'bg-primary'}`}></div>
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-label-numeric font-bold shrink-0 text-xs ${done ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container text-primary'}`}>{done ? <span className="material-symbols-outlined text-[18px]">check</span> : `#${L.pad(o.seq)}`}</div>
          <div>
            <span className="font-headline-sm text-xs font-bold text-on-surface block leading-tight">#{o.id}</span>
            <span className={`font-label-badge text-[10px] px-1.5 py-0.5 rounded-full font-semibold inline-block mt-0.5 ${loaded ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{done ? 'Verified Complete' : loaded ? 'Loaded in Cart' : L.isCarried(o) ? `Carried · ${o.day} Oct` : 'Ready for Dispatch'}</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-2.5 align-middle">
        <div className="font-semibold text-on-surface text-xs leading-tight">{c.name}</div>
        <div className="text-[11px] text-secondary mt-0.5">{L.yearLabel(c, true)}</div>
      </td>
      <td className="py-3 px-2.5 align-middle whitespace-nowrap">
        <div className="flex items-center gap-1 font-semibold text-on-surface text-xs">
          <span className={`material-symbols-outlined text-[16px] ${done ? 'text-emerald-700' : 'text-primary'}`}>scale</span> {L.kg(o.kg)} KG
        </div>
        <div className="text-[11px] text-secondary mt-0.5">{o.bags}</div>
      </td>
      <td className="py-3 px-2.5 align-middle whitespace-nowrap">
        <span className="bg-surface-container text-secondary font-label-badge text-[11px] px-2 py-0.5 rounded font-medium inline-block">{o.service}</span>
        <div className={`text-[11px] mt-0.5 ${o.express ? 'text-error font-semibold' : 'text-secondary'}`}>{o.express ? 'Express 12h' : 'Standard 24h'}</div>
      </td>
      <td className="py-3 px-2.5 align-middle whitespace-nowrap">
        {done ? (
          <>
            <div className="flex items-center gap-1 text-xs text-emerald-700 font-semibold">
              <span className="material-symbols-outlined text-[15px]">done_all</span> Handover Verified
            </div>
            <div className="text-[11px] text-secondary mt-0.5">
              {o.deliveredAt} • {o.deliveredBy}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1 text-xs text-on-surface font-medium">
              <span className={`material-symbols-outlined text-[15px] ${loaded ? 'text-amber-600' : 'text-primary'}`}>{loaded ? 'local_shipping' : 'meeting_room'}</span> {stageText(o)}
            </div>
            <div className="text-[11px] text-secondary mt-0.5">{loaded ? `Carrier: ${CART_CARRIERS[((o.cart ?? 1) - 1) % 3]}` : 'Ready for Unlock'}</div>
          </>
        )}
      </td>
      <td className="py-3 px-2.5 align-middle whitespace-nowrap">
        {done ? (
          <span className="inline-flex items-center gap-1 text-xs text-secondary bg-surface-container px-2 py-1 rounded-lg border border-outline-variant font-medium">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified Phone
          </span>
        ) : (
          <a href={L.telHref(c.phone)} className="inline-flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors bg-surface-container-low hover:bg-surface-container px-2 py-1 rounded-lg border border-outline-variant font-medium">
            <span className="material-symbols-outlined text-[14px] text-primary">call</span> {c.phone}
          </a>
        )}
      </td>
      <td className="py-3 px-2.5 align-middle text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5">
          {done && (
            <span className="font-label-badge text-emerald-700 font-semibold px-2 py-1 bg-emerald-100/70 rounded-md inline-flex items-center gap-1 border border-emerald-200 text-xs">
              <span className="material-symbols-outlined text-[13px]">verified</span> Slip Generated
            </span>
          )}
          <button onClick={() => s.notYet('Tag & slip printing')} className="p-1.5 text-secondary hover:text-primary hover:bg-surface-container rounded-lg border border-outline-variant transition-colors" title="Print Tag & Slip">
            <span className="material-symbols-outlined text-[16px]">print</span>
          </button>
          {!done && (
            <button onClick={() => s.act.handover([o.id])} className="bg-primary hover:bg-primary-container text-on-primary font-body-sm font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-150 active:scale-95 flex items-center gap-1 shadow-sm text-xs">
              <span className="material-symbols-outlined text-[15px]">verified</span> Handover
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function Kpi(p: { label: string; icon: string; iconCls: string; value: number; foot: string; footIcon: string; footCls: string; bar: string }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="font-label-meta text-secondary font-medium tracking-wide uppercase">{p.label}</span>
        <span className={`p-1.5 rounded-lg ${p.iconCls}`}>
          <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
        </span>
      </div>
      <div className="mt-2">
        <div className="flex items-baseline gap-2">
          <span className="font-display-weight text-3xl font-bold text-on-surface">{p.value}</span>
          <span className="font-body-sm text-secondary font-medium">Orders</span>
        </div>
        <p className={`font-label-meta text-xs font-semibold mt-1 flex items-center gap-1 ${p.footCls}`}>
          <span className="material-symbols-outlined text-sm">{p.footIcon}</span> {p.foot}
        </p>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${p.bar}`}></div>
    </div>
  );
}
