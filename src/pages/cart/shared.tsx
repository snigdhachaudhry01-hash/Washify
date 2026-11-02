import { useStore } from '../../store';
import * as L from '../../logic';

/** Top bar used across the hostel-cart PWA screens. */
export function CartHeader({ right }: { right?: React.ReactNode }) {
  const { notYet } = useStore();
  return (
    <header className="sticky top-0 z-40 flex justify-between items-center px-4 h-14 bg-surface-container-lowest border-b border-outline-variant shadow-sm">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-2xl">local_laundry_service</span>
        <span className="text-headline-md font-headline-md font-bold text-primary tracking-tight">Washify</span>
      </div>
      <div className="flex items-center gap-2">
        {right}
        <button onClick={() => notYet('Notifications')} aria-label="Notifications" className="relative w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95" type="button">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
        </button>
      </div>
    </header>
  );
}

type Kind = 'washing' | 'ready' | 'in_cart' | 'carried' | 'delivered';
export const kindOf = (o: L.Order): Kind => (L.isCarried(o) ? 'carried' : o.status);

const STYLE: Record<Kind, { stripe: string; pill: string; icon: string; label: (o: L.Order) => string }> = {
  washing: { stripe: 'bg-[#D97706]', pill: 'bg-[#FEF3C7] text-[#D97706]', icon: 'sync', label: () => 'In Laundry' },
  ready: { stripe: 'bg-primary', pill: 'bg-primary-fixed text-on-primary-fixed', icon: 'check', label: () => 'Ready' },
  in_cart: { stripe: 'bg-amber-500', pill: 'bg-amber-100 text-amber-800', icon: 'local_shipping', label: (o) => `In Cart ${L.pad(o.cart ?? 1)}` },
  carried: { stripe: 'bg-secondary', pill: 'bg-secondary-container text-on-secondary-fixed', icon: 'schedule_send', label: () => 'Carried Forward' },
  delivered: { stripe: 'bg-outline', pill: 'bg-surface-container text-on-surface-variant', icon: 'check_circle', label: () => 'Delivered' },
};

/** Order row from the Stitch "Cart Queue & Activity" list. */
export function CartQueueCard({ o }: { o: L.Order }) {
  const s = useStore();
  const k = kindOf(o);
  const st = STYLE[k];
  return (
    <div className={`bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-sm relative overflow-hidden flex flex-col gap-2 ${k === 'delivered' ? 'opacity-90' : ''}`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${st.stripe}`}></div>
      <div className="pl-2 flex items-start justify-between gap-2">
        <div>
          <span className="text-label-meta font-label-meta text-secondary font-mono">
            #{o.id}
            {o.day !== L.TODAY && ` · ${o.day} Oct`}
          </span>
          <h4 className={`text-body-lg font-body-lg text-on-surface mt-0.5 ${k === 'delivered' ? 'font-medium' : 'font-semibold'}`}>{s.customer(o.customerId).name}</h4>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-label-badge font-label-badge font-semibold flex items-center gap-1 whitespace-nowrap ${st.pill}`}>
          <span className={`material-symbols-outlined text-xs ${k === 'delivered' ? 'text-primary' : ''}`}>{st.icon}</span> {st.label(o)}
        </span>
      </div>
      <div className="pl-2 pt-1 border-t border-outline-variant/50 flex items-center justify-between gap-2 text-body-sm font-body-sm">
        <span className="text-label-meta font-label-meta text-secondary font-mono truncate">
          {L.kg(o.kg)} KG • {o.service}
          {o.note && ` • “${o.note}”`}
        </span>
        {k === 'washing' && (
          <button onClick={() => s.act.markReady([o.id])} className="h-8 px-2.5 bg-surface-container text-on-surface rounded-lg text-label-badge font-label-badge font-semibold flex items-center gap-1 active:scale-95 shrink-0" type="button">
            <span className="material-symbols-outlined text-xs">done</span> Mark Ready
          </button>
        )}
        {(k === 'ready' || k === 'in_cart' || (k === 'carried' && o.status === 'ready')) && (
          <button onClick={() => s.act.handover([o.id])} className="h-8 px-2.5 bg-primary text-on-primary rounded-lg text-label-badge font-label-badge font-semibold flex items-center gap-1 active:scale-95 transition-transform shrink-0" type="button">
            <span className="material-symbols-outlined text-xs">done_all</span> Deliver
          </button>
        )}
        {k === 'delivered' && <span className="material-symbols-outlined text-base text-primary">verified</span>}
      </div>
    </div>
  );
}
