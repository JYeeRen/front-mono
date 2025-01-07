import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/address-book/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/address-book/"!</div>
}
