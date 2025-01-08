import { createFileRoute } from '@tanstack/react-router'
import { Map } from '@features/case/map/map.component'

export const Route = createFileRoute('/case/map')({
  component: Map,
})
