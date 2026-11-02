import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import * as L from '../../logic';
import { previewNote, SERVICE_OPTIONS, useIntakeForm } from '../../ui';

const PAGE = 6;

export default function IntakeStation() {
  const s = useStore();
  const f = useIntakeForm();
  const [page, setPage] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef(f.submit);
  submitRef.current = f.submit;
  const note = previewNote(f.preview, f.plan.ratePerKg);

  // Keyboard shortcuts shown in the header: F2 search, F4 confirm.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'F2') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === 'F4') {
        e.preventDefault();
        submitRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const today = s.orders.filter((o) => o.day === L.TODAY).sort(L.newestFirst);
  const pages = Math.max(1, Math.ceil(today.length / PAGE));
  const shown = today.slice(page * PAGE, page * PAGE + PAGE);
  const { intake, express } = s.stats;

  return (
    <main className="bg-surface p-space-xl flex flex-col gap-space-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-outline-variant gap-4">
        <div>
          <h1 className="text-headline-md font-headline-md text-on-surface font-bold">High-Volume Laundry Intake Station</h1>
          <p className="text-body-sm font-body-sm text-secondary mt-0.5">Direct manual weighing, customer package deduction, and intake tag generation.</p>
        </div>
        <div className="flex items-center gap-space-sm">
          <button onClick={() => s.notYet('Station calibration log')} className="px-3 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm font-medium text-on-surface hover:bg-surface-container-low flex items-center gap-1.5 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-base text-secondary">tune</span>
            <span>Station Calibration Log</span>
          </button>
          <div className="px-3 py-1.5 bg-surface-container text-on-surface rounded-lg text-label-badge font-label-badge border border-outline-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-primary">keyboard</span>
            <span>
              Shortcut Guide: <span className="text-primary font-bold">F2</span> Search | <span className="text-primary font-bold">F4</span> Confirm
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-space-lg items-start">
        {/* LEFT: Active Intake Form */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant shadow-sm flex flex-col gap-space-md">
            <div>
              <label className="block text-label-badge font-label-badge font-semibold text-on-surface mb-1.5">Customer Search &amp; Verification</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-primary">
                  <span className="material-symbols-outlined text-lg">person_search</span>
                </span>
                <input ref={searchRef} {...f.search.inputProps} className="w-full pl-9 pr-10 py-2.5 bg-surface text-body-md font-body-md font-medium text-on-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" type="text" placeholder="Search name, CUST ID or phone (F2)" />
                <button type="button" onClick={() => (f.search.clear(), searchRef.current?.focus())} className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary hover:text-error transition-colors" title="Clear selection">
                  <span className="material-symbols-outlined text-lg">cancel</span>
                </button>
                {f.search.results}
              </div>
            </div>
            {/* Active Customer Profile Card (no room / block numbers) */}
            <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-headline-sm border border-outline-variant shrink-0">{L.initials(f.c.name)}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-body-lg font-body-lg font-bold text-on-surface">{f.c.name}</span>
                    <span className="bg-surface-container text-primary text-label-meta font-label-meta px-2 py-0.5 rounded-full font-semibold border border-outline-variant whitespace-nowrap">Active Subscriber</span>
                  </div>
                  <p className="text-body-sm font-body-sm text-secondary truncate">
                    {L.yearLabel(f.c)} • {f.c.id}
                  </p>
                  <p className="text-body-sm font-body-sm text-secondary font-medium mt-0.5">{f.c.phone}</p>
                </div>
              </div>
              <a className="px-2.5 py-1.5 bg-surface-container-lowest border border-outline-variant text-primary rounded-lg text-label-badge font-label-badge font-semibold hover:bg-surface-container flex items-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0 self-start sm:self-center" href={L.telHref(f.c.phone)}>
                <span className="material-symbols-outlined text-base">call</span>
                <span>Direct Call</span>
              </a>
            </div>
            {/* Manual Direct Weight Entry */}
            <div className="pt-2 border-t border-outline-variant">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="desk-weight" className="text-label-badge font-label-badge font-bold text-on-surface">Manual Weight Entry</label>
                <span className="text-label-meta font-label-meta text-secondary uppercase font-semibold">Direct Manual Input</span>
              </div>
              <div className={`bg-surface-container-low border-2 rounded-xl px-3 py-2 flex items-center justify-between gap-2 ${f.weightValid ? 'border-primary' : 'border-error'}`}>
                <div className="flex items-baseline gap-1.5 shrink-0">
                  <input id="desk-weight" value={f.weight} onChange={(e) => f.setWeight(e.target.value)} className="text-display-weight font-display-weight text-on-surface bg-transparent border-0 p-0 focus:ring-0 w-28 tracking-tight text-left font-bold" type="text" inputMode="decimal" />
                  <span className="text-headline-md font-headline-md font-bold text-secondary tracking-normal">KG</span>
                </div>
                <div className="flex items-center gap-1 text-secondary text-body-sm shrink-0 bg-surface-container-lowest px-2 py-1 rounded-full border border-outline-variant">
                  <span className={`material-symbols-outlined text-base ${f.weightValid ? 'text-primary' : 'text-error'}`}>{f.weightValid ? 'check_circle' : 'error'}</span>
                  <span className={`font-medium text-label-meta ${f.weightValid ? 'text-primary' : 'text-error'}`}>{f.weightValid ? 'Verified' : 'Invalid'}</span>
                </div>
              </div>
            </div>
            {/* Bag Quantity & Priority */}
            <div className="grid grid-cols-2 gap-space-md pt-2">
              <div className="col-span-1 bg-surface-container-low p-2.5 rounded-lg border border-outline-variant flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-label-meta font-label-meta text-secondary font-bold uppercase tracking-wider text-[10px]">Bag Qty</span>
                  <span className="text-label-meta font-label-meta text-primary font-semibold text-[11px] bg-surface-container-lowest px-1.5 py-0.5 rounded border border-outline-variant">Canvas</span>
                </div>
                <div className="flex items-center justify-between bg-surface-container-lowest px-2 py-1 rounded-lg border border-outline-variant">
                  <span className="text-body-sm font-body-sm font-semibold text-on-surface">Bags</span>
                  <div className="flex items-center gap-1">
                    <button type="button" aria-label="Fewer bags" onClick={f.decBags} className="w-6 h-6 rounded bg-surface-container-low border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container font-bold text-xs leading-none transition-colors active:scale-95">-</button>
                    <span className="w-5 text-center font-bold text-body-sm font-label-numeric text-on-surface">{f.bags}</span>
                    <button type="button" aria-label="More bags" onClick={f.incBags} className="w-6 h-6 rounded bg-surface-container-low border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container font-bold text-xs leading-none transition-colors active:scale-95">+</button>
                  </div>
                </div>
              </div>
              <div className="col-span-1 bg-surface-container-low p-2.5 rounded-lg border border-outline-variant flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-label-meta font-label-meta text-secondary font-bold uppercase tracking-wider text-[10px]">Priority</span>
                  <span className="text-label-meta font-label-meta text-secondary font-medium text-[10px]">Turnaround</span>
                </div>
                <div className="grid grid-cols-2 p-0.5 bg-surface-container-lowest rounded-lg border border-outline-variant gap-1">
                  {[false, true].map((exp) => (
                    <button
                      key={String(exp)}
                      type="button"
                      onClick={() => f.setExpress(exp)}
                      className={`py-1 px-0.5 text-center rounded text-label-meta font-label-meta leading-tight flex flex-col items-center justify-center transition-all ${f.express === exp ? 'font-bold bg-primary text-on-primary shadow-sm' : 'font-medium text-secondary hover:text-on-surface hover:bg-surface-container-low'}`}
                    >
                      <span>{exp ? 'Express' : 'Standard'}</span>
                      <span className={`text-[10px] ${f.express === exp ? 'font-normal opacity-90' : exp ? 'font-semibold text-error' : ''}`}>{exp ? '12h' : '24h'}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-span-2 flex flex-col gap-2 pt-1">
                <span className="text-label-meta font-label-meta text-secondary font-bold uppercase tracking-wider">Service Options</span>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICE_OPTIONS.map((name) => (
                    <label key={name} className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant cursor-pointer hover:bg-surface transition-colors">
                      <input checked={f.services.includes(name)} onChange={() => f.toggleService(name)} className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                      <span className="text-body-sm font-body-sm font-medium text-on-surface">
                        {name}
                        {name === 'Steam Press' && <span className="text-label-meta text-primary font-bold"> (+₹35)</span>}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* Live Ledger Impact Preview */}
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant">
              <div className="flex items-center justify-between mb-2 gap-2">
                <span className="text-label-badge font-label-badge font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">receipt_long</span>
                  <span>Live Ledger Impact Preview</span>
                </span>
                <span className={`bg-surface-container text-label-meta font-label-meta px-2 py-0.5 rounded-full font-bold border border-outline-variant text-right ${note.cls}`}>{note.text}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-outline-variant text-center">
                <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant">
                  <p className="text-label-meta font-label-meta text-secondary">Current Balance</p>
                  <p className="text-label-numeric font-label-numeric font-bold text-on-surface">{L.kg(f.c.balanceKg)} KG</p>
                </div>
                <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant">
                  <p className="text-label-meta font-label-meta text-error">This Deduction</p>
                  <p className="text-label-numeric font-label-numeric font-bold text-error">-{L.kg(f.preview.weight)} KG</p>
                </div>
                <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant">
                  <p className="text-label-meta font-label-meta text-primary font-bold">Remaining Quota</p>
                  <p className={`text-label-numeric font-label-numeric font-bold ${f.preview.after < 0 ? 'text-error' : 'text-primary'}`}>{L.kg(f.preview.after)} KG</p>
                </div>
              </div>
            </div>
            <button onClick={f.submit} disabled={!f.weightValid} className="w-full py-3.5 bg-primary text-on-primary font-headline-sm text-body-lg rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-tertiary-container transition-all active:scale-[0.99] shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="material-symbols-outlined text-2xl">receipt_long</span>
              <span>+ Confirm &amp; Record Intake (F4)</span>
            </button>
          </div>
        </div>

        {/* RIGHT: Shift summary + manifest */}
        <div className="lg:col-span-5 xl:col-span-6 flex flex-col gap-space-lg">
          <div className="grid grid-cols-3 gap-space-md">
            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-badge font-label-badge font-semibold text-secondary">Weighed Today</span>
                <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
              </div>
              <div className="mt-3">
                <p className="text-headline-md font-headline-md font-bold text-on-surface">{intake.n} Orders</p>
                <p className="text-label-numeric font-label-numeric text-primary font-semibold mt-0.5">{L.kg(intake.kg)} KG Total</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-badge font-label-badge font-semibold text-secondary">Average Bundle</span>
                <span className="material-symbols-outlined text-secondary text-xl">balance</span>
              </div>
              <div className="mt-3">
                <p className="text-headline-md font-headline-md font-bold text-on-surface">{L.kg(intake.n ? intake.kg / intake.n : 0)} KG</p>
                <p className="text-label-meta font-label-meta text-secondary mt-0.5">Optimal processing threshold</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-badge font-label-badge font-semibold text-secondary">Express Intakes</span>
                <span className="material-symbols-outlined text-error text-xl">bolt</span>
              </div>
              <div className="mt-3">
                <p className="text-headline-md font-headline-md font-bold text-on-surface">{express} Orders</p>
                <p className="text-label-meta font-label-meta text-error font-medium mt-0.5">Priority cycle committed</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col overflow-hidden">
            <div className="px-space-lg py-3 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">view_list</span>
                <h2 className="text-headline-sm font-headline-sm text-on-surface font-bold">Recent Intake Manifest (Station 01)</h2>
              </div>
              <span className="text-label-meta font-label-meta text-secondary font-medium">Live · newest first</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant text-secondary text-label-badge font-label-badge uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Timestamp</th>
                    <th className="py-3 px-4 font-semibold">Tag #</th>
                    <th className="py-3 px-4 font-semibold">Customer &amp; Academic Info</th>
                    <th className="py-3 px-4 font-semibold text-right">Weight</th>
                    <th className="py-3 px-4 font-semibold text-center">Priority</th>
                    <th className="py-3 px-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant text-body-sm font-body-sm text-on-surface">
                  {shown.map((o) => {
                    const c = s.customer(o.customerId);
                    return (
                      <tr key={o.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-3.5 px-4 text-secondary font-medium whitespace-nowrap">{o.time}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-primary">#{o.id}</td>
                        <td className="py-3.5 px-4">
                          <span className="block font-semibold">{c.name}</span>
                          <span className="block text-label-meta text-secondary">{L.yearLabel(c)}</span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold font-label-numeric whitespace-nowrap">{L.kg(o.kg)} KG</td>
                        <td className="py-3.5 px-4 text-center">
                          {o.express ? (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-label-meta font-label-meta font-bold bg-error-container text-on-error-container">Express</span>
                          ) : (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-label-meta font-label-meta font-bold bg-surface-container text-secondary border border-outline-variant">Standard</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <button onClick={() => s.notYet('Tag reprint')} className="p-1 text-primary hover:bg-surface-container rounded transition-colors inline-flex items-center" title="Reprint Tag">
                            <span className="material-symbols-outlined text-base">print</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-space-lg py-2.5 bg-surface-container-low border-t border-outline-variant flex items-center justify-between text-body-sm text-secondary">
              <span>
                Showing {shown.length} of {today.length} batches today
              </span>
              <div className="flex items-center gap-1">
                <button disabled={page === 0} onClick={() => setPage(page - 1)} className="px-2 py-1 rounded bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface text-label-meta font-bold disabled:opacity-40">
                  Previous
                </button>
                <span className="px-2 py-1 rounded bg-primary text-on-primary text-label-meta font-bold">{page + 1}</span>
                <span className="px-1 text-label-meta">of {pages}</span>
                <button disabled={page >= pages - 1} onClick={() => setPage(page + 1)} className="px-2 py-1 rounded bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface text-label-meta font-bold disabled:opacity-40">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
