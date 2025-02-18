import '@gkd/app';

declare module '@gkd/app' {
  interface Register {
    '/api/account/login': {
      params: { account: string; password: string };
      res: Schema.Account;
    }
  }
}