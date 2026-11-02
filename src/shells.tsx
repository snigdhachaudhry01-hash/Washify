import { useState, type ReactNode } from 'react';
import { useStore } from './store';
import { go, href, ViewSwitcher } from './ui';

// Avatar used across the Stitch desktop screens (hosted by Stitch).
const OWNER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA9I7kjq_mTJJp2WBWQ9ogXJzDd6RmtVUHJ8qJZimjwPUxKy2Z9ZsElLWDe-3mWtq0qaK0_-jS_J6s471dRA22opjf65i6WSf97KlJ9R1vlSSLSFOq4qDIxgmlbDFcSFF3i-PoKo39-hDflbMZW9uSdHRrrKkJAYD33SEAdchmcBWPFuyeM2JY3QdHKffAoPJ5dAefSB7JZwZGdgFTlv3HZAYlj4Li6uu1_xDmUJnYCwGD2o8uD8EwL';

const DESKTOP_NAV: [string, string, string][] = [
  ['dashboard', 'Dashboard', 'dashboard'],
  ['intake', 'Intake Station', 'scale'],
  ['delivery', 'Delivery Management', 'local_shipping'],
  ['accounts', 'Customer Accounts & Ledgers', 'account_balance_wallet'],
  ['packages', 'Packages & Plans', 'inventory_2'],
  ['reports', 'Reports', 'bar_chart'],
];

const linkCls = 'flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-secondary hover:bg-surface-container-low hover:text-on-surface transition-colors font-medium';

export function DesktopShell({ page, children }: { page: string; children: ReactNode }) {
  const { stats, user, role, notYet, setSearchHandoff } = useStore();
  const [q, setQ] = useState('');
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface font-body-md antialiased selection:bg-primary selection:text-on-primary">
      {/* TopNavBar (Delivery Management screen) */}
      <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm top-0 sticky z-40 h-16 flex justify-between items-center w-full px-space-xl py-space-sm">
        <div className="flex items-center gap-6">
          <a href={href('desktop', 'dashboard')} className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">local_laundry_service</span>
            <span className="text-headline-sm font-headline-lg font-bold text-primary tracking-tight">Washify</span>
            <span className="hidden lg:flex bg-surface-container text-on-surface-variant font-label-meta text-label-meta px-2.5 py-1 rounded-full border border-outline-variant items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span> Shift Morning Active • Station 04
            </span>
          </a>
          {/* Universal Search Bar → Customer Accounts filter */}
          <form
            className="relative w-80 hidden md:block"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchHandoff(q);
              setQ('');
              go('desktop', 'accounts');
            }}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search customers"
              className="w-full pl-9 pr-4 py-1.5 text-body-sm font-body-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface placeholder:text-secondary"
              placeholder="Search customer name, ID or phone…"
              type="text"
            />
          </form>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-secondary">
            <button onClick={() => notYet('Notifications')} className="p-2 rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-all duration-150 active:scale-95 relative" title="Notifications">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button onClick={() => notYet('Shift schedule')} className="p-2 rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-all duration-150 active:scale-95" title="Schedule">
              <span className="material-symbols-outlined text-[22px]">schedule</span>
            </button>
            <ViewSwitcher mode="desktop" inline />
          </div>
          <a href={href('desktop', 'intake')} className="bg-primary hover:bg-primary-container text-on-primary font-body-md font-semibold px-4 py-2 rounded-lg transition-all duration-150 active:scale-95 flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">add</span> New Intake
          </a>
          <div className="h-6 w-px bg-outline-variant mx-1"></div>
          <div className="flex items-center gap-2.5 pl-1">
            {role === 'owner' ? (
              <img className="w-9 h-9 rounded-full object-cover border border-outline-variant" alt="" src={OWNER_AVATAR} />
            ) : (
              <div className="w-9 h-9 rounded-full bg-surface-container text-primary font-bold flex items-center justify-center border border-outline-variant">{user.initials}</div>
            )}
            <div className="hidden xl:block text-left">
              <p className="font-body-md font-semibold text-on-surface leading-tight">{user.name}</p>
              <p className="font-label-meta text-label-meta text-secondary">{user.title}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 w-full">
        {/* SideNavBar (outer column paints the full height; inner part stays pinned while scrolling) */}
        <div className="hidden md:block w-64 shrink-0 bg-surface-container-lowest border-r border-outline-variant">
        <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 flex flex-col justify-between p-space-md">
          <div className="space-y-4">
            <div className="px-2 py-2 border-b border-outline-variant pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">local_laundry_service</span>
                </div>
                <div>
                  <p className="font-headline-sm text-sm font-bold text-primary">Main Facility Hub</p>
                  <p className="font-label-meta text-label-meta text-secondary">Shift Active • Station 04</p>
                </div>
              </div>
              <a href={href('desktop', 'packages')} className="mt-3 w-full bg-surface-container-low hover:bg-surface-container text-primary font-body-sm font-semibold py-2 px-3 rounded-lg border border-outline-variant flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98]">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span> + New Package
              </a>
            </div>
            <nav className="space-y-1">
              {DESKTOP_NAV.map(([id, label, icon]) =>
                id === page ? (
                  <a key={id} aria-current="page" className="flex items-center justify-between gap-2 px-space-md py-space-sm rounded-lg bg-surface-container text-primary font-semibold transition-colors" href={href('desktop', id)}>
                    <span className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[20px] fill-1">{icon}</span>
                      <span className="font-body-md text-sm">{label}</span>
                    </span>
                    {id === 'delivery' && <span className="bg-primary text-on-primary font-label-badge text-[11px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap">{stats.ready.n} Ready</span>}
                  </a>
                ) : (
                  <a key={id} className={linkCls} href={href('desktop', id)}>
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    <span className="font-body-md text-sm">{label}</span>
                    {id === 'delivery' && <span className="ml-auto bg-primary-fixed text-on-primary-fixed font-label-badge text-label-badge px-2 py-0.5 rounded-full font-bold">{stats.ready.n}</span>}
                  </a>
                ),
              )}
            </nav>
          </div>
          <div className="space-y-1 pt-3 border-t border-outline-variant">
            <button onClick={() => notYet('Settings')} className={`${linkCls} w-full`}>
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="font-body-md text-sm">Settings</span>
            </button>
            <button onClick={() => notYet('Support')} className={`${linkCls} w-full`}>
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span className="font-body-md text-sm">Support</span>
            </button>
          </div>
        </aside>
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}

