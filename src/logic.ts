// Pure data + business rules (no React). Mock data stands in for the backend until it exists.

export const TODAY = 24; // service day: 24 Oct 2026
export const LOW_KG = 5; // PRD low-balance threshold
export const MAX_INTAKE_KG = 50; // sanity cap for a single manual entry

export type Role = 'owner' | 'staff';
export type OrderStatus = 'washing' | 'ready' | 'in_cart' | 'delivered';

export interface Plan {
  id: string;
  name: string;
  tag: string;
  desc: string;
  quotaKg: number;
  ratePerKg: number;
  period: 'mo' | 'semester';
  students: number;
  popular?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  year: string; // '1st' | '2nd' | '3rd' | '4th' | 'PG'
  dept: string;
  phone: string;
  planId: string;
  balanceKg: number;
  renewal: string;
}

export interface LedgerEntry {
  id: string;
  customerId: string;
  kind: 'intake' | 'reset' | 'adjust' | 'renew';
  title: string;
  ref: string;
  at: string;
  by: string;
  deltaKg: number;
  balanceAfter: number;
  note?: string;
}

export interface Order {
  id: string; // e.g. 012410 = seq 01, day 24, month 10
  seq: number;
  day: number;
  time: string;
  customerId: string;
  kg: number;
  bags: string;
  service: string;
  express: boolean;
  status: OrderStatus;
  cart?: number;
  deliveredAt?: string;
  deliveredBy?: string;
  note?: string;
}

export interface State {
  plans: Plan[];
  customers: Customer[];
  ledger: LedgerEntry[];
  orders: Order[];
  nextCart: number;
  revCount: number;
}

// ---------- formatting ----------
export const pad = (n: number) => String(n).padStart(2, '0');
export const orderId = (seq: number, day: number) => `${pad(seq)}${pad(day)}10`;
export const kg = (n: number, d = 2) => n.toFixed(d);
export const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
export const shortName = (name: string) => {
  const [first, last] = name.split(' ');
  return last ? `${first} ${last[0]}.` : first;
};
export const yearLabel = (c: Customer, short = false) =>
  c.year === 'PG' ? `Postgrad ${c.dept}` : `${c.year} ${short ? 'Yr' : 'Year'} ${c.dept}`;
export const dayLabel = (day: number) => (day === TODAY ? 'Today' : day === TODAY - 1 ? 'Yesterday' : `${day} Oct`);
export const telHref = (phone: string) => 'tel:' + phone.replace(/[^+\d]/g, '');

