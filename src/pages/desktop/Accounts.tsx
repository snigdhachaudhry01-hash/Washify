import { useEffect, useState } from 'react';
import { useStore } from '../../store';
import * as L from '../../logic';
import { downloadCsv, EditPlanModal, fieldCls, go, Modal, usePlanBuilder } from '../../ui';

const PAGE = 5;
const YEARS = [
  ['1st', '1st Year Undergrad'],
  ['2nd', '2nd Year Undergrad'],
  ['3rd', '3rd Year Undergrad'],
  ['4th', '4th Year Senior'],
  ['PG', 'Postgraduate / Scholar'],
];
const selectCls = 'h-11 pl-3 pr-8 text-body-sm font-medium bg-surface-container-low text-on-surface border border-outline-variant rounded-lg focus:border-primary focus:ring-primary cursor-pointer appearance-none';

export default function Accounts() {
  const s = useStore();
  const b = usePlanBuilder();
  const [query, setQuery] = useState(s.searchHandoff);
  const [planF, setPlanF] = useState('all');
  const [toneF, setToneF] = useState('all');
  const [yearF, setYearF] = useState('all');
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);

  // Top-bar search lands here.
  useEffect(() => {
    if (s.searchHandoff) {
      setQuery(s.searchHandoff);
      setPage(0);
      s.setSearchHandoff('');
    }
  }, [s.searchHandoff]); // eslint-disable-line react-hooks/exhaustive-deps

  const q = query.trim().toLowerCase();
  const rows = s.customers.filter(
    (c) =>
      (!q || c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.phone.replace(/\s/g, '').includes(q.replace(/\s/g, ''))) &&
      (planF === 'all' || c.planId === planF) &&
      (toneF === 'all' || L.balanceTone(c.balanceKg) === toneF) &&
      (yearF === 'all' || c.year === yearF),
  );
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const p = Math.min(page, pages - 1);
  const shown = rows.slice(p * PAGE, p * PAGE + PAGE);
  const clearFilters = () => {
    setQuery('');
    setPlanF('all');
    setToneF('all');
    setYearF('all');
    setPage(0);
  };

  const c = s.customer(s.selectedCustomerId);
  const exportLedger = () =>
    downloadCsv(`ledger_${c.id}.csv`, [
      ['Entry', 'Reference', 'Date', 'By', 'Change (KG)', 'Balance After (KG)', 'Note'],
      ...s.ledger.filter((e) => e.customerId === c.id).map((e) => [e.title, e.ref, e.at, e.by, L.kg(e.deltaKg), L.kg(e.balanceAfter), e.note ?? '']),
    ]);

  return (
    <main className="flex flex-col bg-background p-margin">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-lg gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Customer Accounts &amp; Subscription Ledgers</h1>
          <p className="font-body-md text-body-md text-secondary mt-1">Manage monthly laundry quotas, track deduction histories, and recharge balances.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => go('desktop', 'packages')} className="flex items-center gap-1.5 px-3.5 h-10 rounded-lg bg-surface-container-high border border-outline-variant text-primary font-semibold text-body-md hover:bg-surface-container transition-all active:scale-95">
            <span className="material-symbols-outlined text-lg">inventory_2</span>
            <span>Manage Packages</span>
          </button>
          <button onClick={exportLedger} className="flex items-center gap-2 px-4 h-10 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-headline-sm text-body-md font-semibold hover:bg-surface-container-low active:scale-95 transition-all">
            <span className="material-symbols-outlined text-secondary">download</span>
            <span>Export Ledger (CSV)</span>
          </button>
          <button onClick={() => setRegistering(true)} className="flex items-center gap-2 px-4 h-10 rounded-lg bg-primary text-on-primary font-headline-sm text-body-md font-semibold hover:bg-primary-container active:scale-95 transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">person_add</span>
            <span>+ Register New Student</span>
          </button>
        </div>
      </div>

      {/* Subscription & Quota Packages */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-md mb-margin">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-sm border-b border-outline-variant/60 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary font-bold">
              <span className="material-symbols-outlined text-lg">inventory_2</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-body-lg font-semibold text-on-surface">Subscription &amp; Quota Packages</h2>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-badge text-label-badge font-semibold">{s.plans.length} Active Configs</span>
              </div>
              <p className="font-label-meta text-label-meta text-secondary mt-0.5">Configured plans appear directly in customer registration and quota recharges.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-label-badge">
            <span className="text-secondary">Default staff billing currency:</span>
            <span className="font-mono font-bold text-on-surface bg-surface-container px-2 py-1 rounded">INR (₹)</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-space-md">
          {s.plans.map((pl) => (
            <div key={pl.id} className="p-3.5 rounded-xl border border-outline-variant/60 bg-surface-container-low/40 flex flex-col justify-between hover:border-primary transition-all">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-headline-sm text-body-md font-semibold text-on-surface">{pl.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-label-badge text-label-badge font-medium">Active</span>
                </div>
                <p className="text-label-meta text-secondary mb-2.5">{pl.desc}</p>
                <div className="space-y-1.5 text-body-sm">
                  <div className="flex justify-between items-center text-secondary">
                    <span>Total Quota:</span>
                    <span className="font-semibold text-on-surface font-label-numeric">{L.kg(pl.quotaKg, 1)} KG</span>
                  </div>
                  <div className="flex justify-between items-center text-secondary">
                    <span>Rate per KG:</span>
                    <span className="font-mono text-on-surface font-medium">₹{pl.ratePerKg} / KG</span>
                  </div>
                  <div className="flex justify-between items-center pt-1.5 border-t border-outline-variant/40">
                    <span className="font-medium text-secondary text-label-meta uppercase">Total Price</span>
                    <span className="font-bold text-primary font-label-numeric text-body-md">{L.inr(pl.quotaKg * pl.ratePerKg)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-outline-variant/40">
                <span className="text-label-meta text-secondary">{pl.students} Students</span>
                <button onClick={() => setEditing(pl.id)} className="text-label-badge text-primary font-medium hover:underline flex items-center gap-0.5">
                  <span>Edit</span>
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
            </div>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              b.publish();
            }}
            className="p-3.5 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low/20 flex flex-col justify-between hover:border-primary/60 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-headline-sm text-body-md font-semibold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">add_box</span> + Add New Package
                </span>
                <span className="text-label-meta text-secondary font-mono">AUTO-CALC</span>
              </div>
              <div className="space-y-2">
                <input value={b.name} onChange={(e) => b.setName(e.target.value)} aria-label="Package name" className="w-full h-8 px-2.5 text-body-sm bg-surface-container-lowest rounded border border-outline-variant focus:border-primary focus:outline-none" placeholder="Package Name (e.g. VIP Custom)" type="text" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={b.quota} onChange={(e) => b.setQuota(e.target.value)} aria-label="Quota in KG" className="w-full h-8 px-2 text-body-sm bg-surface-container-lowest rounded border border-outline-variant focus:border-primary focus:outline-none font-mono" placeholder="Quota (KG)" type="number" />
                  <input value={b.rate} onChange={(e) => b.setRate(e.target.value)} aria-label="Rate per KG" className="w-full h-8 px-2 text-body-sm bg-surface-container-lowest rounded border border-outline-variant focus:border-primary focus:outline-none font-mono" placeholder="₹ / KG" type="number" />
                </div>
                <div className="flex items-center justify-between px-2 py-1 bg-surface-container rounded text-label-meta">
                  <span className="text-secondary">Calculated:</span>
                  <span className="font-bold text-on-surface font-mono">
                    {b.q} KG × ₹{b.r} = {L.inr(b.price)}
                  </span>
                </div>
              </div>
            </div>
            <button className="mt-2 w-full h-8 bg-primary text-on-primary rounded font-semibold text-label-badge hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm">save</span>
              <span>Save Package</span>
            </button>
          </form>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 mb-margin flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[280px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">person_search</span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            aria-label="Filter students"
            className="w-full h-11 pl-10 pr-4 text-body-sm bg-surface-container-low rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            placeholder="Filter by Name, Student ID (e.g., CUST-0419), or Phone..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Select value={planF} onChange={(v) => (setPlanF(v), setPage(0))} label="Plan filter">
            <option value="all">All Plans ({s.plans.map((x) => x.name.split(' ')[0]).join(', ')})</option>
            {s.plans.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name} ({x.quotaKg} KG @ ₹{x.ratePerKg}/KG = {L.inr(x.quotaKg * x.ratePerKg)})
              </option>
            ))}
          </Select>
          <Select value={toneF} onChange={(v) => (setToneF(v), setPage(0))} label="Quota status filter">
            <option value="all">Quota Status: All States</option>
            <option value="ok">Healthy Balance (≥{L.LOW_KG} KG)</option>
            <option value="low">Low Balance (&lt;{L.LOW_KG} KG)</option>
            <option value="over">Quota Exceeded (Negative/Arrears)</option>
          </Select>
          <Select value={yearF} onChange={(v) => (setYearF(v), setPage(0))} label="Academic year filter">
            <option value="all">Academic Year: All Years</option>
            {YEARS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </Select>
          <button onClick={clearFilters} title="Clear filters" className="h-11 px-3 rounded-lg border border-outline-variant text-secondary hover:bg-surface-container-low hover:text-on-surface transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-base">filter_alt_off</span>
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-margin min-h-0 items-start">
        {/* Students table */}
        <section className="col-span-12 lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
          <div className="p-space-md border-b border-outline-variant bg-surface-container-low/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-body-lg font-semibold text-on-surface">Registered Students</span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container font-label-badge text-label-badge text-on-secondary-fixed">{s.customers.length} Active</span>
            </div>
            <p className="font-label-meta text-label-meta text-secondary">Click row to inspect deduction ledger</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low font-label-badge text-label-badge text-secondary tracking-wider uppercase">
                  <th className="py-3 px-4">Student &amp; Department</th>
                  <th className="py-3 px-3">Plan</th>
                  <th className="py-3 px-3">Remaining Quota</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60">
                {shown.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-secondary text-body-sm">
                      No students match these filters.
                    </td>
                  </tr>
                )}
                {shown.map((x) => (
                  <StudentRow key={x.id} c={x} selected={x.id === c.id} onSelect={() => s.selectCustomer(x.id)} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between text-body-sm text-secondary">
            <span>
              Showing {rows.length ? p * PAGE + 1 : 0}-{p * PAGE + shown.length} of {rows.length} Student Accounts
            </span>
            <div className="flex items-center gap-1">
              <button aria-label="Previous page" onClick={() => setPage(p - 1)} className="px-2.5 py-1 border border-outline-variant rounded hover:bg-surface-container-low disabled:opacity-50" disabled={p === 0}>
                <span className="material-symbols-outlined text-sm align-middle">chevron_left</span>
              </button>
              {Array.from({ length: pages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)} className={`px-3 py-1 rounded text-xs ${i === p ? 'bg-primary text-on-primary font-semibold' : 'hover:bg-surface-container-low'}`}>
                  {i + 1}
                </button>
              ))}
              <button aria-label="Next page" onClick={() => setPage(p + 1)} disabled={p >= pages - 1} className="px-2.5 py-1 border border-outline-variant rounded hover:bg-surface-container-low disabled:opacity-50">
                <span className="material-symbols-outlined text-sm align-middle">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        <CustomerDetail c={c} />
      </div>

      {editing && <EditPlanModal planId={editing} onClose={() => setEditing(null)} />}
      {registering && <RegisterModal onClose={() => setRegistering(false)} />}
    </main>
  );
}

