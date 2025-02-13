import { createLazyRoute } from '@tanstack/react-router';

export const Route = createLazyRoute('/address_book/')({
  component: AddressBookComponent,
});

export function AddressBookComponent() {
  return (
    <>
      <h1>Address Book</h1>
    </>
  );
}
