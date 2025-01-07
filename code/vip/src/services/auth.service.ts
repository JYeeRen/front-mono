import { logger, net, storage } from '@app/infra';

class AuthService {
  user: Schema.User | null;

  constructor() {
    this.user = storage.get('user') ?? null;
  }

  async login(params: { account: string; password: string; remember: boolean }) {
    try {
      const user = await net.post('/api/account/login', params);
      this.user = user;
      storage.set('user', user);
      storage.set('token', user.token);
      storage.set('remember', params.remember);
      if (params.remember) {
        storage.set('account', params.account);
      }
    } catch (err) {
      logger.auth('login failed', err);
      throw err;
    }

  }

  async logout() {
    await net.post('/api/account/logout');

    this.user = null;
    storage.remove('token');
    storage.remove('remember');
    storage.remove('account');
    storage.remove('user');
  }
}

export const authService = new AuthService();