function Select({ value, onChange, label, children }: { value: string; onChange: (v: string) => void; label: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label} className={selectCls}>
        {children}
      </select>
      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-base">keyboard_arrow_down</span>
    </div>
  );
}

function StudentRow({ c, selected, onSelect }: { c: L.Customer; selected: boolean; onSelect: () => void }) {
  const { plan } = useStore();
  const pl = plan(c.planId);
  const tone = L.balanceTone(c.balanceKg);
  const pct = Math.max(0, Math.min(100, Math.round((c.balanceKg / pl.quotaKg) * 100)));
  const avatar = tone === 'over' ? 'bg-error text-on-error' : tone === 'low' ? 'bg-error-container text-on-error-container' : selected ? 'bg-primary-fixed text-primary' : 'bg-secondary-fixed text-secondary';
  return (
    <tr onClick={onSelect} className={`cursor-pointer transition-colors ${selected ? 'bg-primary/5 border-l-4 border-l-primary hover:bg-primary/10' : 'hover:bg-surface-container-low'}`}>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-body-md shrink-0 ${avatar}`}>{L.initials(c.name)}</div>
          <div>
            <div className="font-headline-sm text-body-md font-semibold text-on-surface">{c.name}</div>
            <div className="font-label-meta text-label-meta text-secondary flex items-center gap-1.5">
              <span className={`font-mono font-medium ${tone === 'over' ? 'text-error' : selected ? 'text-primary' : 'text-secondary'}`}>{c.id}</span>
              <span>•</span>
              <span>{L.yearLabel(c, true)}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="py-3.5 px-3">
        <span className="inline-flex items-center font-label-badge text-label-badge px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-medium whitespace-nowrap">
          {pl.name.split(' ')[0]} {pl.quotaKg}KG
        </span>
      </td>
      <td className="py-3.5 px-3">
        <div className="w-36">
          <div className="flex justify-between items-center mb-1">
            <span className={`font-label-numeric text-body-sm font-semibold ${tone === 'over' ? 'text-error font-bold' : tone === 'low' ? 'text-[#B06000]' : 'text-on-surface'}`}>{L.kg(Math.max(0, c.balanceKg), 1)} KG</span>
            <span className={`font-label-meta text-label-meta ${tone === 'over' ? 'text-error font-semibold' : tone === 'low' ? 'text-[#B06000] font-semibold' : 'text-secondary'}`}>{tone === 'over' ? `${L.kg(c.balanceKg, 1)} KG Over` : tone === 'low' ? 'Low' : `${pct}% Rem`}</span>
          </div>
          <div className={`w-full h-1.5 rounded-full overflow-hidden ${tone === 'over' ? 'bg-error-container' : 'bg-surface-container-high'}`}>
            <div className={`h-full rounded-full ${tone === 'over' ? 'bg-error' : tone === 'low' ? 'bg-[#F59E0B]' : 'bg-primary'}`} style={{ width: tone === 'over' ? '100%' : `${Math.max(pct, 3)}%` }}></div>
          </div>
        </div>
      </td>
      <td className="py-3.5 px-3">
        {tone === 'ok' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-label-badge text-label-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-[#137333]"></span> Active
          </span>
        )}
        {tone === 'low' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] font-label-badge text-label-badge font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span> Warning
          </span>
        )}
        {tone === 'over' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-badge text-label-badge font-semibold whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Excess Billable
          </span>
        )}
      </td>
    </tr>
  );
}

function CustomerDetail({ c }: { c: L.Customer }) {
  const s = useStore();
  const pl = s.plan(c.planId);
  const [adjusting, setAdjusting] = useState(false);
  const [delta, setDelta] = useState('');
  const [reason, setReason] = useState('');
  const [showAll, setShowAll] = useState(false);
  const entries = s.ledger.filter((e) => e.customerId === c.id).reverse();
  const used = L.round2(pl.quotaKg - c.balanceKg);
  const remPct = Math.max(0, Math.min(100, (c.balanceKg / pl.quotaKg) * 100));

  return (
    <section className="col-span-12 lg:col-span-5 flex flex-col gap-space-md">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-md">
        <div className="flex items-start justify-between pb-space-sm border-b border-outline-variant/60 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-headline-sm">{L.initials(c.name)}</div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">{c.name}</h2>
                <span className="font-mono text-label-badge font-bold px-2 py-0.5 rounded bg-surface-container text-primary">{c.id}</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary">{L.yearLabel(c)}</p>
            </div>
          </div>
          <a className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant text-primary font-label-badge text-label-badge hover:bg-surface-container transition-colors whitespace-nowrap" href={L.telHref(c.phone)}>
            <span className="material-symbols-outlined text-base">phone_in_talk</span>
            <span>Direct Call</span>
          </a>
        </div>
        <div className="py-2 flex items-center justify-between text-body-sm">
          <span className="text-secondary">Registered Phone:</span>
          <span className="font-mono font-medium text-on-surface">{c.phone}</span>
        </div>
        <div className="mt-2 p-space-md rounded-xl bg-[#F1F5F9] border border-outline-variant/40">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-meta text-label-meta text-secondary font-semibold uppercase tracking-wider">Quota Overview Balance</span>
            <span className="font-label-badge text-label-badge px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">{pl.name.split(' ')[0]} Plan</span>
          </div>
          <div className="flex items-baseline gap-2 my-1 flex-wrap">
            <span className={`font-display-weight text-display-weight font-extrabold tracking-tight ${c.balanceKg < 0 ? 'text-error' : 'text-on-surface'}`}>{L.kg(c.balanceKg)}</span>
            <span className="font-headline-sm text-headline-sm text-secondary font-bold">KG</span>
            <span className="font-body-md text-body-md text-secondary ml-auto">
              available of <strong>{L.kg(pl.quotaKg, 1)} KG</strong>
            </span>
          </div>
          <div className="w-full h-2.5 bg-outline-variant/40 rounded-full overflow-hidden mt-2">
            <div className={`h-full rounded-full transition-all duration-300 ${c.balanceKg < L.LOW_KG ? 'bg-error' : 'bg-primary'}`} style={{ width: `${remPct}%` }}></div>
          </div>
          <div className="flex justify-between items-center mt-1.5 font-label-meta text-label-meta text-secondary">
            <span>
              Used: {L.kg(used)} KG ({L.kg((used / pl.quotaKg) * 100, 1)}%)
            </span>
            <span>Renewal: {c.renewal}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-space-md">
          <button
            onClick={() => setAdjusting((a) => !a)}
            disabled={s.role !== 'owner'}
            title={s.role !== 'owner' ? 'Owner only' : undefined}
            className="h-10 px-2 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface font-label-badge text-label-badge font-semibold hover:bg-surface-container active:scale-95 transition-all flex items-center justify-center gap-1 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base text-secondary">tune</span>
            <span>Adjust Balance</span>
          </button>
          <button onClick={() => s.act.renewPackage(c.id)} className="h-10 px-2 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface font-label-badge text-label-badge font-semibold hover:bg-surface-container active:scale-95 transition-all flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-base text-secondary">autorenew</span>
            <span>Renew Plan</span>
          </button>
          <button onClick={() => s.notYet('Invoices')} className="h-10 px-2 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface font-label-badge text-label-badge font-semibold hover:bg-surface-container active:scale-95 transition-all flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-base text-secondary">receipt_long</span>
            <span>View Invoices</span>
          </button>
        </div>
        {adjusting && (
          <form
            className="mt-3 p-3 rounded-lg border border-outline-variant bg-surface-container-low space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (s.act.adjustBalance(c.id, parseFloat(delta), reason)) {
                setDelta('');
                setReason('');
                setAdjusting(false);
              }
            }}
          >
            <p className="text-label-meta text-secondary">Audited adjustment — appended to the ledger with your name and reason. Use a negative value to debit.</p>
            <div className="grid grid-cols-3 gap-2">
              <input value={delta} onChange={(e) => setDelta(e.target.value)} aria-label="Adjustment in KG" className={`${fieldCls} h-9`} type="number" step="0.1" placeholder="± KG" />
              <input value={reason} onChange={(e) => setReason(e.target.value)} aria-label="Reason" className={`${fieldCls} h-9 col-span-2`} placeholder="Reason (required), e.g. tare correction" />
            </div>
            <button className="w-full h-9 bg-primary text-on-primary rounded-lg text-label-badge font-semibold">Post Adjustment</button>
          </form>
        )}
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-md flex-1 flex flex-col">
        <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/60 mb-space-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">history</span>
            <h3 className="font-headline-sm text-body-lg font-semibold text-on-surface">Recent Intake &amp; Deduction History</h3>
          </div>
          <span className="font-label-meta text-label-meta text-secondary">October Cycle</span>
        </div>
        <div className="space-y-3 flex-1 pr-1">
          {(showAll ? entries : entries.slice(0, 3)).map((e) => {
            const credit = e.deltaKg > 0;
            return (
              <div key={e.id} className={`flex items-start justify-between p-3 rounded-lg border transition-colors ${credit ? 'border-primary/20 bg-primary/5' : 'border-outline-variant/40 hover:bg-surface-container-low/40'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 shrink-0 ${credit ? 'bg-[#E6F4EA] text-[#137333]' : 'bg-error-container text-error'}`}>
                    <span className="material-symbols-outlined text-base">{credit ? 'add' : 'remove'}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-headline-sm text-body-md font-semibold text-on-surface">{e.title}</span>
                      {e.kind === 'reset' ? <span className="font-label-badge text-label-meta px-1.5 rounded bg-surface-container text-primary font-bold">{e.ref}</span> : <span className="font-mono text-label-meta text-secondary font-medium">{e.ref}</span>}
                    </div>
                    <p className="font-label-meta text-label-meta text-secondary mt-0.5">
                      {e.at} • {e.by}
                    </p>
                    {e.note && <p className="font-label-meta text-label-meta text-on-surface-variant mt-0.5">“{e.note}”</p>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`font-label-numeric text-body-md font-bold ${credit ? 'text-[#137333]' : 'text-error'}`}>
                    {credit ? '+' : ''}
                    {L.kg(e.deltaKg)} KG
                  </span>
                  <div className="font-label-meta text-label-meta text-secondary">Bal: {L.kg(e.balanceAfter)} KG</div>
                </div>
              </div>
            );
          })}
        </div>
        {entries.length > 3 && (
          <button onClick={() => setShowAll((v) => !v)} className="w-full py-2.5 mt-space-sm text-center font-label-badge text-label-badge text-primary hover:bg-surface-container-low rounded-lg transition-colors flex items-center justify-center gap-1">
            <span>{showAll ? 'Show Recent Only' : `View Full Ledger (${entries.length} entries)`}</span>
            <span className="material-symbols-outlined text-sm">{showAll ? 'expand_less' : 'expand_more'}</span>
          </button>
        )}
      </div>
    </section>
  );
}

function RegisterModal({ onClose }: { onClose: () => void }) {
  const { plans, act } = useStore();
  const [f, setF] = useState({ name: '', phone: '', year: '1st', dept: '', planId: plans[0].id });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <Modal title="Register New Student" subtitle="Creates the profile and credits the plan quota to the ledger." onClose={onClose}>
      <form
        className="space-y-3 text-label-badge text-secondary"
        onSubmit={(e) => {
          e.preventDefault();
          if (act.addCustomer(f)) onClose();
        }}
      >
        <label className="block space-y-1">
          <span>Full Name *</span>
          <input required value={f.name} onChange={set('name')} className={fieldCls} placeholder="e.g. Tanvi Deshmukh" />
        </label>
        <label className="block space-y-1">
          <span>Phone Number *</span>
          <input required value={f.phone} onChange={set('phone')} className={fieldCls} placeholder="+91 98765 00000" inputMode="tel" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1">
            <span>Academic Year</span>
            <select value={f.year} onChange={set('year')} className={fieldCls}>
              {YEARS.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span>Department</span>
            <input value={f.dept} onChange={set('dept')} className={fieldCls} placeholder="e.g. Mechanical" />
          </label>
        </div>
        <label className="block space-y-1">
          <span>Initial Package *</span>
          <select value={f.planId} onChange={set('planId')} className={fieldCls}>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.quotaKg} KG · {L.inr(p.quotaKg * p.ratePerKg)})
              </option>
            ))}
          </select>
        </label>
        <button className="w-full h-11 bg-primary text-on-primary rounded-lg font-semibold text-body-md hover:bg-primary-container">Create Profile &amp; Package</button>
      </form>
    </Modal>
  );
}
