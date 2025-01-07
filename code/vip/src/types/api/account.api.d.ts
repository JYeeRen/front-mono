import '@app/infra';

declare module '@app/infra' {
  interface Register {
    '/api/account/login': {
      params: {
        account: string;
        password: string;
      }
      res: Schema.User;
    };
    '/api/account/logout': undefined;
    '/api/account/forgotPassword': {
      params: {
        account: string;
        email: string;
      }
    }
    '/api/account/changePassword': {
      params: {
        oldPassword: string;
        newPassword: string;
      }
    }

  }
}


