import { WaybillTrackingComponent } from '@features/waybill_tracking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/waybill_tracking')({
  component: WaybillTrackingComponent,
})
