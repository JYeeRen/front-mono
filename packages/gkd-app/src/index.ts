import { App as InternalApp } from './app';

import { bootstrap } from './bootstrap';

export * as Feedback from './antd-feedback-register';

export * from '@gkd/api';

export * from '@gkd/store';

export * from '@gkd/djs';


type InternalAppType = typeof InternalApp;

type CompoundedComponent = InternalAppType & {
  bootstrap: typeof bootstrap;
}

const App = InternalApp as CompoundedComponent;

App.bootstrap = bootstrap;

export { App };