import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order-mgt/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/order-mgt/"!</div>
}
