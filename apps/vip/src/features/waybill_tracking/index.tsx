import { createLazyRoute } from '@tanstack/react-router';

export const Route = createLazyRoute('/waybill_tracking')({
  component: WaybillTrackingComponent,
});

export function WaybillTrackingComponent() {
  return (
    <>
      <h1>Waybill Tracking</h1>
    </>
  );
}
