import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/financial-info/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/financial-info/"!</div>
}