export function nowTime(d = new Date()) {
  let h = d.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${pad(h)}:${pad(d.getMinutes())} ${ampm}`;
}

// ---------- derived values ----------
export type Tone = 'ok' | 'low' | 'over';

/** Ledger impact of deducting `weight` from `balance`. Excess beyond the balance is billable at the plan rate. */
export function intakePreview(balance: number, weight: number, ratePerKg: number) {
  const w = Number.isFinite(weight) && weight > 0 ? weight : 0;
  const after = round2(balance - w);
  const excessKg = round2(Math.max(0, w - Math.max(balance, 0)));
  const tone: Tone = after < 0 ? 'over' : after < LOW_KG ? 'low' : 'ok';
  return { weight: w, after, excessKg, excessCharge: round2(excessKg * ratePerKg), tone };
}

export function balanceTone(balance: number): Tone {
  return balance < 0 ? 'over' : balance < LOW_KG ? 'low' : 'ok';
}

export const isCarried = (o: Order) => (o.status === 'ready' || o.status === 'washing') && o.day < TODAY;

export function computeStats(orders: Order[]) {
  const sum = (list: Order[]) => ({ n: list.length, kg: round2(list.reduce((a, o) => a + o.kg, 0)) });
  const today = orders.filter((o) => o.day === TODAY);
  return {
    intake: sum(today),
    express: today.filter((o) => o.express).length,
    ready: sum(orders.filter((o) => o.status === 'ready')),
    washing: sum(orders.filter((o) => o.status === 'washing')),
    inCart: sum(orders.filter((o) => o.status === 'in_cart')),
    carried: sum(orders.filter(isCarried)),
    delivered: sum(orders.filter((o) => o.status === 'delivered' && o.deliveredAt)),
  };
}
export type Stats = ReturnType<typeof computeStats>;

/** Ready (unallocated) orders per intake day, ascending seq — the pool the range dispatcher pulls from. */
export function readyByDay(orders: Order[]) {
  const map = new Map<number, Order[]>();
  for (const o of orders) if (o.status === 'ready') map.set(o.day, [...(map.get(o.day) ?? []), o]);
  for (const list of map.values()) list.sort((a, b) => a.seq - b.seq);
  return [...map.entries()].sort((a, b) => a[0] - b[0]);
}

export const newestFirst = (a: Order, b: Order) => b.day - a.day || b.seq - a.seq;

// ---------- transitions (pure: return a new State) ----------
export interface IntakeInput {
  customerId: string;
  weightKg: number;
  bags: number;
  express: boolean;
  services: string[];
  by: string;
  note?: string;
}

export function recordIntake(s: State, input: IntakeInput): { state: State; order: Order } {
  const c = s.customers.find((x) => x.id === input.customerId);
  if (!c) throw new Error('Unknown customer');
  if (!(input.weightKg > 0 && input.weightKg <= MAX_INTAKE_KG)) throw new Error(`Weight must be between 0 and ${MAX_INTAKE_KG} KG`);
  const weight = round2(input.weightKg);
  const seq = Math.max(0, ...s.orders.filter((o) => o.day === TODAY).map((o) => o.seq)) + 1;
  const order: Order = {
    id: orderId(seq, TODAY),
    seq,
    day: TODAY,
    time: nowTime(),
    customerId: c.id,
    kg: weight,
    bags: `${input.bags} ${input.bags === 1 ? 'Bag' : 'Bags'}`,
    service: input.services.length ? input.services.join(' + ') : 'Wash & Fold',
    express: input.express,
    status: 'washing',
    ...(input.note?.trim() ? { note: input.note.trim() } : {}),
  };
  const balanceAfter = round2(c.balanceKg - weight);
  // Order + ledger debit are written together (PRD: atomic order creation & deduction).
  const entry: LedgerEntry = {
    id: `L-${order.id}`,
    customerId: c.id,
    kind: 'intake',
    title: `${order.service.split(' + ')[0]} Intake`,
    ref: `#${order.id}`,
    at: `Oct ${TODAY}, ${order.time}`,
    by: input.by,
    deltaKg: -weight,
    balanceAfter,
  };
  return {
    order,
    state: {
      ...s,
      orders: [...s.orders, order],
      ledger: [...s.ledger, entry],
      customers: s.customers.map((x) => (x.id === c.id ? { ...x, balanceKg: balanceAfter } : x)),
    },
  };
}

export function markReady(s: State, ids: string[]): State {
  return { ...s, orders: s.orders.map((o) => (ids.includes(o.id) && o.status === 'washing' ? { ...o, status: 'ready' } : o)) };
}

/** Load ready orders onto the next cart run. */
export function pushToCart(s: State, ids: string[]): { state: State; cart: number; moved: Order[] } {
  const cart = s.nextCart;
  const moved = s.orders.filter((o) => ids.includes(o.id) && o.status === 'ready');
  return {
    cart,
    moved,
    state: {
      ...s,
      nextCart: (cart % 3) + 1,
      orders: s.orders.map((o) => (moved.includes(o) ? { ...o, status: 'in_cart', cart } : o)),
    },
  };
}

/** Verified handover: only ready / in-cart orders can be delivered. */
export function handover(s: State, ids: string[], by: string): { state: State; done: Order[] } {
  const at = nowTime();
  const done = s.orders.filter((o) => ids.includes(o.id) && (o.status === 'ready' || o.status === 'in_cart'));
  return {
    done,
    state: { ...s, orders: s.orders.map((o) => (done.includes(o) ? { ...o, status: 'delivered', deliveredAt: at, deliveredBy: by } : o)) },
  };
}