/** Mobile frame: full width on phones, a centred 448px column on larger screens. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-dim/50">
      <div className="relative w-full max-w-md mx-auto min-h-screen bg-background text-on-surface font-body-md text-body-md antialiased shadow-2xl">{children}</div>
    </div>
  );
}

const OPS_NAV: [string, string, string][] = [
  ['home', 'Home', 'home'],
  ['intake', 'Intake', 'scale'],
  ['dispatch', 'Dispatch', 'local_shipping'],
  ['packages', 'Packages', 'inventory_2'],
  ['analytics', 'Analytics', 'monitoring'],
];

/** Bottom nav of the Owner / Staff mobile screens. */
export function OpsNav({ page }: { page: string }) {
  const { stats } = useStore();
  return (
    <nav aria-label="Main Navigation" className="fixed bottom-0 inset-x-0 mx-auto max-w-md z-50 flex justify-around items-center h-16 px-gutter-mobile bg-inverse-surface">
      {OPS_NAV.map(([id, label, icon]) => {
        const active = id === page;
        return (
          <a
            key={id}
            href={href('ops', id)}
            aria-current={active ? 'page' : undefined}
            className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 active:scale-95 transition-colors duration-150 ${active ? 'text-primary-fixed font-semibold' : 'text-secondary-fixed-dim hover:text-primary-fixed-dim'}`}
          >
            {id === 'dispatch' && stats.ready.n > 0 && <span className="absolute -top-1 right-0 bg-primary text-on-primary text-[10px] font-bold px-1.5 rounded-full leading-tight">{stats.ready.n}</span>}
            <span className={`material-symbols-outlined text-[24px] ${active ? 'fill-1' : ''}`}>{icon}</span>
            <span className="text-label-meta font-label-meta">{label}</span>
            {active && <span className="w-4 h-0.5 bg-primary-fixed rounded-full mt-0.5"></span>}
          </a>
        );
      })}
    </nav>
  );
}

const CART_NAV: [string, string, string][] = [
  ['dashboard', 'Dashboard', 'dashboard'],
  ['intake', 'Intake', 'scale'],
  ['delivery', 'Delivery', 'fact_check'],
  ['orders', 'Orders', 'receipt_long'],
  ['customers', 'Customers', 'group'],
];

/** Bottom nav of the hostel-cart PWA screens. */
export function CartNav({ page }: { page: string }) {
  return (
    <nav aria-label="Main Navigation" className="fixed bottom-0 inset-x-0 mx-auto max-w-md z-50 flex justify-around items-center px-2 h-16 bg-on-surface shadow-lg">
      {CART_NAV.map(([id, label, icon]) => {
        const active = id === page;
        return (
          <a
            key={id}
            href={href('cart', id)}
            aria-current={active ? 'page' : undefined}
            className={`flex flex-col items-center justify-center min-h-[48px] flex-1 active:scale-95 transition-colors duration-150 ${active ? 'text-primary-fixed font-semibold' : 'text-secondary hover:text-surface-bright'}`}
          >
            <span className={`material-symbols-outlined text-[22px] ${active ? 'fill-1' : ''}`}>{icon}</span>
            <span className="text-label-badge font-label-badge text-[11px] mt-0.5">{label}</span>
            {active && <span className="w-1 h-1 rounded-full bg-primary-fixed mt-0.5"></span>}
          </a>
        );
      })}
    </nav>
  );
}
