import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/waybill-tracking')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/waybill-tracking"!</div>
}
