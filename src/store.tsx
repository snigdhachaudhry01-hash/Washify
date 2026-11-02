import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import * as L from './logic';

export type Mode = 'desktop' | 'ops' | 'cart';
interface Toast { id: number; msg: string; tone: 'success' | 'error' | 'info' }

const USERS: Record<L.Role, { name: string; title: string; initials: string }> = {
  owner: { name: 'Vikas Nair', title: 'Owner / Admin', initials: 'VN' },
  staff: { name: 'Devon Vance', title: 'Shift Supervisor', initials: 'DV' },
};

function useStoreValue() {
  const [state, setState] = useState(L.seedState);
  const ref = useRef(state);
  const [role, setRole] = useState<L.Role>('owner');
  const [selectedCustomerId, selectCustomer] = useState('CUST-0419');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchHandoff, setSearchHandoff] = useState(''); // one-shot search text handed to the next page (top-bar search, "View Orders")
  const user = USERS[role];

  const commit = (next: L.State) => {
    ref.current = next;
    setState(next);
  };
  const toast = (msg: string, tone: Toast['tone'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, msg, tone }]); // keep at most 3 on screen
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };
  /** Run a transition; on a validation error show it and return null instead of crashing. */
  const attempt = <T,>(fn: () => T): T | null => {
    try {
      return fn();
    } catch (e) {
      toast((e as Error).message, 'error');
      return null;
    }
  };

  const act = {
    recordIntake: (input: Omit<L.IntakeInput, 'by'>) =>
      attempt(() => {
        const r = L.recordIntake(ref.current, { ...input, by: user.name });
        commit(r.state);
        toast(`Order #${r.order.id} created · ${L.kg(r.order.kg)} KG deducted from ledger`);
        return r.order;
      }),
    markReady: (ids: string[]) => {
      commit(L.markReady(ref.current, ids));
      toast(`${ids.length === 1 ? `#${ids[0]}` : `${ids.length} orders`} marked ready for delivery`);
    },
    pushToCart: (ids: string[]) => {
      const r = L.pushToCart(ref.current, ids);
      if (!r.moved.length) return toast('No ready orders in that range', 'error');
      commit(r.state);
      const load = L.round2(r.moved.reduce((a, o) => a + o.kg, 0));
      toast(`${r.moved.length} order${r.moved.length > 1 ? 's' : ''} pushed to Cart ${L.pad(r.cart)} · ${L.kg(load, 1)} KG load`);
    },
    handover: (ids: string[]) => {
      const r = L.handover(ref.current, ids, user.name);
      if (!r.done.length) return toast('Only ready or in-cart orders can be handed over', 'error');
      commit(r.state);
      toast(`Handover verified · ${r.done.length} bundle${r.done.length > 1 ? 's' : ''} logged by ${user.name}`);
    },
    adjustBalance: (customerId: string, deltaKg: number, reason: string) =>
      attempt(() => {
        if (role !== 'owner') throw new Error('Only the owner can post audited adjustments');
        commit(L.adjustBalance(ref.current, customerId, deltaKg, reason, user.name));
        toast(`Adjustment of ${deltaKg > 0 ? '+' : ''}${L.kg(deltaKg)} KG posted to ledger`);
        return true;
      }),
    renewPackage: (customerId: string) =>
      attempt(() => {
        commit(L.renewPackage(ref.current, customerId, user.name));
        toast('Package renewed · quota credited to ledger');
        return true;
      }),
    addPlan: (p: { name: string; quotaKg: number; ratePerKg: number }) =>
      attempt(() => {
        commit(L.addPlan(ref.current, p));
        toast(`Plan published · ${L.inr(p.quotaKg * p.ratePerKg)} per student`);
        return true;
      }),
    updatePlan: (id: string, quotaKg: number, ratePerKg: number) =>
      attempt(() => {
        commit(L.updatePlan(ref.current, id, quotaKg, ratePerKg));
        toast('Package rates updated');
        return true;
      }),
    addCustomer: (c: Parameters<typeof L.addCustomer>[1]) =>
      attempt(() => {
        const r = L.addCustomer(ref.current, c);
        commit(r.state);
        selectCustomer(r.customer.id);
        toast(`${r.customer.name} registered as ${r.customer.id}`);
        return r.customer;
      }),
  };

  const stats = useMemo(() => L.computeStats(state.orders), [state.orders]);
  const customer = (id: string) => state.customers.find((c) => c.id === id)!;
  const plan = (id: string) => state.plans.find((p) => p.id === id)!;
  /** Honest placeholder for actions that need the backend/hardware. */
  const notYet = (what: string) => toast(`${what} will work once the backend is connected`, 'info');

  return { ...state, stats, role, setRole, user, selectedCustomerId, selectCustomer, toasts, toast, act, customer, plan, notYet, searchHandoff, setSearchHandoff };
}

type Store = ReturnType<typeof useStoreValue>;
const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  return <Ctx.Provider value={useStoreValue()}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore outside StoreProvider');
  return s;
}
