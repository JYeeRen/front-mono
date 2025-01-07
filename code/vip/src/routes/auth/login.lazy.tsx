import { createLazyFileRoute } from '@tanstack/react-router'
import Login from '@features/auth/login/login.component'

export const Route = createLazyFileRoute('/auth/login')({
  component: Login,
})
