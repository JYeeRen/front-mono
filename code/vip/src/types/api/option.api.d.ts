import '@app/infra';
import { IdValOption } from '..';

declare module '@app/infra' {
  interface Register {
    '/api/option/getBase': {
      res: {
        settlementMethods: IdValOption;
        addressType: IdValOption;
        vipOrderListType: IdValOption;
      };
    };
  }
}


