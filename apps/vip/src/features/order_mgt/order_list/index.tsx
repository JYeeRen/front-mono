import { createLazyRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyRoute('/order_mgt/order_list')({
  component: OrderListComponent,
});

export function OrderListComponent() {
  return (
    <>
      <h1>OrderList</h1>
      <Outlet />
    </>
  );
}
