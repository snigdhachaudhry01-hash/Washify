import { useEffect, useState, type ReactNode } from 'react';
import { useStore, type Mode } from './store';
import * as L from './logic';

// ---------- hash routing: #/desktop/dashboard, #/ops/intake, #/cart/delivery ----------
export const PAGES: Record<Mode, string[]> = {
  desktop: ['dashboard', 'intake', 'delivery', 'accounts', 'packages', 'reports'],
  ops: ['home', 'intake', 'dispatch', 'packages', 'analytics'],
  cart: ['dashboard', 'intake', 'delivery', 'orders', 'customers'],
};
export const href = (mode: Mode, page: string) => `#/${mode}/${page}`;
export const go = (mode: Mode, page: string) => {
  window.location.hash = href(mode, page);
};

function parse(hash: string): [Mode, string] {
  const [, mode, page] = hash.replace(/^#/, '').split('/') as [string, Mode, string];
  if (mode in PAGES && PAGES[mode].includes(page)) return [mode, page];
  return window.innerWidth < 768 ? ['ops', 'home'] : ['desktop', 'dashboard'];
}

export function useRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash));
  useEffect(() => {
    const onHash = () => {
      setRoute(parse(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

// ---------- small shared pieces ----------
export function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function Toaster() {
  const { toasts } = useStore();
  const icon = { success: 'check_circle', error: 'error', info: 'info' } as const;
  const color = { success: 'bg-primary/10 text-primary', error: 'bg-error-container text-error', info: 'bg-surface-container text-secondary' } as const;
  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[70] w-[90%] max-w-sm space-y-2 pointer-events-none" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="bg-surface-container-lowest border border-primary/40 rounded-xl p-3 shadow-xl flex items-center gap-3 pointer-events-auto">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${color[t.tone]}`}>
            <span className="material-symbols-outlined text-[20px]">{icon[t.tone]}</span>
          </div>
          <p className="text-body-sm font-body-sm font-semibold text-on-surface flex-1 min-w-0">{t.msg}</p>
        </div>
      ))}
    </div>
  );
}

export function Modal({ title, subtitle, onClose, children }: { title: string; subtitle?: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-outline-variant flex items-start justify-between gap-3">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
            {subtitle && <p className="text-body-sm text-secondary mt-0.5">{subtitle}</p>}
          </div>
          <button aria-label="Close" className="p-1 rounded-lg text-secondary hover:bg-surface-container" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export const fieldCls = 'w-full h-11 px-3 bg-surface-container-low border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary';

/** Edit quota/rate of an existing plan. */
export function EditPlanModal({ planId, onClose }: { planId: string; onClose: () => void }) {
  const { plan, act } = useStore();
  const p = plan(planId);
  const [quota, setQuota] = useState(String(p.quotaKg));
  const [rate, setRate] = useState(String(p.ratePerKg));
  const total = (parseFloat(quota) || 0) * (parseFloat(rate) || 0);
  return (
    <Modal title={`Edit ${p.name}`} subtitle={`${p.students} students on this plan`} onClose={onClose}>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (act.updatePlan(p.id, parseFloat(quota), parseFloat(rate))) onClose();
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <label className="text-label-badge text-secondary space-y-1">
            <span>Total Quota (KG)</span>
            <input className={fieldCls} type="number" step="0.5" value={quota} onChange={(e) => setQuota(e.target.value)} />
          </label>
          <label className="text-label-badge text-secondary space-y-1">
            <span>Rate per KG (₹)</span>
            <input className={fieldCls} type="number" step="1" value={rate} onChange={(e) => setRate(e.target.value)} />
          </label>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low text-body-sm">
          <span className="text-secondary">New total price</span>
          <span className="font-bold text-primary text-headline-sm">{L.inr(total)}</span>
        </div>
        <button className="w-full h-11 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary-container">Save Rates</button>
      </form>
    </Modal>
  );
}

// ---------- customer search used by every intake screen ----------
export function useCustomerSearch(onPick: (id: string) => void) {
  const { customers, customer, selectedCustomerId } = useStore();
  const [query, setQuery] = useState<string | null>(null); // null = show the selected customer
  const q = (query ?? '').trim().toLowerCase();
  const matches = q
    ? customers.filter((c) => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.phone.replace(/\s/g, '').includes(q.replace(/\s/g, ''))).slice(0, 6)
    : [];
  return {
    inputProps: {
      value: query ?? `${customer(selectedCustomerId).name} (${selectedCustomerId})`,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => e.target.select(),
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && matches[0]) {
          onPick(matches[0].id);
          setQuery(null);
        }
        if (e.key === 'Escape') setQuery(null);
      },
      'aria-label': 'Search customer by name, ID or phone',
    },
    clear: () => setQuery(''),
    results:
      query !== null && q ? (
        <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg overflow-hidden">
          {matches.length === 0 && <p className="px-3 py-2.5 text-body-sm text-secondary">No customer matches “{query}”</p>}
          {matches.map((c) => (
            <button
              key={c.id}
              type="button"
              className="w-full px-3 py-2 text-left flex items-center justify-between gap-2 hover:bg-surface-container-low"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onPick(c.id);
                setQuery(null);
              }}
            >
              <span>
                <span className="block text-body-sm font-semibold text-on-surface">{c.name}</span>
                <span className="block text-label-meta text-secondary">
                  {c.id} · {L.yearLabel(c, true)}
                </span>
              </span>
              <span className={`text-label-meta font-semibold ${L.balanceTone(c.balanceKg) === 'ok' ? 'text-primary' : 'text-error'}`}>{L.kg(c.balanceKg)} KG</span>
            </button>
          ))}
        </div>
      ) : null,
  };
}

