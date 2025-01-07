import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/address-book')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/address-book"!</div>
}
