import { createLazyRoute } from '@tanstack/react-router';

export const Route = createLazyRoute('/financial')({
  component: FinancialComponent,
});

export function FinancialComponent() {
  return (
    <>
      <h1>Financial</h1>
    </>
  );
}
