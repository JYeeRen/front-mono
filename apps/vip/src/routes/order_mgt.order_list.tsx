import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order_mgt/order_list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/order_mgt/list"!</div>
}
