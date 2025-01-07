import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/data-dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/data-dashboard/lazt"!</div>
}
