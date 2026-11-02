import { useRef } from 'react';
import { useStore } from '../../store';
import * as L from '../../logic';
import { go, previewNote, useIntakeForm } from '../../ui';

const TAGS: [string, string][] = [
  ['Wash & Fold', 'Normal Wash & Fold'],
  ['Bedsheet + Pillowcases', 'Bedsheet + Pillowcases'],
  ['Uniforms', 'Uniforms'],
];

/** Stitch "Record Laundry Intake" (hostel cart PWA). */
export default function CartIntake() {
  const s = useStore();
  const f = useIntakeForm();
  const searchRef = useRef<HTMLInputElement>(null);
  const note = previewNote(f.preview, f.plan.ratePerKg);
  const remainingPct = Math.max(0, Math.min(100, (f.c.balanceKg / f.plan.quotaKg) * 100));
  const tone = L.balanceTone(f.c.balanceKg);

  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 h-14 bg-surface-container-lowest text-primary shadow-sm">
        <div className="flex items-center gap-2">
          <button onClick={() => go('cart', 'dashboard')} aria-label="Back" className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors duration-150 active:scale-95" type="button">
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">local_laundry_service</span>
            <span className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">Washify</span>
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-meta font-label-meta font-semibold bg-surface-container-high text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span>
          Intake Cart
        </span>
      </header>
      <main className="px-4 pt-3 pb-64 space-y-3.5">
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <h1 className="text-headline-md font-headline-md font-bold text-on-surface tracking-tight">New Laundry Intake</h1>
            <p className="text-label-meta font-label-meta text-on-surface-variant">Rapid weigh-in &amp; immediate ledger sync</p>
          </div>
          <span className="text-label-meta font-label-meta px-2 py-1 rounded bg-surface-container-low text-secondary border border-outline-variant font-medium">Cart #04</span>
        </div>
        <section className="relative">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">search</span>
            <input ref={searchRef} {...f.search.inputProps} className="w-full h-12 pl-10 pr-9 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface text-body-md font-body-md placeholder-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm" placeholder="Search customer name or ID..." type="text" />
            <button onClick={f.search.clear} aria-label="Clear search" className="absolute right-3 text-outline hover:text-on-surface" type="button">
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          </div>
          {f.search.results}
        </section>
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-3.5 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"></div>
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-headline-sm font-headline-sm text-on-surface font-semibold">{f.c.name}</span>
                <span className="text-label-meta font-label-meta px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono">{f.c.id}</span>
              </div>
              <p className="text-body-sm font-body-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-outline">school</span> {L.yearLabel(f.c)}
              </p>
              <p className="text-body-sm font-body-sm text-secondary flex items-center gap-1 pt-0.5">
                <span className="material-symbols-outlined text-[15px] text-outline">call</span> {f.c.phone}
              </p>
            </div>
            <button onClick={() => (f.search.clear(), searchRef.current?.focus())} className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5 mt-0.5" type="button">
              Switch <span className="material-symbols-outlined text-[16px]">sync_alt</span>
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-surface-container bg-surface-container-low rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">loyalty</span>
                <span className="text-label-badge font-label-badge text-on-surface font-bold">
                  {f.plan.name} · {f.plan.quotaKg} kg
                </span>
              </div>
              <span className="text-label-meta font-label-meta text-on-surface-variant bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant">₹{f.plan.ratePerKg}/kg</span>
            </div>
            <div className="mt-2.5">
              <div className="flex items-baseline justify-between text-body-sm font-body-sm mb-1.5">
                <span className="text-on-surface font-semibold">
                  <span className={`font-bold ${tone === 'ok' ? 'text-primary' : 'text-error'}`}>{L.kg(f.c.balanceKg)} kg</span> remaining
                </span>
                <span className="text-label-meta font-label-meta text-on-surface-variant">of {L.kg(f.plan.quotaKg)} kg</span>
              </div>
              <div className="w-full bg-outline-variant h-2 rounded-full overflow-hidden flex">
                <div className={`h-full transition-all duration-300 ${tone === 'ok' ? 'bg-primary' : 'bg-error'}`} style={{ width: `${remainingPct}%` }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2.5 pt-1 text-label-meta font-label-meta">
              <span className="text-on-surface-variant">
                Value left: <strong className="text-on-surface font-semibold">{L.inr(Math.max(0, f.c.balanceKg) * f.plan.ratePerKg)}</strong>
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${tone === 'ok' ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-error-container text-on-error-container'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${tone === 'ok' ? 'bg-primary' : 'bg-error'}`}></span> {tone === 'ok' ? `Good Balance (≥${L.LOW_KG} kg)` : tone === 'low' ? 'Low Balance' : 'In Arrears'}
              </span>
            </div>
          </div>
        </section>
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">scale</span>
            <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface">Laundry Weight</h2>
          </div>
          <div className="bg-surface-container-low rounded-xl p-4 flex flex-col items-center justify-center border border-outline-variant relative">
            <label htmlFor="weight-display" className="text-label-meta font-label-meta uppercase tracking-wider text-outline font-semibold mb-2">
              ENTER WEIGHT MANUALLY
            </label>
            <div className={`flex items-center justify-center gap-2 bg-surface-container-lowest border rounded-xl px-4 py-2 w-full max-w-xs shadow-sm focus-within:ring-1 ${f.weightValid ? 'border-outline-variant focus-within:border-primary focus-within:ring-primary' : 'border-error focus-within:ring-error'}`}>
              <input id="weight-display" value={f.weight} onChange={(e) => f.setWeight(e.target.value)} type="number" step="0.01" min="0.1" inputMode="decimal" className="w-full text-center font-display-weight text-display-weight text-on-surface tracking-tight font-bold bg-transparent border-0 focus:outline-none focus:ring-0 p-0" />
              <span className="text-headline-md font-headline-md text-primary font-bold select-none">KG</span>
            </div>
          </div>
          <div className="bg-surface rounded-xl border border-outline-variant p-3 space-y-2">
            <div className="text-label-badge font-label-badge text-on-surface font-bold uppercase tracking-wider">Ledger Impact Preview</div>
            <div className="space-y-1.5 text-body-sm font-body-sm">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Current Balance</span>
                <span className="font-mono font-medium text-on-surface">{L.kg(f.c.balanceKg)} kg</span>
              </div>
              <div className="flex justify-between items-center text-error font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">remove_circle_outline</span> This Intake
                </span>
                <span className="font-mono font-bold">- {L.kg(f.preview.weight)} kg</span>
              </div>
              <div className="pt-1.5 border-t border-outline-variant flex justify-between items-center text-body-lg font-body-lg font-bold">
                <span className="text-on-surface">New Balance</span>
                <div className="text-right">
                  <span className={`font-bold ${f.preview.after < 0 ? 'text-error' : 'text-primary'}`}>{L.kg(f.preview.after)} kg</span>
                  <span className={`block text-label-meta font-label-meta font-normal ${f.preview.tone === 'ok' ? 'text-on-surface-variant' : note.cls}`}>{f.preview.tone === 'ok' ? `${L.inr(Math.max(0, f.preview.after) * f.plan.ratePerKg)} value remaining` : note.text}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 pt-1">
            <span className="text-label-badge font-label-badge font-bold text-on-surface block">Item Category Tags</span>
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map(([value, label]) => {
                const on = f.services.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => f.toggleService(value)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-label-badge text-label-badge border ${on ? 'bg-surface-container-high text-primary font-semibold border-primary/20' : 'bg-surface-container text-on-surface-variant font-medium border-outline-variant'}`}
                  >
                    {on && <span className="material-symbols-outlined text-[15px]">check_circle</span>} {label}
                  </button>
                );
              })}
            </div>
            <div className="pt-2">
              <div className="relative">
                <input value={f.note} onChange={(e) => f.setNote(e.target.value)} aria-label="Special wash instructions" className="w-full h-11 px-3 pr-9 rounded-lg border border-outline-variant bg-surface-container-lowest text-body-sm font-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-outline" placeholder="Add special wash instructions..." type="text" maxLength={120} />
                <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline text-[18px]">edit_note</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="fixed bottom-16 inset-x-0 max-w-md mx-auto z-40 px-4 py-2 bg-surface-container-lowest/95 backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between text-body-sm font-body-sm pb-1.5 gap-2">
          <span className="text-on-surface-variant font-medium">Pending Transaction</span>
          <span className="font-bold text-on-surface flex items-center gap-1 text-right">
            <span className="material-symbols-outlined text-primary text-[16px]">arrow_downward</span> Deduct {L.kg(f.preview.weight)} kg from {L.shortName(f.c.name)}
          </span>
        </div>
        <button onClick={f.submit} disabled={!f.weightValid} className="w-full h-12 bg-primary text-on-primary rounded-xl font-body-lg font-semibold flex items-center justify-center gap-2 shadow-md active:bg-tertiary-container active:scale-[0.99] transition-all duration-150 disabled:opacity-50" type="button">
          <span className="material-symbols-outlined text-[20px]">local_shipping</span>
          <span>Confirm &amp; Generate Order ({f.nextId})</span>
        </button>
        <div className="flex items-center justify-center gap-1 pt-1.5">
          <span className="material-symbols-outlined text-[14px] text-tertiary">lock</span>
          <p className="text-label-meta font-label-meta text-on-surface-variant">Creates order &amp; ledger debit atomically · by {s.user.name}</p>
        </div>
      </div>
    </>
  );
}
