import { createLazyRoute } from '@tanstack/react-router';

export const Route = createLazyRoute('/dashboard/')({
  component: DashboardComponent,
});

export function DashboardComponent() {
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}
