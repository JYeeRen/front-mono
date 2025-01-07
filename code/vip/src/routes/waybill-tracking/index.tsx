import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/waybill-tracking/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/waybill-tracking/"!</div>
}
