import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/(auth)/login')({
  validateSearch: z.object({
    redirect: z.string().default('/'),
  }),
})
