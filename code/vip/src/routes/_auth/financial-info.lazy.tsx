import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/financial-info')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/financial-info"!</div>
}
