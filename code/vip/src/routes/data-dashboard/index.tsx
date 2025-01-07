import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/data-dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/data-dashboard/"!</div>
}
