import { useStore } from '../../store';
import * as L from '../../logic';
import { seqLabel, useIntakeForm, useRangeDispatch } from '../../ui';

/** Stitch "Washify Ops – Staff Portal" (mobile). */
export default function StaffHome() {
  const s = useStore();
  const r = useRangeDispatch();
  const f = useIntakeForm();
  const awaiting = s.orders.filter((o) => o.status === 'in_cart').sort((a, b) => a.day - b.day || a.seq - b.seq);
  const remainingPct = Math.max(0, Math.min(100, (f.preview.after / f.plan.quotaKg) * 100));

  return (
    <div className="select-none">
      <header className="sticky top-0 z-40 bg-surface-container-lowest shadow-sm">
        <div className="flex justify-between items-center w-full px-margin-mobile h-14">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[20px]">local_laundry_service</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-headline-sm font-headline-sm font-bold text-primary leading-tight">Washify Ops</h1>
                <span className="text-label-meta font-label-meta bg-primary-fixed text-on-primary-fixed px-1.5 py-0.5 rounded font-semibold">STAFF</span>
              </div>
              <p className="text-label-meta font-label-meta text-secondary">Station 04 • Morning Shift Active</p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm">
            <button onClick={() => s.notYet('Notifications')} aria-label="Notifications" className="relative w-9 h-9 flex items-center justify-center rounded-lg text-secondary hover:bg-surface-container transition-colors active:scale-95">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface-container-lowest"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-sm flex items-center justify-center font-bold" title={s.user.name}>
              {s.user.initials}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-md mx-auto px-margin-mobile pt-space-md pb-24 space-y-space-md">
        <div className="flex items-center justify-between bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-space-sm shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
            <div>
              <p className="text-label-badge font-label-badge text-on-surface font-semibold">{s.user.name}</p>
              <p className="text-label-meta font-label-meta text-secondary">Lead Terminal Operator • Shift 07:00-15:00</p>
            </div>
          </div>
          <span className="text-label-meta font-label-meta bg-surface-container text-primary font-semibold px-2 py-0.5 rounded">Station #04</span>
        </div>

        <section className="grid grid-cols-3 gap-2">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-2.5 shadow-sm text-center flex flex-col justify-between">
            <div className="flex items-center justify-center text-primary mb-1">
              <span className="material-symbols-outlined text-[18px]">scale</span>
            </div>
            <div>
              <div className="text-headline-sm font-headline-sm text-on-surface font-bold leading-tight">{s.stats.intake.n}</div>
              <p className="text-label-meta font-label-meta text-secondary leading-tight mt-0.5">Weighed</p>
            </div>
            <div className="mt-1 text-label-meta font-label-meta font-bold text-primary bg-primary-fixed/40 rounded py-0.5">{L.kg(s.stats.intake.kg, 1)} KG</div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-2.5 shadow-sm text-center flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-primary/10 rounded-bl-xl flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            </div>
            <div className="flex items-center justify-center text-primary mb-1">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <div>
              <div className="text-headline-sm font-headline-sm text-primary font-bold leading-tight">{s.stats.ready.n}</div>
              <p className="text-label-meta font-label-meta text-secondary leading-tight mt-0.5">Ready Dispatch</p>
            </div>
            <div className="mt-1 text-label-meta font-label-meta font-semibold text-secondary bg-surface-container rounded py-0.5">Pending Push</div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-2.5 shadow-sm text-center flex flex-col justify-between">
            <div className="flex items-center justify-center text-tertiary mb-1">
              <span className="material-symbols-outlined text-[18px]">task_alt</span>
            </div>
            <div>
              <div className="text-headline-sm font-headline-sm text-on-surface font-bold leading-tight">{s.stats.delivered.n}</div>
              <p className="text-label-meta font-label-meta text-secondary leading-tight mt-0.5">Delivered</p>
            </div>
            <div className="mt-1 text-label-meta font-label-meta font-semibold text-tertiary bg-tertiary-fixed/30 rounded py-0.5">Today Handover</div>
          </div>
        </section>

        {/* Push range to delivery slot */}
        <section className="bg-surface-container-lowest border-2 border-primary/40 rounded-xl p-space-md shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/40 mb-3 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                <span className="material-symbols-outlined text-[18px]">alt_route</span>
              </div>
              <div>
                <h2 className="text-label-numeric font-label-numeric text-on-surface font-bold leading-none">Bulk Order Delivery Push</h2>
                <p className="text-label-meta font-label-meta text-secondary">Assign Sequence Batch to Driver Dispatch</p>
              </div>
            </div>
            <span className="text-label-meta font-label-meta bg-error-container text-on-error-container font-bold px-2 py-0.5 rounded-full whitespace-nowrap">{r.totalPending} Unassigned</span>
          </div>
          <div className="space-y-1.5 mb-3.5">
            <div className="flex justify-between items-center text-label-meta font-label-meta text-secondary">
              <span className="font-medium">SELECT INTAKE DATE MANIFEST:</span>
              <span className="text-primary font-bold">Slot: 16:00 - 18:00</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {r.pools.map(([day, list]) =>
                day === r.day ? (
                  <button key={day} className="flex flex-col items-center py-1.5 px-1 rounded-lg border-2 border-primary bg-primary/10 text-primary transition-all text-center">
                    <span className="text-label-badge font-label-badge font-bold">{day} Oct</span>
                    <span className="text-label-meta font-label-meta font-bold text-primary">{list.length} left</span>
                  </button>
                ) : (
                  <button key={day} onClick={() => r.setDay(day)} className="flex flex-col items-center py-1.5 px-1 rounded-lg border border-outline-variant/60 bg-surface text-secondary hover:border-primary transition-all active:scale-95 text-center">
                    <span className="text-label-badge font-label-badge font-semibold">{day} Oct</span>
                    <span className={`text-label-meta font-label-meta font-medium ${day < L.TODAY - 1 ? 'text-error' : 'text-secondary'}`}>{list.length} left</span>
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="bg-surface rounded-lg p-2.5 border border-outline-variant/50 space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-label-meta font-label-meta text-secondary font-semibold mb-1">FROM SEQ ORDER</label>
                <div className="relative">
                  <select value={r.from ?? ''} onChange={(e) => r.setFrom(e.target.value)} aria-label="From sequence" className="w-full h-11 bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 text-body-sm font-semibold text-on-surface focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                    {r.pool.map((o) => (
                      <option key={o.id} value={o.seq}>
                        {seqLabel(o)}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-secondary text-[20px]">unfold_more</span>
                </div>
              </div>
              <div>
                <label className="block text-label-meta font-label-meta text-secondary font-semibold mb-1">TO SEQ ORDER</label>
                <div className="relative">
                  <select value={r.to ?? ''} onChange={(e) => r.setTo(e.target.value)} aria-label="To sequence" className="w-full h-11 bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 text-body-sm font-semibold text-on-surface focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                    {r.pool
                      .filter((o) => r.from === undefined || o.seq >= r.from)
                      .map((o) => (
                        <option key={o.id} value={o.seq}>
                          {seqLabel(o)}
                        </option>
                      ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-secondary text-[20px]">unfold_more</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-2.5 py-1.5 bg-surface-container-high rounded border border-outline-variant/40">
              <div className="flex items-center gap-1.5 text-label-badge font-label-badge font-semibold text-on-surface">
                <span className="material-symbols-outlined text-[16px] text-primary">view_agenda</span>
                <span>{r.selected.length} Orders Selected</span>
              </div>
              <span className="text-label-badge font-label-badge font-bold text-primary">{L.kg(r.load, 1)} KG Load</span>
            </div>
          </div>
          <button onClick={r.push} disabled={!r.selected.length} className="mt-3 w-full min-h-[48px] bg-primary hover:bg-primary-container active:scale-[0.98] text-on-primary font-body-lg font-semibold rounded-lg flex items-center justify-center gap-2 shadow transition-all duration-150 disabled:opacity-50">
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
            <span>+ Push Range to Delivery Slot</span>
          </button>
        </section>

        {/* Fast manual intake */}
        <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-space-md shadow-sm space-y-space-md">
          <div className="flex items-center justify-between pb-1 border-b border-outline-variant/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">assignment_add</span>
              <h2 className="text-label-numeric font-label-numeric text-on-surface font-bold">Fast Manual Intake</h2>
            </div>
            <span className="text-label-meta font-label-meta text-secondary font-medium">New Tag: #{f.nextId}</span>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px] pointer-events-none">search</span>
            <input {...f.search.inputProps} type="text" placeholder="Search name, CUST ID or phone" className="w-full h-10 pl-9 pr-3 bg-surface rounded-lg border border-outline-variant/60 text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            {f.search.results}
          </div>
          <div className="bg-surface border border-outline-variant/60 rounded-lg p-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-sm">{L.initials(f.c.name)}</div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-body-sm font-bold text-on-surface">{f.c.name}</span>
                    <span className="text-label-meta font-label-meta bg-surface-container px-1 rounded text-secondary font-semibold">{f.c.id}</span>
                  </div>
                  <p className="text-label-meta font-label-meta text-secondary">{L.yearLabel(f.c)} • Subscribed</p>
                </div>
              </div>
              <a className="w-11 h-11 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary rounded-lg flex items-center justify-center transition-colors active:scale-95 shadow-sm" href={L.telHref(f.c.phone)} title={`Call ${f.c.name} (${f.c.phone})`}>
                <span className="material-symbols-outlined text-[20px]">call</span>
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="staff-weight" className="text-label-meta font-label-meta text-secondary font-semibold tracking-wide">
                MANUAL WEIGHT ENTRY
              </label>
              <span className={`text-label-badge font-label-badge font-bold px-2 py-0.5 rounded flex items-center gap-1 ${f.weightValid ? 'bg-primary-fixed/40 text-on-primary-fixed' : 'bg-error-container text-on-error-container'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${f.weightValid ? 'bg-primary' : 'bg-error'}`}></span> {f.weightValid ? (f.hold ? 'Held' : 'Verified') : 'Invalid'}
              </span>
            </div>
            <div className="bg-surface-container rounded-lg p-3 border border-outline-variant flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2 min-w-0">
                <input id="staff-weight" value={f.weight} readOnly={f.hold} onChange={(e) => f.setWeight(e.target.value)} type="number" inputMode="decimal" step="0.01" className="w-28 bg-transparent border-0 p-0 focus:ring-0 font-display-weight text-display-weight text-on-surface tracking-tighter" />
                <span className="text-headline-sm font-headline-sm text-secondary font-bold">KG</span>
              </div>
              <div className="flex gap-1.5">
                <button onClick={f.zero} className="h-9 px-2.5 bg-surface-container-lowest hover:bg-surface border border-outline-variant/60 rounded text-label-badge font-label-badge font-semibold text-secondary active:scale-95">
                  ZERO
                </button>
                <button onClick={f.toggleHold} className={`h-9 px-2.5 rounded text-label-badge font-label-badge font-semibold active:scale-95 ${f.hold ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest border border-outline-variant/60 text-secondary'}`}>
                  HOLD
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-surface p-2 border border-outline-variant/60 rounded-lg">
              <label className="block text-label-meta font-label-meta text-secondary mb-1">BAG QUANTITY</label>
              <div className="flex items-center justify-between">
                <button aria-label="Fewer bags" onClick={f.decBags} className="w-9 h-9 rounded bg-surface-container-lowest border border-outline-variant text-on-surface font-bold text-base flex items-center justify-center active:scale-95">
                  -
                </button>
                <span className="text-body-lg font-bold text-on-surface">
                  {f.bags} {f.bags === 1 ? 'Bag' : 'Bags'}
                </span>
                <button aria-label="More bags" onClick={f.incBags} className="w-9 h-9 rounded bg-surface-container-lowest border border-outline-variant text-on-surface font-bold text-base flex items-center justify-center active:scale-95">
                  +
                </button>
              </div>
            </div>
            <div className="bg-surface p-2 border border-outline-variant/60 rounded-lg">
              <label className="block text-label-meta font-label-meta text-secondary mb-1">TURNAROUND</label>
              <div className="grid grid-cols-2 gap-1 h-9">
                <button onClick={() => f.setExpress(false)} className={`rounded text-label-meta font-label-meta font-bold ${!f.express ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-secondary border border-outline-variant'}`}>
                  Std 24h
                </button>
                <button onClick={() => f.setExpress(true)} className={`rounded text-label-meta font-label-meta font-bold ${f.express ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-secondary border border-outline-variant'}`}>
                  Exp 12h
                </button>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low border border-outline-variant/50 rounded-lg p-2.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-body-sm font-semibold text-on-surface">{f.plan.name} Plan</span>
              <span className="text-label-meta font-label-meta text-secondary">{L.kg(f.plan.quotaKg, 1)} KG Total</span>
            </div>
            <div className="w-full bg-outline-variant/40 h-2 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${f.preview.tone === 'ok' ? 'bg-primary' : 'bg-error'}`} style={{ width: `${remainingPct}%` }}></div>
            </div>
            <div className="flex items-center justify-between text-label-meta font-label-meta">
              <span className="text-secondary">
                Current Deduction: <strong className="text-on-surface">-{L.kg(f.preview.weight)} KG</strong>
              </span>
              <span className={`font-bold ${f.preview.after < 0 ? 'text-error' : 'text-primary'}`}>{L.kg(f.preview.after)} KG Remaining</span>
            </div>
          </div>
          <button onClick={f.submit} disabled={!f.weightValid} className="w-full min-h-[48px] bg-primary hover:bg-primary-container active:scale-[0.98] text-on-primary font-body-lg font-semibold rounded-lg flex items-center justify-center gap-2 shadow transition-all duration-150 disabled:opacity-50">
            <span className="material-symbols-outlined text-[20px]">add_task</span>
            <span>+ Record Intake &amp; Confirm Tag</span>
          </button>
        </section>

        {/* Active manifest */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold text-base">Active Shift Manifest</h3>
            <span className="text-label-meta font-label-meta text-primary font-semibold">{awaiting.length} Awaiting Handover</span>
          </div>
          {awaiting.length === 0 && <p className="text-body-sm text-secondary px-1">No bundles in carts right now. Push a range above to load a cart.</p>}
          {awaiting.slice(0, 4).map((o) => (
            <div key={o.id} className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-3 shadow-sm relative overflow-hidden flex items-center justify-between gap-2">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary"></div>
              <div className="pl-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-body-sm font-bold text-on-surface">{s.customer(o.customerId).name}</span>
                  <span className="text-label-meta font-label-meta font-mono font-bold text-primary bg-primary-fixed/40 px-1.5 rounded">Seq {seqLabel(o)}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-label-badge font-label-badge bg-surface-container text-secondary px-2 py-0.5 rounded">{L.kg(o.kg)} KG</span>
                  <span className="text-label-meta font-label-meta text-secondary">In Cart {L.pad(o.cart ?? 1)}</span>
                </div>
              </div>
              <button onClick={() => s.act.handover([o.id])} className="min-h-[44px] px-3 bg-surface hover:bg-surface-container border border-outline-variant/80 rounded-lg text-primary text-label-badge font-label-badge font-bold flex items-center gap-1 active:scale-95 shrink-0">
                <span className="material-symbols-outlined text-[18px]">check</span>
                <span>Verify Handover</span>
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
