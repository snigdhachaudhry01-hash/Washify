import { useEffect, useState } from 'react';
import { useStore } from '../../store';
import * as L from '../../logic';
import { CartHeader, CartQueueCard, kindOf } from './shared';

const FILTERS: [string, string][] = [
  ['all', 'All'],
  ['washing', 'In Laundry'],
  ['ready', 'Ready'],
  ['in_cart', 'In Cart'],
  ['carried', 'Carried Forward'],
  ['delivered', 'Delivered'],
];

/** Orders tab of the hostel-cart app (no dedicated Stitch screen; built from the Cart Queue card). */
export default function CartOrders() {
  const s = useStore();
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState(s.searchHandoff);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    if (s.searchHandoff) s.setSearchHandoff('');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const needle = q.trim().toLowerCase();
  const counts = Object.fromEntries(FILTERS.map(([f]) => [f, f === 'all' ? s.orders.length : s.orders.filter((o) => kindOf(o) === f).length]));
  const rows = s.orders
    .filter((o) => (filter === 'all' || kindOf(o) === filter) && (!needle || o.id.includes(needle) || s.customer(o.customerId).name.toLowerCase().includes(needle) || o.customerId.toLowerCase().includes(needle)))
    .sort(L.newestFirst);

  return (
    <>
      <CartHeader />
      <main className="px-4 pt-3 pb-24 space-y-3">
        <div>
          <h1 className="text-headline-md font-headline-md font-bold text-on-surface tracking-tight">Orders</h1>
          <p className="text-label-meta font-label-meta text-on-surface-variant">Every bundle across intake, laundry, cart and handover</p>
        </div>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">search</span>
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setLimit(12);
            }}
            aria-label="Search orders"
            className="w-full h-12 pl-11 pr-10 bg-surface-container-lowest rounded-xl border border-outline-variant/80 text-on-surface text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            placeholder="Order #, name or CUST ID..."
          />
          {q && (
            <button onClick={() => setQ('')} aria-label="Clear search" className="absolute right-2.5 w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:text-on-surface">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {FILTERS.map(([f, label]) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setLimit(12);
              }}
              className={`inline-flex items-center h-9 px-3.5 rounded-full text-label-badge font-label-badge shrink-0 active:scale-95 transition-all ${filter === f ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
            >
              {label} ({counts[f]})
            </button>
          ))}
        </div>
        <div className="space-y-2.5">
          {rows.length === 0 && <p className="text-body-sm text-secondary text-center py-6">No orders match.</p>}
          {rows.slice(0, limit).map((o) => (
            <CartQueueCard key={o.id} o={o} />
          ))}
          {rows.length > limit && (
            <button onClick={() => setLimit(limit + 12)} className="w-full h-11 rounded-lg border border-outline-variant text-primary text-label-badge font-semibold bg-surface-container-lowest">
              Show more ({rows.length - limit} remaining)
            </button>
          )}
        </div>
      </main>
    </>
  );
}
