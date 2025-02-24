import { createLazyRoute } from '@tanstack/react-router';
import styles from './address_book.module.less';

export const Route = createLazyRoute('/address_book')({
  component: AddressBookComponent,
});

export function AddressBookComponent() {
  return (
    <>
      <h1 className={styles.header}>Address Book</h1>
    </>
  );
}