/** Audited manual adjustment (owner only, reason mandatory). */
export function adjustBalance(s: State, customerId: string, deltaKg: number, reason: string, by: string): State {
  if (!Number.isFinite(deltaKg) || deltaKg === 0) throw new Error('Enter a non-zero adjustment');
  if (!reason.trim()) throw new Error('A reason is required for every adjustment');
  const c = s.customers.find((x) => x.id === customerId);
  if (!c) throw new Error('Unknown customer');
  const revCount = s.revCount + 1;
  const balanceAfter = round2(c.balanceKg + deltaKg);
  return {
    ...s,
    revCount,
    customers: s.customers.map((x) => (x.id === customerId ? { ...x, balanceKg: balanceAfter } : x)),
    ledger: [
      ...s.ledger,
      {
        id: `REV-${pad(revCount).padStart(3, '0')}`,
        customerId,
        kind: 'adjust',
        title: 'Audited Adjustment',
        ref: `REV-${pad(revCount).padStart(3, '0')}`,
        at: `Oct ${TODAY}, ${nowTime()}`,
        by,
        deltaKg: round2(deltaKg),
        balanceAfter,
        note: reason.trim(),
      },
    ],
  };
}

export function renewPackage(s: State, customerId: string, by: string): State {
  const c = s.customers.find((x) => x.id === customerId);
  const plan = c && s.plans.find((p) => p.id === c.planId);
  if (!c || !plan) throw new Error('Unknown customer or plan');
  const balanceAfter = round2(c.balanceKg + plan.quotaKg);
  return {
    ...s,
    customers: s.customers.map((x) => (x.id === customerId ? { ...x, balanceKg: balanceAfter } : x)),
    ledger: [
      ...s.ledger,
      {
        id: `RN-${customerId}-${s.ledger.length}`,
        customerId,
        kind: 'renew',
        title: 'Package Renewal',
        ref: plan.name,
        at: `Oct ${TODAY}, ${nowTime()}`,
        by,
        deltaKg: plan.quotaKg,
        balanceAfter,
      },
    ],
  };
}

export function validatePlan(quotaKg: number, ratePerKg: number) {
  if (!(quotaKg > 0 && quotaKg <= 500)) return 'Quota must be between 1 and 500 KG';
  if (!(ratePerKg > 0 && ratePerKg <= 1000)) return 'Rate must be between ₹1 and ₹1,000 per KG';
  return null;
}

export function addPlan(s: State, p: { name: string; quotaKg: number; ratePerKg: number }): State {
  const err = validatePlan(p.quotaKg, p.ratePerKg);
  if (err) throw new Error(err);
  const plan: Plan = {
    id: `plan-${s.plans.length + 1}`,
    name: p.name.trim() || `Custom ${p.quotaKg} KG`,
    tag: 'Custom',
    desc: 'Custom quota package',
    quotaKg: p.quotaKg,
    ratePerKg: p.ratePerKg,
    period: 'mo',
    students: 0,
  };
  return { ...s, plans: [...s.plans, plan] };
}

export function updatePlan(s: State, id: string, quotaKg: number, ratePerKg: number): State {
  const err = validatePlan(quotaKg, ratePerKg);
  if (err) throw new Error(err);
  return { ...s, plans: s.plans.map((p) => (p.id === id ? { ...p, quotaKg, ratePerKg } : p)) };
}

