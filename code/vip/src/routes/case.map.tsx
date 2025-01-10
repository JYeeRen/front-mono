import { createFileRoute } from '@tanstack/react-router'
import { MapComponent } from '@features/case/map/map.component'

export const Route = createFileRoute('/case/map')({
  component: MapComponent,
})
