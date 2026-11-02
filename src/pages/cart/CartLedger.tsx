import { useStore } from '../../store';
import * as L from '../../logic';
import { downloadCsv, go, useCustomerSearch } from '../../ui';

const STRIPE: Record<L.LedgerEntry['kind'], string> = { intake: 'bg-error', reset: 'bg-primary', renew: 'bg-primary', adjust: 'bg-tertiary' };
const KIND_LABEL: Record<L.LedgerEntry['kind'], string> = { intake: 'Intake', reset: 'Quota Reset', renew: 'Renewal', adjust: 'Adjustment' };

/** Stitch "Customer Package Ledger" — append-only history (PRD FR-03/FR-06, BR-03). */
export default function CartLedger() {
  const s = useStore();
  const c = s.customer(s.selectedCustomerId);
  const pl = s.plan(c.planId);
  const search = useCustomerSearch(s.selectCustomer);
  const entries = s.ledger.filter((e) => e.customerId === c.id).reverse();
  const consumed = L.round2(pl.quotaKg - c.balanceKg);
  const usedPct = Math.max(0, Math.min(100, (consumed / pl.quotaKg) * 100));
  const tone = L.balanceTone(c.balanceKg);

  const exportCsv = () =>
    downloadCsv(`ledger_${c.id}.csv`, [
      ['Entry', 'Reference', 'Date', 'By', 'Change (KG)', 'Balance After (KG)', 'Note'],
      ...entries.map((e) => [e.title, e.ref, e.at, e.by, L.kg(e.deltaKg), L.kg(e.balanceAfter), e.note ?? '']),
    ]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md shadow-sm border-b border-outline-variant/30">
        <div className="h-14 px-4 flex items-center justify-between">
          <button onClick={() => go('cart', 'dashboard')} aria-label="Go back" className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container transition-colors duration-150 active:scale-95 text-on-surface-variant" type="button">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-headline-sm font-headline-sm text-on-surface tracking-tight">Customer Ledger</h1>
            <span className="text-label-meta font-label-meta text-primary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> PRD 5.1 &amp; 12
            </span>
          </div>
          <button onClick={exportCsv} className="flex items-center justify-center w-10 h-10 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-150 active:scale-95" title="Export Ledger CSV" aria-label="Export Ledger CSV" type="button">
            <span className="material-symbols-outlined">ios_share</span>
          </button>
        </div>
      </header>
      <main className="px-4 pt-3 pb-40 space-y-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">person_search</span>
          <input {...search.inputProps} placeholder="Find a resident by name, ID or phone" className="w-full h-11 pl-9 pr-9 rounded-xl border border-outline-variant bg-surface-container-lowest text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          <button onClick={search.clear} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface" type="button">
            <span className="material-symbols-outlined text-[18px]">cancel</span>
          </button>
          {search.results}
        </div>

        <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary"></div>
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 pl-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[20px] font-bold text-on-surface tracking-tight whitespace-nowrap">{c.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-semibold text-label-badge font-label-badge whitespace-nowrap">{c.id}</span>
              </div>
              <p className="text-body-sm font-body-sm text-secondary flex items-center flex-wrap gap-1.5 mt-0.5 leading-snug">
                <span className="material-symbols-outlined text-[16px] text-outline flex-shrink-0">school</span>
                <span>{L.yearLabel(c)}</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed/40 text-primary font-label-badge text-label-badge flex-shrink-0 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Active Subscriber
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-outline-variant/20 flex items-center justify-between pl-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-[18px]">call</span>
              <span className="text-body-md font-body-md text-on-surface font-semibold tracking-wide">{c.phone}</span>
            </div>
            <a className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container text-primary hover:bg-surface-container-high rounded-lg text-label-badge font-label-badge transition-colors active:scale-95 border border-primary/20" href={L.telHref(c.phone)}>
              <span className="material-symbols-outlined text-[18px] text-primary">call</span>
              Call
            </a>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/40 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-label-meta font-label-meta uppercase tracking-wider text-secondary font-semibold">Active Plan</span>
              <h3 className="text-body-lg font-body-lg text-on-surface font-semibold">
                {pl.name} {pl.quotaKg} kg
              </h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                ₹{pl.ratePerKg}.00/kg · renews {c.renewal}
              </p>
            </div>
            <span className="p-2 bg-surface-container-low rounded-lg text-primary">
              <span className="material-symbols-outlined">inventory_2</span>
            </span>
          </div>
          <div className="bg-surface-container-low/70 border border-outline-variant/40 rounded-xl p-3.5 flex items-end justify-between gap-2">
            <div>
              <span className="text-label-meta font-label-meta text-on-surface-variant">Remaining Balance</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className={`font-display-weight text-display-weight tabular-nums ${tone === 'over' ? 'text-error' : 'text-primary'}`}>{L.kg(c.balanceKg)}</span>
                <span className="text-label-numeric font-label-numeric text-outline font-bold">KG</span>
              </div>
              <span className="text-label-badge font-label-badge text-outline">{L.inr(Math.max(0, c.balanceKg) * pl.ratePerKg)}.00 stored value</span>
            </div>
            <div className="text-right space-y-1">
              <div className="text-body-sm font-body-sm text-on-surface-variant">
                Consumed: <span className="font-semibold text-on-surface tabular-nums">{L.kg(consumed)} kg</span>
              </div>
              <div className="text-body-sm font-body-sm text-secondary">
                Quota: <span className="font-semibold text-on-surface tabular-nums">{L.kg(pl.quotaKg)} kg</span>
              </div>
              <div className="text-label-meta font-label-meta text-outline">Plan price: {L.inr(pl.quotaKg * pl.ratePerKg)}</div>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-body-sm font-body-sm">
              <span className="text-secondary font-medium">Consumption Quota</span>
              <span className={`font-semibold tabular-nums ${usedPct > 80 ? 'text-error' : 'text-primary'}`}>{L.kg((consumed / pl.quotaKg) * 100, 1)}% used</span>
            </div>
            <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden flex">
              <div className={`h-full rounded-full transition-all duration-500 ${usedPct > 80 ? 'bg-error' : 'bg-primary'}`} style={{ width: `${usedPct}%` }}></div>
            </div>
          </div>
          {tone !== 'ok' && (
            <div className="flex items-center gap-2 p-2.5 bg-error-container/60 border border-error/30 rounded-lg text-on-error-container">
              <span className="material-symbols-outlined text-error text-[20px]">bolt</span>
              <div className="text-body-sm font-body-sm font-medium leading-tight">
                <span className="font-bold">{tone === 'over' ? 'Quota exceeded — excess is billable' : 'Low Balance Warning'}</span> (&lt; {L.LOW_KG} kg threshold)
              </div>
            </div>
          )}
          <button onClick={() => s.act.renewPackage(c.id)} className="w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-body-lg font-semibold border border-primary/20 active:scale-[0.98] transition-all duration-150" type="button">
            <span className="material-symbols-outlined text-[20px]">add_circle</span> + Renew / Add Package (+{pl.quotaKg} kg)
          </button>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">history_toggle_off</span>
              <h3 className="text-headline-sm font-headline-sm text-on-surface tracking-tight">Ledger Audit History</h3>
            </div>
            <span className="text-label-meta font-label-meta text-secondary font-medium uppercase tracking-wider bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant/30">Append-Only (BR-03)</span>
          </div>
          <div className="space-y-2.5">
            {entries.map((e) => {
              const credit = e.deltaKg > 0;
              return (
                <article key={e.id} className={`rounded-xl p-3.5 shadow-sm border flex items-start justify-between relative overflow-hidden ${e.kind === 'adjust' ? 'border-primary/40 bg-gradient-to-r from-surface-container-low/40 to-surface-container-lowest' : 'bg-surface-container-lowest border-outline-variant/40'}`}>
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${STRIPE[e.kind]}`}></div>
                  <div className="space-y-1 pl-1 pr-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-label-numeric text-label-numeric font-semibold ${e.kind === 'adjust' ? 'text-primary font-bold' : 'text-on-surface'}`}>{e.kind === 'intake' || e.kind === 'adjust' ? e.ref : e.title}</span>
                      <span className={`px-2 rounded text-label-meta font-label-meta ${e.kind === 'adjust' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold' : 'bg-surface-container text-on-surface-variant'}`}>{KIND_LABEL[e.kind]}</span>
                      <span className="text-body-sm font-body-sm text-outline">{e.at}</span>
                    </div>
                    {e.note && <p className="text-body-sm font-body-sm text-on-surface-variant leading-snug">{e.note}</p>}
                    <p className="text-body-sm font-body-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-outline">badge</span> {e.by}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-label-numeric font-label-numeric font-bold tabular-nums ${credit ? 'text-tertiary' : 'text-error'}`}>
                      {credit ? '+' : ''}
                      {L.kg(e.deltaKg)} kg
                    </span>
                    <div className="text-body-sm font-body-sm text-secondary tabular-nums">
                      Bal: <span className="font-semibold text-on-surface">{L.kg(e.balanceAfter)} kg</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <aside className="fixed bottom-16 inset-x-0 z-40 bg-surface-container-lowest/90 backdrop-blur-md px-4 py-2.5 max-w-md mx-auto shadow-[0_-4px_12px_rgba(15,23,42,0.06)] border-t border-outline-variant/30">
        <div className="grid grid-cols-5 gap-2">
          <button onClick={() => go('cart', 'intake')} className="col-span-3 h-12 rounded-lg bg-primary text-on-primary font-body-sm font-semibold flex items-center justify-center gap-1.5 px-2 shadow hover:bg-primary-container active:scale-[0.98] transition-all duration-150" type="button">
            <span className="material-symbols-outlined text-[18px]">scale</span>
            <span className="text-body-sm font-semibold leading-tight text-center">+ Record Intake for {c.name.split(' ')[0]}</span>
          </button>
          <button
            onClick={() => {
              s.setSearchHandoff(c.id);
              go('cart', 'orders');
            }}
            className="col-span-2 h-12 rounded-lg bg-surface-container text-on-surface font-body-sm font-medium flex items-center justify-center gap-1 px-2 border border-outline-variant/30 hover:bg-surface-container-high active:scale-[0.98] transition-all duration-150"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">receipt_long</span>
            <span className="text-body-sm font-medium">View Orders</span>
          </button>
        </div>
      </aside>
    </>
  );
}
