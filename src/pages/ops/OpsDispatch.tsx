import { useState } from 'react';
import { useStore } from '../../store';
import * as L from '../../logic';
import { CART_ROUTES, seqLabel, useRangeDispatch } from '../../ui';

type Tab = 'in_cart' | 'ready' | 'delivered';

/** Stitch "Staff Delivery Dispatch" (mobile). */
export default function OpsDispatch() {
  const s = useStore();
  const r = useRangeDispatch();
  const [tab, setTab] = useState<Tab>('in_cart');
  const [limit, setLimit] = useState(6);
  const list = s.orders.filter((o) => o.status === tab).sort(tab === 'delivered' ? L.newestFirst : (a, b) => a.day - b.day || a.seq - b.seq);
  const tabs: [Tab, string, number][] = [
    ['in_cart', 'Active Carts', s.stats.inCart.n],
    ['ready', 'Staged for Pickup', s.stats.ready.n],
    ['delivered', 'Completed Runs', s.stats.delivered.n],
  ];

  return (
    <div className="select-none">
      <header className="bg-surface-container-lowest flex justify-between items-center w-full px-margin-mobile h-14 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px]">local_laundry_service</span>
          <span className="text-headline-sm font-headline-sm font-bold text-primary">Washify Ops</span>
        </div>
        <span className="text-label-badge font-label-badge bg-primary-container text-on-primary-container px-space-md py-space-xs rounded-full flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary-fixed inline-block animate-pulse"></span> Shift Active
        </span>
      </header>
      <div className="bg-surface-container-lowest px-margin-mobile py-2.5 shadow-sm mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-secondary text-body-sm font-body-sm">
            <span className="material-symbols-outlined text-[18px] text-primary">hub</span>
            <span>Cart Line: Alpha-02</span>
            <span className="text-outline-variant">•</span>
            <span>North Sector Run</span>
          </div>
          <div className="flex items-center gap-1 text-label-badge font-label-badge text-primary bg-surface-container px-2 py-0.5 rounded">
            <span className="material-symbols-outlined text-[16px]">electric_rickshaw</span>
            <span>Next: Cart {L.pad(s.nextCart)}</span>
          </div>
        </div>
      </div>
      <main className="px-margin-mobile pb-24 max-w-xl mx-auto space-y-4">
        <div className="flex items-center bg-surface-container-low p-1 rounded-xl gap-1">
          {tabs.map(([t, label, n]) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setLimit(6);
              }}
              className={`flex-1 py-2 text-center rounded-lg text-label-badge font-label-badge transition-all duration-150 active:scale-95 ${tab === t ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-secondary hover:bg-surface-container'}`}
            >
              {label} ({n})
            </button>
          ))}
        </div>

        <section className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
              <h2 className="text-headline-sm font-headline-sm text-on-surface">Bulk Order Range Dispatch</h2>
            </div>
            <span className="text-label-meta font-label-meta text-primary bg-surface-container-low px-2 py-0.5 rounded font-semibold">Auto Batching</span>
          </div>
          <div>
            <p className="text-label-meta font-label-meta text-secondary mb-1.5">BATCH MANIFEST DATE</p>
            {r.pools.length === 0 ? (
              <p className="text-body-sm text-secondary bg-surface-container-low rounded-lg p-2.5">All ready orders are already allocated to carts.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {r.pools.map(([day, l]) => (
                  <button key={day} onClick={() => r.setDay(day)} className={`py-2 px-1 text-center rounded-lg text-label-badge font-label-badge active:scale-95 transition-all ${r.day === day ? 'border-2 border-primary bg-surface-container-low text-primary' : 'bg-surface-container text-secondary hover:bg-surface-container-high'}`}>
                    <span className="block font-bold">{day} Oct</span>
                    <span className={`text-label-meta font-label-meta ${r.day === day ? 'text-primary font-medium' : 'text-secondary'}`}>({l.length} left)</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="bg-surface-container-low p-2.5 rounded-lg space-y-2">
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-label-meta font-label-meta text-secondary mb-1">FROM SEQ ORDER</label>
                <div className="relative">
                  <select value={r.from ?? ''} onChange={(e) => r.setFrom(e.target.value)} aria-label="From sequence" className="w-full h-12 bg-surface-container-lowest text-on-surface text-label-numeric font-label-numeric rounded-lg px-2.5 py-1 appearance-none focus:outline-none focus:ring-2 focus:ring-primary shadow-sm border-0">
                    {r.pool.map((o) => (
                      <option key={o.id} value={o.seq}>
                        {seqLabel(o)}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-3 text-secondary pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-label-meta font-label-meta text-secondary mb-1">TO SEQ ORDER</label>
                <div className="relative">
                  <select value={r.to ?? ''} onChange={(e) => r.setTo(e.target.value)} aria-label="To sequence" className="w-full h-12 bg-surface-container-lowest text-on-surface text-label-numeric font-label-numeric rounded-lg px-2.5 py-1 appearance-none focus:outline-none focus:ring-2 focus:ring-primary shadow-sm border-0">
                    {r.pool
                      .filter((o) => r.from === undefined || o.seq >= r.from)
                      .map((o) => (
                        <option key={o.id} value={o.seq}>
                          {seqLabel(o)}
                        </option>
                      ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-3 text-secondary pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 px-1">
              <div className="flex items-center gap-1.5 text-label-badge font-label-badge text-on-surface font-semibold">
                <span className="material-symbols-outlined text-primary text-[18px]">shopping_bag</span>
                <span>{r.selected.length} Orders Selected</span>
              </div>
              <div className="flex items-center gap-1 text-label-badge font-label-badge text-primary bg-surface-container px-2 py-0.5 rounded">
                <span className="material-symbols-outlined text-[16px]">scale</span>
                <span>{L.kg(r.load, 1)} KG Load</span>
              </div>
            </div>
          </div>
          <button onClick={r.push} disabled={!r.selected.length} className="w-full h-12 bg-primary text-on-primary font-body-lg text-body-lg font-semibold rounded-lg flex items-center justify-center gap-2 active:bg-primary-container active:scale-95 transition-all shadow-sm disabled:opacity-50">
            <span className="material-symbols-outlined text-[22px]">add_circle</span>
            <span>+ Push Range to Delivery Slot</span>
          </button>
        </section>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <h3 className="text-headline-sm font-headline-sm text-on-surface">Cart Manifest</h3>
            <span className="text-label-meta font-label-meta text-secondary">{tabs.find((t) => t[0] === tab)![1]}</span>
          </div>
          <div className="flex items-center gap-2 text-label-meta font-label-meta text-secondary">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary-fixed-dim"></span> Ready: {s.stats.ready.n}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span> Done: {s.stats.delivered.n}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {list.length === 0 && <p className="text-body-sm text-secondary text-center py-6">Nothing in this list right now.</p>}
          {list.slice(0, limit).map((o) => {
            const c = s.customer(o.customerId);
            const done = o.status === 'delivered';
            return (
              <article key={o.id} className={`rounded-xl shadow-sm overflow-hidden flex transition-all ${done ? 'bg-surface-container-lowest/80 opacity-85' : 'bg-surface-container-lowest active:scale-[0.99]'}`}>
                <div className={`w-1.5 self-stretch shrink-0 ${done ? 'bg-outline-variant' : o.status === 'in_cart' ? 'bg-primary' : 'bg-amber-500'}`}></div>
                <div className="p-3.5 flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-label-badge font-label-badge font-bold ${done ? 'bg-surface-container text-secondary' : 'bg-surface-container-low text-primary'}`}>Seq #{L.pad(o.seq)}</span>
                        <span className="text-label-meta font-label-meta text-secondary font-mono">#{o.id}</span>
                      </div>
                      <h4 className="text-body-lg font-body-lg text-on-surface font-semibold pt-1">{c.name}</h4>
                      <p className="text-label-meta font-label-meta text-secondary">{L.yearLabel(c, true)}</p>
                    </div>
                    <div className="bg-surface-container-low px-2.5 py-1.5 rounded-lg text-right whitespace-nowrap">
                      <span className={`text-label-numeric font-label-numeric font-bold ${done ? 'text-secondary' : 'text-primary'}`}>{L.kg(o.kg)}</span>
                      <span className="text-label-meta font-label-meta text-secondary font-semibold ml-0.5">KG</span>
                    </div>
                  </div>
                  {!done && (
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-label-meta font-label-meta font-semibold">
                        {o.express ? 'Express ' : 'Standard '}
                        {o.service}
                      </span>
                      <span className="bg-surface-container text-secondary px-2 py-0.5 rounded-full text-label-meta font-label-meta flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">{o.status === 'in_cart' ? 'alt_route' : 'trolley'}</span>
                        {o.status === 'in_cart' ? `Cart ${L.pad(o.cart ?? 1)} • ${CART_ROUTES[((o.cart ?? 1) - 1) % 3]}` : L.isCarried(o) ? `Carried from ${o.day} Oct` : 'Ready for Wheel Cart'}
                      </span>
                    </div>
                  )}
                  {done ? (
                    <div className="pt-1 border-t border-outline-variant/30">
                      <div className="h-11 w-full bg-surface-container-low rounded-lg flex items-center justify-center gap-2 text-primary font-label-badge text-label-badge">
                        <span className="material-symbols-outlined text-[20px] fill-1">verified</span>
                        <span>Handover Verified</span>
                        <span className="text-label-meta font-label-meta text-secondary ml-1">{o.deliveredAt}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 pt-1 border-t border-outline-variant/30">
                      <a aria-label={`Call ${c.name}`} className="h-12 w-12 rounded-lg bg-surface-container-low text-primary flex items-center justify-center active:bg-surface-container transition-all active:scale-95 shrink-0" href={L.telHref(c.phone)}>
                        <span className="material-symbols-outlined text-[22px]">call</span>
                      </a>
                      <button onClick={() => s.act.handover([o.id])} className="h-12 flex-1 rounded-lg bg-primary text-on-primary text-label-badge font-label-badge font-semibold flex items-center justify-center gap-1.5 active:bg-primary-container active:scale-95 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                        <span>Verify Handover</span>
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
          {list.length > limit && (
            <button onClick={() => setLimit(limit + 6)} className="w-full h-11 rounded-lg border border-outline-variant text-primary text-label-badge font-semibold bg-surface-container-lowest">
              Show more ({list.length - limit} remaining)
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