// ---------- intake form state shared by the five intake screens ----------
export const SERVICE_OPTIONS = ['Wash & Fold', 'Steam Press', 'Stain Treatment', 'Fragrance Free'];

export function useIntakeForm() {
  const s = useStore();
  const [weight, setWeight] = useState('4.50');
  const [bags, setBags] = useState(1);
  const [express, setExpress] = useState(false);
  const [services, setServices] = useState<string[]>(['Wash & Fold']);
  const [hold, setHold] = useState(false);
  const [note, setNote] = useState('');
  const c = s.customer(s.selectedCustomerId);
  const plan = s.plan(c.planId);
  const w = parseFloat(weight);
  const valid = w > 0 && w <= L.MAX_INTAKE_KG;
  const preview = L.intakePreview(c.balanceKg, valid ? w : 0, plan.ratePerKg);
  const nextSeq = Math.max(0, ...s.orders.filter((o) => o.day === L.TODAY).map((o) => o.seq)) + 1;
  const search = useCustomerSearch(s.selectCustomer);

  return {
    c,
    plan,
    search,
    weight,
    setWeight: (v: string) => !hold && setWeight(v),
    weightValid: valid,
    hold,
    toggleHold: () => setHold((h) => !h),
    zero: () => !hold && setWeight('0'),
    bags,
    incBags: () => setBags((b) => Math.min(20, b + 1)),
    decBags: () => setBags((b) => Math.max(1, b - 1)),
    express,
    setExpress,
    services,
    toggleService: (name: string) => setServices((list) => (list.includes(name) ? list.filter((x) => x !== name) : [...list, name])),
    note,
    setNote,
    preview,
    nextId: L.orderId(nextSeq, L.TODAY),
    submit: () => {
      if (!valid) return s.toast(`Enter a weight between 0.01 and ${L.MAX_INTAKE_KG} KG`, 'error');
      if (s.act.recordIntake({ customerId: c.id, weightKg: w, bags, express, services, note })) {
        setHold(false);
        setNote('');
        setBags(1);
      }
    },
  };
}
export type IntakeForm = ReturnType<typeof useIntakeForm>;

/** Status line + colour for a ledger preview, shared wording across screens. */
export function previewNote(p: ReturnType<typeof L.intakePreview>, ratePerKg: number) {
  if (p.tone === 'over') return { text: `Excess ${L.kg(p.excessKg)} KG billable at ₹${ratePerKg}/KG (${L.inr(p.excessCharge)})`, cls: 'text-error' };
  if (p.tone === 'low') return { text: `Low balance after intake (< ${L.LOW_KG} KG)`, cls: 'text-[#B06000]' };
  return { text: 'Within standard allowance', cls: 'text-primary' };
}

// ---------- bulk order range dispatch (desktop delivery, staff portal, staff dispatch) ----------
export const CART_ROUTES = ['Transit North', 'Transit South', 'Transit East'];
export const CART_CARRIERS = ['Rajesh K.', 'Amit S.', 'Sunil K.'];
export const seqLabel = (o: L.Order) => `#${L.pad(o.seq)} (#${o.id})`;

