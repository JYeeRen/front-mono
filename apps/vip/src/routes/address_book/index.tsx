import { AddressBookComponent } from '@features/address_book';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/address_book/')({
  component: AddressBookComponent,
});

Route.name = 'AddressBook';
Route.permission = ['address_book'];