export function addCustomer(s: State, c: { name: string; phone: string; year: string; dept: string; planId: string }): { state: State; customer: Customer } {
  if (!c.name.trim()) throw new Error('Name is required');
  if (!/^\+?[\d\s-]{10,16}$/.test(c.phone.trim())) throw new Error('Enter a valid phone number');
  const plan = s.plans.find((p) => p.id === c.planId);
  if (!plan) throw new Error('Pick a plan');
  const used = new Set(s.customers.map((x) => x.id));
  let n = 1000 + s.customers.length;
  while (used.has(`CUST-${n}`)) n++;
  const customer: Customer = {
    id: `CUST-${n}`,
    name: c.name.trim(),
    year: c.year,
    dept: c.dept.trim() || 'Undeclared',
    phone: c.phone.trim(),
    planId: plan.id,
    balanceKg: plan.quotaKg,
    renewal: 'Nov 24, 2026',
  };
  return {
    customer,
    state: {
      ...s,
      customers: [...s.customers, customer],
      plans: s.plans.map((p) => (p.id === plan.id ? { ...p, students: p.students + 1 } : p)),
      ledger: [
        ...s.ledger,
        { id: `NEW-${customer.id}`, customerId: customer.id, kind: 'reset', title: 'Package Assigned', ref: plan.name, at: `Oct ${TODAY}, ${nowTime()}`, by: 'Registration', deltaKg: plan.quotaKg, balanceAfter: plan.quotaKg },
      ],
    },
  };
}

export function round2(n: number) {
  return Math.round(n * 100) / 100;
}

// ---------- seed (mirrors the names and figures in the Stitch screens) ----------
const PLANS: Plan[] = [
  { id: 'silver', name: 'Silver Basic', tag: 'Standard', desc: 'Standard undergrad monthly allowance', quotaKg: 25, ratePerKg: 45, period: 'mo', students: 218 },
  { id: 'gold', name: 'Gold Heavy', tag: 'Priority', desc: 'High-frequency wash & iron bundle', quotaKg: 40, ratePerKg: 40, period: 'mo', students: 496, popular: true },
  { id: 'semester', name: 'Semester Saver', tag: 'Bulk', desc: 'Bulk single-semester upfront quota', quotaKg: 75, ratePerKg: 36, period: 'semester', students: 128 },
];

const CUSTOMERS: [string, string, string, string, string, string, number][] = [
  ['CUST-0419', 'Aarav Patel', '2nd', 'Mechanical', '+91 94451 22334', 'silver', 18.2],
  ['CUST-1044', 'Neha Swaminathan', '1st', 'Biotech', '+91 98840 11224', 'gold', 22.4],
  ['CUST-0312', 'Karthik Menon', '4th', 'Civil Eng', '+91 98840 76219', 'silver', 1.2],
  ['CUST-0892', 'Rohan Verma', '3rd', 'Electronics', '+91 90031 55678', 'silver', -2.1],
  ['CUST-0561', 'Priya Sundaram', '2nd', 'Computer Sci', '+91 97890 33415', 'gold', 31.0],
  ['CUST-0842', 'Rohan Sharma', '3rd', 'B.Tech', '+91 98765 43210', 'semester', 67.5],
  ['CUST-0733', 'Ananya Deshmukh', '2nd', 'Computer Science', '+91 97112 44321', 'silver', 9.8],
  ['CUST-0655', 'Siddharth Rao', '1st', 'Mechanical', '+91 99001 23456', 'gold', 26.3],
  ['CUST-0554', 'Divya Sen', '2nd', 'Architecture', '+91 98450 66721', 'silver', 12.4],
  ['CUST-0127', 'Riya Sen', '1st', 'Biotechnology', '+91 96860 11872', 'semester', 41.2],
  ['CUST-0388', 'Kabir Mehta', '3rd', 'Chemical', '+91 93420 55190', 'silver', 3.6],
  ['CUST-0276', 'Sneha Nair', 'PG', 'Chemistry', '+91 94470 88213', 'gold', 17.9],
  ['CUST-0901', 'Tushar Kulkarni', '3rd', 'Chemical', '+91 98221 45009', 'silver', 14.1],
  ['CUST-0645', 'Ananya Verma', '4th', 'Electrical', '+91 95350 77814', 'gold', 4.2],
  ['CUST-0468', 'Deepak Menon', '2nd', 'Civil Engineering', '+91 90080 34561', 'semester', 52.0],
  ['CUST-0219', 'Priya Nair', '1st', 'Biotechnology', '+91 91370 22908', 'silver', 20.5],
];

