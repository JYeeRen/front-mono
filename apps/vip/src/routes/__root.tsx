import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link preload={false} to="/" className="[&.active]:font-bold">
          Home
        </Link>{' | '}
        <Link preload={false} to="/address_book" className="[&.active]:font-bold">
          AddressBook
        </Link>{' | '}
        <Link preload={false} to="/dashboard" className="[&.active]:font-bold">
          Dashboard
        </Link>{' | '}
        <Link preload={false} to="/financial" className="[&.active]:font-bold">
          Financial
        </Link>{' | '}
        <Link preload={false} to="/order_mgt" className="[&.active]:font-bold">
          OrderMGT
        </Link>{' | '}
        <Link preload={false} to="/waybill_tracking" className="[&.active]:font-bold">
          Waybill Tracking
        </Link>{' | '}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );

}

export const Route = createRootRoute({
  component: RootComponent,
});
