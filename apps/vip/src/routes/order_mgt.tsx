import { OrderMGTComponent } from '@features/order_mgt'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order_mgt')({
  component: OrderMGTComponent,
})
