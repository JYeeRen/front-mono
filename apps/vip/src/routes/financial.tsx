import { FinancialComponent } from '@features/financial'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/financial')({
  component: FinancialComponent,
})
