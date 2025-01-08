import { Table } from '@features/case/table/table.component'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/case/table')({
  component: Table,
})