export function useRangeDispatch() {
  const s = useStore();
  const pools = L.readyByDay(s.orders);
  const [pickedDay, setPickedDay] = useState<number | null>(null);
  const [pickedFrom, setFrom] = useState<number | null>(null);
  const [pickedTo, setTo] = useState<number | null>(null);
  const day = pickedDay !== null && pools.some(([d]) => d === pickedDay) ? pickedDay : (pools.at(-1)?.[0] ?? L.TODAY);
  const pool = pools.find(([d]) => d === day)?.[1] ?? [];
  const seqs = pool.map((o) => o.seq);
  const from = pickedFrom !== null && seqs.includes(pickedFrom) ? pickedFrom : seqs[0];
  const to = pickedTo !== null && seqs.includes(pickedTo) && pickedTo >= from ? pickedTo : seqs.at(-1);
  const selected = from === undefined || to === undefined ? [] : pool.filter((o) => o.seq >= from && o.seq <= to);
  return {
    pools,
    totalPending: pools.reduce((a, [, l]) => a + l.length, 0),
    day,
    setDay: (d: number) => {
      setPickedDay(d);
      setFrom(null);
      setTo(null);
    },
    pool,
    from,
    to,
    setFrom: (v: string) => setFrom(Number(v)),
    setTo: (v: string) => setTo(Number(v)),
    selected,
    load: L.round2(selected.reduce((a, o) => a + o.kg, 0)),
    push: () => s.act.pushToCart(selected.map((o) => o.id)),
  };
}

// ---------- quick package builder (3 screens) ----------
export function usePlanBuilder() {
  const { act } = useStore();
  const [name, setName] = useState('');
  const [quota, setQuota] = useState('50');
  const [rate, setRate] = useState('38');
  const q = parseFloat(quota) || 0;
  const r = parseFloat(rate) || 0;
  return {
    name,
    setName,
    quota,
    setQuota,
    rate,
    setRate,
    q,
    r,
    price: Math.round(q * r),
    publish: () => {
      if (act.addPlan({ name, quotaKg: q, ratePerKg: r })) setName('');
    },
  };
}

/** Switch between the three experiences and the signed-in role. `inline` = desktop top-bar button, else floating. */
export function ViewSwitcher({ mode, inline = false }: { mode: Mode; inline?: boolean }) {
  const { role, setRole } = useStore();
  const [open, setOpen] = useState(false);
  const views: [Mode, string, string, string][] = [
    ['desktop', 'Desktop Portal', 'desktop_windows', 'dashboard'],
    ['ops', 'Ops Mobile App', 'smartphone', 'home'],
    ['cart', 'Hostel Cart App', 'shopping_cart', 'dashboard'],
  ];
  return (
    <div className={inline ? 'relative' : 'fixed z-[55] right-3 bottom-20 sm:right-6 sm:bottom-6'}>
      {open && (
        <div className={`absolute right-0 w-60 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl p-2 space-y-1 z-50 ${inline ? 'top-12' : 'bottom-14'}`}>
          <p className="px-2 pt-1 text-label-meta font-label-meta text-secondary uppercase tracking-wider">Switch view</p>
          {views.map(([m, label, icon, page]) => (
            <a
              key={m}
              href={href(m, page)}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-2 py-2 rounded-lg text-body-sm font-semibold ${m === mode ? 'bg-surface-container text-primary' : 'text-on-surface hover:bg-surface-container-low'}`}
            >
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              {label}
            </a>
          ))}
          <p className="px-2 pt-2 text-label-meta font-label-meta text-secondary uppercase tracking-wider">Signed in as</p>
          <div className="grid grid-cols-2 gap-1 p-1 bg-surface-container-low rounded-lg">
            {(['owner', 'staff'] as const).map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`py-1.5 rounded-md text-label-badge font-semibold capitalize ${role === r ? 'bg-primary text-on-primary' : 'text-secondary'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
      {inline ? (
        <button onClick={() => setOpen((o) => !o)} aria-label="Switch view or role" title="Switch view / role" className="p-2 rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-all duration-150 active:scale-95">
          <span className="material-symbols-outlined text-[22px]">devices</span>
        </button>
      ) : (
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Switch view or role"
          className="h-11 w-11 sm:w-auto sm:pl-3 sm:pr-4 justify-center rounded-full bg-inverse-surface/90 text-inverse-on-surface shadow-xl flex items-center gap-2 text-label-badge font-semibold active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">devices</span>
          <span className="hidden sm:inline">{views.find((v) => v[0] === mode)![1]}</span>
        </button>
      )}
    </div>
  );
}
