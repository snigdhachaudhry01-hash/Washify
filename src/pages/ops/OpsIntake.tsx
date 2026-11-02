import { useStore } from '../../store';
import * as L from '../../logic';
import { previewNote, SERVICE_OPTIONS, useIntakeForm } from '../../ui';

/** Stitch "Staff Intake Station" (mobile). */
export default function OpsIntake() {
  const s = useStore();
  const f = useIntakeForm();
  const note = previewNote(f.preview, f.plan.ratePerKg);
  const recent = s.orders.filter((o) => o.day === L.TODAY).sort(L.newestFirst).slice(0, 3);

  return (
    <div className="select-none">
      <header className="bg-surface-container-lowest sticky top-0 z-40 w-full px-margin-mobile h-14 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">local_laundry_service</span>
          <span className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">Washify Ops</span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-badge text-label-badge">
          <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span> Shift Active
        </span>
      </header>
      <div className="bg-surface-container-low px-margin-mobile py-2.5 flex justify-between items-center border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-lg">badge</span>
          <span className="text-secondary font-body-sm text-body-sm">{s.user.name}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-surface-container-lowest px-2.5 py-0.5 rounded border border-outline-variant/40">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span className="font-label-meta text-label-meta text-primary font-semibold">Station #04</span>
        </div>
      </div>
      <main className="px-margin-mobile pt-3 pb-28 space-y-4 max-w-md mx-auto">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-secondary text-xl pointer-events-none">search</span>
          <input {...f.search.inputProps} className="w-full h-12 pl-11 pr-11 bg-surface-container-lowest rounded-xl border border-outline-variant/60 focus:border-2 focus:border-primary focus:outline-none font-body-md text-body-md text-on-surface transition-colors" placeholder="Search customer by name or CUST ID..." type="text" />
          <button onClick={f.search.clear} aria-label="Clear search input" className="absolute right-3 text-secondary hover:text-on-surface transition-colors p-1 flex items-center justify-center" type="button">
            <span className="material-symbols-outlined text-lg">cancel</span>
          </button>
          {f.search.results}
        </div>

        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          <div className="flex justify-between items-start gap-2 pl-1">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-headline-sm font-headline-sm text-on-surface font-semibold tracking-tight">{f.c.name}</h2>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-secondary-container font-label-meta text-label-meta font-medium">{f.c.id}</span>
              </div>
              <p className="text-secondary font-body-sm text-body-sm mt-0.5">{L.yearLabel(f.c, true)}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-badge text-label-badge">
                  <span className="material-symbols-outlined text-xs">verified</span> Active Subscriber
                </span>
                <span className="text-secondary font-label-meta text-label-meta">{f.plan.name}</span>
              </div>
            </div>
            <a href={L.telHref(f.c.phone)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low text-primary border border-outline-variant/30 hover:bg-surface-container transition-colors active:scale-95 duration-100 shrink-0">
              <span className="material-symbols-outlined text-base">call</span>
              <span className="font-label-badge text-label-badge">Direct Call</span>
            </a>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-xl">scale</span>
              <h3 className="font-label-numeric text-label-numeric text-on-surface font-semibold">Manual Intake Terminal</h3>
            </div>
            <span className="inline-flex items-center gap-1 text-primary font-label-meta text-label-meta">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Keypad Entry
            </span>
          </div>
          <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col items-center justify-center border border-outline-variant/30">
            <label htmlFor="ops-weight" className="font-label-meta text-label-meta text-secondary uppercase tracking-wider mb-1">
              Gross Weight
            </label>
            <div className="flex items-baseline justify-center gap-1.5 text-primary">
              <input id="ops-weight" value={f.weight} readOnly={f.hold} onChange={(e) => f.setWeight(e.target.value)} type="number" inputMode="decimal" step="0.01" className={`w-32 text-center bg-transparent border-0 p-0 focus:ring-0 font-display-weight text-display-weight tracking-tight ${f.weightValid ? 'text-on-surface' : 'text-error'}`} />
              <span className="font-label-numeric text-label-numeric font-bold text-secondary">KG</span>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full mt-3">
              <button onClick={f.zero} className="h-10 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-secondary hover:text-on-surface flex items-center justify-center gap-1.5 font-label-badge text-label-badge active:scale-95 transition-all" type="button">
                <span className="material-symbols-outlined text-base">exposure_zero</span> Clear Entry
              </button>
              <button onClick={f.toggleHold} className={`h-10 rounded-lg border flex items-center justify-center gap-1.5 font-label-badge text-label-badge active:scale-95 transition-all ${f.hold ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-lowest border-outline-variant/40 text-secondary hover:text-on-surface'}`} type="button">
                <span className={`material-symbols-outlined text-base ${f.hold ? 'fill-1' : ''}`}>lock</span> {f.hold ? 'Held' : 'Hold Readout'}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-surface-container-low/60 rounded-xl p-3 border border-outline-variant/30 flex flex-col justify-between">
              <span className="font-label-meta text-label-meta text-secondary">Bag Quantity</span>
              <div className="flex items-center justify-between mt-2">
                <button onClick={f.decBags} aria-label="Decrease bag count" className="w-10 h-10 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface flex items-center justify-center font-bold text-lg active:scale-95 transition-transform hover:bg-surface-container-high" type="button">
                  -
                </button>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {f.bags} {f.bags === 1 ? 'Bag' : 'Bags'}
                </span>
                <button onClick={f.incBags} aria-label="Increase bag count" className="w-10 h-10 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface flex items-center justify-center font-bold text-lg active:scale-95 transition-transform hover:bg-surface-container-high" type="button">
                  +
                </button>
              </div>
            </div>
            <div className="bg-surface-container-low/60 rounded-xl p-3 border border-outline-variant/30 flex flex-col justify-between">
              <span className="font-label-meta text-label-meta text-secondary">Wash Turnaround</span>
              <div className="flex flex-col gap-1.5 mt-2">
                {[false, true].map((exp) => (
                  <label key={String(exp)} className={`flex items-center justify-between px-2 py-1.5 rounded-lg font-label-badge text-label-badge cursor-pointer transition-colors ${f.express === exp ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-secondary border border-outline-variant/40 hover:bg-surface-container-high'}`}>
                    <span className="flex items-center gap-1">
                      <input checked={f.express === exp} onChange={() => f.setExpress(exp)} className="sr-only" name="turnaround" type="radio" />
                      {f.express === exp && <span className="material-symbols-outlined text-sm">check</span>}
                      {exp ? 'Express 12h' : 'Standard 24h'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-2">
            <span className="font-label-meta text-label-meta text-secondary block mb-2">Service Add-ons</span>
            <div className="grid grid-cols-2 gap-2">
              {SERVICE_OPTIONS.map((name) => {
                const on = f.services.includes(name);
                const id = `svc-${name.replace(/\W/g, '')}`;
                return (
                  <div key={name} className={`flex items-center gap-2 p-2.5 rounded-lg border transition-colors ${on ? 'bg-primary-container/10 border-primary/40' : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/60'}`}>
                    <input checked={on} onChange={() => f.toggleService(name)} className="w-4 h-4 rounded text-primary focus:ring-primary focus:ring-1 border-outline-variant" id={id} type="checkbox" />
                    <label className={`font-label-badge text-label-badge cursor-pointer select-none flex items-center justify-between w-full ${on ? 'text-primary' : 'text-on-surface'}`} htmlFor={id}>
                      <span>{name}</span>
                      {name === 'Steam Press' && <span className="text-secondary font-label-meta text-label-meta">+₹35</span>}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-3.5 border border-outline-variant/30 space-y-2">
            <div className="flex items-center justify-between text-secondary font-body-sm text-body-sm">
              <span>Current Balance:</span>
              <span className="font-label-numeric text-label-numeric text-on-surface">{L.kg(f.c.balanceKg)} KG</span>
            </div>
            <div className="flex items-center justify-between text-secondary font-body-sm text-body-sm">
              <span>This Deduction:</span>
              <span className="font-label-numeric text-label-numeric text-error font-semibold">-{L.kg(f.preview.weight)} KG</span>
            </div>
            <div className="h-px bg-outline-variant/30"></div>
            <div className="flex items-center justify-between font-label-badge text-label-badge pt-0.5">
              <span className="text-on-surface">Remaining Quota:</span>
              <span className={`font-headline-sm text-headline-sm font-bold ${f.preview.after < 0 ? 'text-error' : 'text-primary'}`}>{L.kg(f.preview.after)} KG</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-label-meta font-label-meta mt-1 ${f.preview.tone === 'ok' ? 'bg-primary/10' : 'bg-error-container/60'} ${note.cls}`}>
              <span className="material-symbols-outlined text-sm">{f.preview.tone === 'ok' ? 'check_circle' : 'warning'}</span> {note.text}
            </div>
          </div>
          <button onClick={f.submit} disabled={!f.weightValid} className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-badge text-label-badge flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all duration-100 disabled:opacity-50" type="button">
            <span className="material-symbols-outlined text-lg">print</span> + Confirm Intake &amp; Generate Tag #{f.nextId}
          </button>
        </section>

        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">history</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Shift Intakes</h3>
            </div>
            <span className="font-label-meta text-label-meta px-2 py-0.5 rounded bg-surface-container text-secondary">Last 3 Processed</span>
          </div>
          <div className="space-y-2.5">
            {recent.map((o) => (
              <div key={o.id} className="p-3 rounded-lg bg-surface-container-low/70 border border-outline-variant/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-label-numeric text-label-numeric font-bold text-secondary">#{L.pad(o.seq)}</span>
                  <div>
                    <p className="font-label-badge text-label-badge text-on-surface">
                      #{o.id} • {L.shortName(s.customer(o.customerId).name)}
                    </p>
                    <p className="font-label-meta text-label-meta text-secondary">
                      {o.service} • {o.express ? 'Express 12h' : 'Standard 24h'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-numeric text-label-numeric font-bold text-on-surface">{L.kg(o.kg)} KG</span>
                  <div className="text-label-meta font-label-meta text-primary flex items-center justify-end gap-0.5">
                    <span className="material-symbols-outlined text-xs">check</span> Tagged
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
