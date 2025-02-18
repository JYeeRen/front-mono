import { createLazyRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyRoute('/order_mgt/order_create')({
  component: OrderCreateComponent,
});

export function OrderCreateComponent() {
  return (
    <>
      <h1>OrderCreate</h1>
      <Outlet />
    </>
  );
}
