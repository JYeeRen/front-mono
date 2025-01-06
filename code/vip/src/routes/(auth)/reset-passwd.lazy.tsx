import { createLazyFileRoute } from '@tanstack/react-router'
import ResetPasswd from '@features/auth/reset-passwd/reset-passwd.component'

export const Route = createLazyFileRoute('/(auth)/reset-passwd')({
  component: ResetPasswd,
})
