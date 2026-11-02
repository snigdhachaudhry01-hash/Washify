import type { ComponentType } from 'react';
import { useStore, type Mode } from './store';
import { Toaster, useRoute, ViewSwitcher } from './ui';
import { CartNav, DesktopShell, OpsNav, PhoneFrame } from './shells';
import Dashboard from './pages/desktop/Dashboard';
import IntakeStation from './pages/desktop/IntakeStation';
import Delivery from './pages/desktop/Delivery';
import Accounts from './pages/desktop/Accounts';
import Reports from './pages/desktop/Reports';
import Packages from './pages/ops/Packages';
import OwnerHome from './pages/ops/OwnerHome';
import StaffHome from './pages/ops/StaffHome';
import OpsIntake from './pages/ops/OpsIntake';
import OpsDispatch from './pages/ops/OpsDispatch';
import Analytics from './pages/ops/Analytics';
import CartDashboard from './pages/cart/CartDashboard';
import CartIntake from './pages/cart/CartIntake';
import CartDelivery from './pages/cart/CartDelivery';
import CartOrders from './pages/cart/CartOrders';
import CartLedger from './pages/cart/CartLedger';

const DESKTOP: Record<string, ComponentType> = {
  dashboard: Dashboard,
  intake: IntakeStation,
  delivery: Delivery,
  accounts: Accounts,
  packages: () => <Packages wide />,
  reports: Reports,
};
const OPS: Record<string, ComponentType> = { intake: OpsIntake, dispatch: OpsDispatch, packages: Packages, analytics: Analytics };
const CART: Record<string, ComponentType> = { dashboard: CartDashboard, intake: CartIntake, delivery: CartDelivery, orders: CartOrders, customers: CartLedger };

export default function App() {
  const [mode, page] = useRoute();
  const { role } = useStore();
  const Home = role === 'owner' ? OwnerHome : StaffHome;
  const views: Record<Mode, () => JSX.Element> = {
    desktop: () => {
      const Page = DESKTOP[page];
      return (
        <DesktopShell page={page}>
          <Page />
        </DesktopShell>
      );
    },
    ops: () => {
      const Page = page === 'home' ? Home : OPS[page];
      return (
        <PhoneFrame>
          <Page />
          <OpsNav page={page} />
        </PhoneFrame>
      );
    },
    cart: () => {
      const Page = CART[page];
      return (
        <PhoneFrame>
          <Page />
          <CartNav page={page} />
        </PhoneFrame>
      );
    },
  };
  return (
    <>
      {views[mode]()}
      {mode !== 'desktop' && <ViewSwitcher mode={mode} />}
      <Toaster />
    </>
  );
}