const SERVICES = ['Wash & Fold', 'Wash & Iron', 'Steam Press', 'Woolens Dry Cleaning', 'Wash & Dry'];
const BAGS = ['2 Poly Bags', '1 Canvas Tote', '1 Garment Bag', '1 Canvas Bag', '3 Poly Bags'];

export function seedState(): State {
  const customers: Customer[] = CUSTOMERS.map(([id, name, year, dept, phone, planId, balanceKg]) => ({
    id, name, year, dept, phone, planId, balanceKg, renewal: 'Nov 01, 2026',
  }));

  let r = 11;
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const orders: Order[] = [];
  // [day, count, status] — gives 4 / 6 / 14 ready on 22/23/24 Oct, 28 delivered today, 42 intakes today.
  const batches: [number, number, OrderStatus][] = [
    [22, 10, 'delivered'], [22, 4, 'ready'],
    [23, 18, 'delivered'], [23, 6, 'ready'],
    [24, 10, 'in_cart'], [24, 14, 'ready'], [24, 18, 'washing'],
  ];
  const seqByDay: Record<number, number> = {};
  let cart = 1;
  for (const [day, count, status] of batches) {
    for (let i = 0; i < count; i++) {
      const seq = (seqByDay[day] = (seqByDay[day] ?? 0) + 1);
      const minutes = 7 * 60 + 30 + seq * 9;
      const c = customers[Math.floor(rnd() * customers.length)];
      const o: Order = {
        id: orderId(seq, day),
        seq,
        day,
        time: nowTime(new Date(2026, 9, day, Math.floor(minutes / 60), minutes % 60)),
        customerId: c.id,
        kg: Math.round((2 + rnd() * 4.5) * 20) / 20,
        bags: BAGS[Math.floor(rnd() * BAGS.length)],
        service: SERVICES[Math.floor(rnd() * SERVICES.length)],
        express: rnd() < 0.2,
        status,
      };
      if (status === 'in_cart') {
        o.cart = cart;
        cart = (cart % 3) + 1;
      }
      if (status === 'delivered') {
        const m = 8 * 60 + i * 7;
        o.deliveredAt = nowTime(new Date(2026, 9, TODAY, Math.floor(m / 60), m % 60));
        o.deliveredBy = 'Sunil K.';
      }
      orders.push(o);
    }
  }

  const ledger: LedgerEntry[] = [];
  for (const c of customers) {
    const plan = PLANS.find((p) => p.id === c.planId)!;
    ledger.push({ id: `RS-${c.id}`, customerId: c.id, kind: 'reset', title: 'Monthly Quota Reset', ref: 'Automatic', at: 'Oct 10, 10:30 AM', by: 'System Subscription Cycle', deltaKg: plan.quotaKg, balanceAfter: plan.quotaKg });
    const used = round2(plan.quotaKg - c.balanceKg);
    const parts = c.id === 'CUST-0419' ? [6.8] : used > 8 ? [round2(used * 0.55), round2(used - round2(used * 0.55))] : used > 0 ? [used] : [];
    let bal = plan.quotaKg;
    parts.forEach((p, i) => {
      bal = round2(bal - p);
      ledger.push({
        id: `SD-${c.id}-${i}`,
        customerId: c.id,
        kind: 'intake',
        title: i % 2 ? 'Wash & Iron Intake' : 'Wash & Fold Intake',
        ref: `#WSH-${8700 + ((c.id.charCodeAt(7) * 7 + i * 31) % 120)}`,
        at: i === parts.length - 1 ? 'Oct 18, 02:15 PM' : 'Oct 14, 09:20 AM',
        by: i === parts.length - 1 ? 'Station 04 Auditor' : 'Station 02 Auditor',
        deltaKg: -p,
        balanceAfter: bal,
      });
    });
  }

  return { plans: PLANS, customers, ledger, orders, nextCart: 1, revCount: 3 };
}
