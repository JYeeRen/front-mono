import { logger, net, storage } from '@app/infra';
  // import { createStore } from 'zustand/vanilla';
// import { persist, createJSONStorage } from 'zustand/middleware';

// interface _Auth {
//   account: string;
//   user: Schema.User | null;
//   login: (account: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

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

// export const authService = createStore(
//   persist<_Auth>(
//     (set) => ({
//       user: null,
//       account: '',
//       login: async (account, password) => {
//         const user = await net.post('/api/account/login', {
//           account,
//           password,
//         });
//         set({ account, user });
//       },
//       logout: async () => {
//         await net.post('/api/account/logout');
//         set({ account: '', user: null });
//       },
//     }),
//     {
//       name: 'auth',
//       storage: createJSONStorage(() => ({
//         getItem: (name) => storage.store.get(name),
//         setItem: (name, value) => storage.store.set(name, value),
//         removeItem: (name) => storage.store.remove(name),
//       })),
//     },
//   ),
// );
