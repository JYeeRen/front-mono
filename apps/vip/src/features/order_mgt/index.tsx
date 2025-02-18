import { createLazyRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyRoute('/order_mgt')({
  component: OrderMGTComponent,
});

export function OrderMGTComponent() {
  return (
    <>
      <h1>OrderMGT</h1>
      <Outlet />
    </>
  );
}
