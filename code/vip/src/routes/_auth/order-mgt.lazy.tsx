import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/order-mgt')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/order-mgt"!</div>
}
