import { App as InternalApp } from './app';

import { bootstrap } from './bootstrap';

export { message, notification, modal } from '@gkd/components';

export * from '@gkd/api';

export * from '@gkd/store';

export * from '@gkd/djs';

export * from '@gkd/i18n';

type InternalAppType = typeof InternalApp;

type CompoundedComponent = InternalAppType & {
  bootstrap: typeof bootstrap;
}

const App = InternalApp as CompoundedComponent;

App.bootstrap = bootstrap;

export { App };