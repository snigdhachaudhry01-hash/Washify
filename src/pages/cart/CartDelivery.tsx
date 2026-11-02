import { useState } from 'react';
import { useStore } from '../../store';
import * as L from '../../logic';
import { CartHeader } from './shared';

type Filter = 'ready' | 'carried' | 'delivered';

/** Stitch "Cart Delivery Checklist" — select bundles, then confirm handover (PRD BR-05). */
export default function CartDelivery() {
  const s = useStore();
  const [filter, setFilter] = useState<Filter>('ready');
  const [q, setQ] = useState('');
  const [picked, setPicked] = useState<string[]>([]);
  const [limit, setLimit] = useState(12);

  const handoverable = s.orders.filter((o) => o.status === 'ready' || o.status === 'in_cart');
  const lists: Record<Filter, L.Order[]> = {
    ready: handoverable,
    carried: handoverable.filter((o) => o.day < L.TODAY),
    delivered: s.orders.filter((o) => o.status === 'delivered'),
  };
  const needle = q.trim().toLowerCase();
  const rows = lists[filter]
    .filter((o) => !needle || o.id.includes(needle) || s.customer(o.customerId).name.toLowerCase().includes(needle))
    .sort(filter === 'delivered' ? L.newestFirst : (a, b) => a.day - b.day || a.seq - b.seq);

  const selected = handoverable.filter((o) => picked.includes(o.id));
  const total = L.round2(selected.reduce((a, o) => a + o.kg, 0));
  const names = [...new Set(selected.map((o) => L.shortName(s.customer(o.customerId).name)))];
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const confirm = () => {
    s.act.handover(selected.map((o) => o.id));
    setPicked([]);
  };

  return (
    <>
      <CartHeader />
      <main className="px-4 pb-72">
        <section className="mt-3 mb-4">
          <div className="flex items-baseline justify-between gap-2">
            <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">Cart Delivery Check</h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-label-meta font-label-meta whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> PRD 5.4 / 9.3
            </span>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant mt-0.5">Hostel Cart Handover · Today, 24 Oct</p>
        </section>
        <section className="space-y-3 mb-5">
          <div className="relative bg-surface-container-lowest rounded-xl p-1 border border-outline-variant/60 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-1.5 pl-2.5 min-w-0 flex-1">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0">calendar_today</span>
              <span className="text-body-sm text-secondary font-medium shrink-0">Schedule:</span>
              <span className="text-body-md font-semibold text-on-surface py-0.5 truncate">{filter === 'carried' ? 'Earlier dates' : 'Today (24 Oct)'}</span>
            </div>
            <div className="pr-1.5 shrink-0">
              <button onClick={() => setFilter(filter === 'carried' ? 'ready' : 'carried')} className="text-label-meta text-primary hover:underline px-2 py-1 bg-surface-container-low rounded-lg transition-colors font-medium whitespace-nowrap">
                {filter === 'carried' ? 'Back to Today' : 'Earlier Dates'}
              </button>
            </div>
          </div>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">search</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter orders" className="w-full h-12 pl-11 pr-10 bg-surface-container-lowest rounded-xl border border-outline-variant/80 text-on-surface text-body-md font-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm" placeholder="Filter by Order # or Name..." type="text" />
            {q && (
              <button onClick={() => setQ('')} aria-label="Clear filter" className="absolute right-2.5 w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:text-on-surface active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {(
              [
                ['ready', 'check_circle', `All Ready (${lists.ready.length})`],
                ['carried', 'update', `Carried Forward (${lists.carried.length})`],
                ['delivered', 'task_alt', `Delivered Today (${lists.delivered.length})`],
              ] as [Filter, string, string][]
            ).map(([f, icon, label]) => (
              <button
                key={f}
                onClick={() => (setFilter(f), setLimit(12))}
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-label-badge font-label-badge shrink-0 active:scale-95 transition-all ${filter === f ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
              >
                <span className={`material-symbols-outlined text-[16px] ${filter === f ? 'fill-1' : 'text-secondary'}`}>{icon}</span> {label}
              </button>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-label-meta font-label-meta text-secondary uppercase tracking-wider">Cart Handover Checklist</span>
            {filter !== 'delivered' && rows.length > 0 && (
              <button onClick={() => setPicked(rows.every((o) => picked.includes(o.id)) ? [] : rows.map((o) => o.id))} className="text-label-badge font-label-badge text-primary hover:underline">
                {rows.every((o) => picked.includes(o.id)) ? 'Clear Selection' : 'Select All Shown'}
              </button>
            )}
          </div>
          {rows.length === 0 && <p className="text-body-sm text-secondary text-center py-6">No orders match.</p>}
          {rows.slice(0, limit).map((o) => {
            const c = s.customer(o.customerId);
            const done = o.status === 'delivered';
            const on = picked.includes(o.id);
            const carried = o.day < L.TODAY;
            return (
              <article key={o.id} className={`relative bg-surface-container-lowest rounded-xl border p-3.5 shadow-sm transition-all overflow-hidden flex items-start gap-3.5 ${on ? 'border-primary' : 'border-outline-variant/80'} ${done ? 'opacity-80' : ''}`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${done ? 'bg-outline' : carried ? 'bg-secondary' : 'bg-primary'}`}></div>
                <label className={`shrink-0 flex items-center justify-center min-w-[44px] min-h-[44px] ${done ? 'cursor-default' : 'cursor-pointer'}`}>
                  <input checked={done || on} disabled={done} onChange={() => toggle(o.id)} className="sr-only peer" type="checkbox" aria-label={`Select order ${o.id}`} />
                  <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-transform active:scale-90 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 ${done || on ? 'bg-primary border-primary text-on-primary shadow-sm' : 'bg-surface border-outline/60 text-transparent hover:border-primary'}`}>
                    <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                  </div>
                </label>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-body-lg font-body-lg text-on-surface font-semibold truncate">
                      #{o.id} · {c.name}
                    </h3>
                    {done ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-label-badge font-label-badge shrink-0">Delivered {o.deliveredAt}</span>
                    ) : carried ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-label-badge font-label-badge shrink-0 font-medium">
                        <span className="material-symbols-outlined text-[13px]">schedule</span> Carried Forward
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-primary text-label-badge font-label-badge shrink-0">{o.status === 'in_cart' ? `In Cart ${L.pad(o.cart ?? 1)}` : 'Ready for Collection'}</span>
                    )}
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="font-semibold text-on-surface">{L.kg(o.kg)} kg</span>
                    <span className="text-outline-variant">•</span>
                    <span className={carried && !done ? 'text-error font-medium' : 'text-secondary'}>
                      Received {L.dayLabel(o.day)}
                      {carried && !done && ` (${L.TODAY - o.day} day${L.TODAY - o.day > 1 ? 's' : ''} ago)`}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
          {rows.length > limit && (
            <button onClick={() => setLimit(limit + 12)} className="w-full h-11 rounded-lg border border-outline-variant text-primary text-label-badge font-semibold bg-surface-container-lowest">
              Show more ({rows.length - limit} remaining)
            </button>
          )}
        </section>
      </main>
      {/* Sticky handover confirmation sheet (PRD error prevention BR-05) */}
      <aside className="fixed bottom-16 inset-x-0 z-40 max-w-md mx-auto px-3">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.18)] p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2.5 px-3 py-2 bg-surface-container-low rounded-xl border border-outline-variant/40 mb-3">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0">verified_user</span>
            <div className="text-label-meta font-label-meta text-on-surface leading-tight">
              <span className="font-semibold text-on-surface">Audit Lock:</span>{' '}
              {selected.length ? (
                <>
                  Handing over to <span className="font-medium text-primary">{names.length > 3 ? `${names.slice(0, 3).join(', ')} +${names.length - 3}` : names.join(' & ')}</span>.{' '}
                </>
              ) : (
                'Select bundles to hand over. '
              )}
              Timestamp &amp; Staff <span className="font-medium text-on-surface">{s.user.name}</span> will be stamped.
            </div>
          </div>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${selected.length ? 'bg-primary animate-pulse' : 'bg-outline-variant'}`}></div>
              <span className="text-body-md font-body-md font-semibold text-on-surface">
                {selected.length} order{selected.length === 1 ? '' : 's'} selected
              </span>
            </div>
            <div className="inline-flex items-baseline gap-1 bg-surface px-2.5 py-1 rounded-lg border border-outline-variant/60">
              <span className="text-label-numeric font-label-numeric text-primary font-bold tracking-tight">{L.kg(total)}</span>
              <span className="text-label-meta font-label-meta text-secondary font-bold">KG TOTAL</span>
            </div>
          </div>
          <button onClick={confirm} disabled={!selected.length} className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-semibold text-body-lg font-body-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span> Confirm Handover ({selected.length} Order{selected.length === 1 ? '' : 's'})
          </button>
        </div>
      </aside>
    </>
  );
}
