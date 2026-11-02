import { useStore } from '../../store';
import * as L from '../../logic';
import { go } from '../../ui';
import { CartHeader, CartQueueCard, kindOf } from './shared';

/** Stitch "Cart Operations Dashboard" (hostel cart PWA). */
export default function CartDashboard() {
  const s = useStore();
  const { stats } = s;
  const low = s.customers.filter((c) => L.balanceTone(c.balanceKg) === 'low');
  const sorted = [...s.orders].sort(L.newestFirst);
  // One of each state, like the Stitch activity list.
  const queue = (['washing', 'ready', 'carried', 'delivered'] as const).map((k) => sorted.find((o) => kindOf(o) === k)).filter((o): o is L.Order => !!o);

  return (
    <>
      <CartHeader />
      <div className="px-4 pb-2 bg-surface-container-lowest">
        <div className="flex items-center justify-between py-1.5 border-b border-outline-variant">
          <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant">
            <span className="material-symbols-outlined text-sm text-secondary">badge</span>
            <span className="text-label-meta font-label-meta font-semibold text-on-surface">
              {s.user.name} ({s.role === 'owner' ? 'Owner' : 'Staff'})
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 pb-1 text-on-surface-variant">
          <div className="flex items-center gap-1 text-label-meta font-label-meta">
            <span className="material-symbols-outlined text-sm text-secondary">schedule</span>
            <span>Morning Slot (7:30 - 10:00 AM)</span>
          </div>
          <div className="text-label-meta font-label-meta font-semibold text-secondary">{L.nowTime()} IST</div>
        </div>
      </div>
      <main className="px-4 pt-3 pb-24 space-y-4">
        <section className="grid grid-cols-2 gap-2.5">
          <button onClick={() => go('cart', 'intake')} className="flex items-center justify-center gap-1.5 h-12 px-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-semibold shadow-sm active:scale-95 transition-all duration-150" type="button">
            <span className="material-symbols-outlined text-lg">add</span>
            <span className="text-sm whitespace-nowrap">Quick Intake</span>
          </button>
          <button onClick={() => go('cart', 'delivery')} className="relative flex items-center justify-center gap-1.5 h-12 px-2 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant rounded-xl font-semibold shadow-sm active:scale-95 transition-all duration-150" type="button">
            <span className="material-symbols-outlined text-primary text-lg flex-shrink-0">check_circle</span>
            <span className="text-sm whitespace-nowrap">Deliveries</span>
            <span className="px-1.5 py-0.5 text-label-meta font-label-meta bg-secondary-container text-on-secondary-fixed font-bold rounded-full whitespace-nowrap flex-shrink-0">{stats.ready.n + stats.inCart.n}</span>
          </button>
        </section>

        <section aria-label="Operational Metrics">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-headline-sm font-headline-sm text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-lg">analytics</span> Shift Tally
            </h2>
            <span className="text-label-meta font-label-meta text-on-surface-variant">Live</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="text-label-badge font-label-badge font-semibold">Received Today</span>
                <span className="material-symbols-outlined text-secondary text-base">inbox</span>
              </div>
              <div className="mt-2">
                <div className="text-headline-md font-headline-md text-on-surface font-bold">
                  {stats.intake.n} <span className="text-body-sm font-body-sm text-secondary font-normal">Orders</span>
                </div>
                <div className="flex items-baseline gap-1 mt-0.5 bg-surface-container-low px-2 py-0.5 rounded-lg w-fit">
                  <span className="text-label-numeric font-label-numeric text-primary font-bold">{L.kg(stats.intake.kg, 1)}</span>
                  <span className="text-label-meta font-label-meta uppercase font-bold text-secondary">KG</span>
                </div>
              </div>
            </div>
            <button onClick={() => go('cart', 'delivery')} className="text-left bg-surface-container-lowest p-3 rounded-xl border-2 border-primary shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-2 -bottom-2 text-primary opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-7xl">fact_check</span>
              </div>
              <div className="flex items-center justify-between w-full text-primary font-semibold">
                <span className="text-label-badge font-label-badge flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Ready for Cart
                </span>
                <span className="material-symbols-outlined text-primary text-base">shopping_cart_checkout</span>
              </div>
              <div className="mt-2">
                <div className="text-headline-md font-headline-md text-primary font-bold">
                  {stats.ready.n} <span className="text-body-sm font-body-sm text-on-surface-variant font-normal">Orders</span>
                </div>
                <div className="flex items-baseline gap-1 mt-0.5 bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-lg w-fit">
                  <span className="text-label-numeric font-label-numeric font-bold">{L.kg(stats.ready.kg, 1)}</span>
                  <span className="text-label-meta font-label-meta uppercase font-bold">KG</span>
                </div>
              </div>
            </button>
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="text-label-badge font-label-badge font-semibold">Carried Forward</span>
                <span className="material-symbols-outlined text-secondary text-base">history</span>
              </div>
              <div className="mt-2">
                <div className="text-headline-md font-headline-md text-on-surface font-bold">
                  {stats.carried.n} <span className="text-body-sm font-body-sm text-secondary font-normal">Orders</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <div className="flex items-baseline gap-1 bg-surface-container-low px-2 py-0.5 rounded-lg w-fit">
                    <span className="text-label-numeric font-label-numeric text-on-surface font-bold">{L.kg(stats.carried.kg, 1)}</span>
                    <span className="text-label-meta font-label-meta uppercase font-bold text-secondary">KG</span>
                  </div>
                  <span className="text-label-meta font-label-meta bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">up to 2d older</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="text-label-badge font-label-badge font-semibold">Delivered Today</span>
                <span className="material-symbols-outlined text-secondary text-base">task_alt</span>
              </div>
              <div className="mt-2">
                <div className="text-headline-md font-headline-md text-on-surface font-bold">
                  {stats.delivered.n} <span className="text-body-sm font-body-sm text-secondary font-normal">Orders</span>
                </div>
                <div className="flex items-baseline gap-1 mt-0.5 bg-surface-container-low px-2 py-0.5 rounded-lg w-fit">
                  <span className="text-label-numeric font-label-numeric text-secondary font-bold">{L.kg(stats.delivered.kg, 1)}</span>
                  <span className="text-label-meta font-label-meta uppercase font-bold text-secondary">KG</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {low.length > 0 && (
          <section className="bg-error-container border border-outline-variant rounded-xl p-3 flex items-start gap-2.5 shadow-sm">
            <span className="material-symbols-outlined text-on-error-container text-xl mt-0.5 flex-shrink-0">warning</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-label-badge font-label-badge font-bold text-on-error-container">Low Package Alert</h3>
                <span className="text-label-meta font-label-meta text-on-error-container font-semibold uppercase">Action Req</span>
              </div>
              <p className="text-body-sm font-body-sm text-on-error-container mt-0.5 leading-snug">
                {low.length} resident{low.length > 1 ? 's have' : ' has'} &lt; {L.kg(L.LOW_KG, 1)} kg remaining ({low.map((c) => L.shortName(c.name)).join(', ')}). Prompt renewal on delivery.
              </p>
              <div className="mt-2 flex items-center justify-end">
                <button
                  onClick={() => {
                    s.selectCustomer(low[0].id);
                    go('cart', 'customers');
                  }}
                  className="text-label-badge font-label-badge text-on-error-container underline font-bold flex items-center gap-0.5 active:opacity-75"
                  type="button"
                >
                  <span>Open First Ledger</span> <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
        )}

        <section aria-label="Cart Queue">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base">conveyor_belt</span>
              <h2 className="text-headline-sm font-headline-sm text-on-surface">Cart Queue &amp; Activity</h2>
            </div>
            <button onClick={() => go('cart', 'orders')} className="text-label-meta font-label-meta bg-surface-container px-2 py-0.5 rounded-full text-primary font-semibold">
              View all {s.orders.length}
            </button>
          </div>
          <div className="space-y-2.5">
            {queue.map((o) => (
              <CartQueueCard key={o.id} o={o} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
