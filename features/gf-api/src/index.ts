import { createInstance } from '@repo/axios';

export { net } from '@repo/axios';
export type { Api, Register } from '@repo/axios';

export function init(baseURL: string) {
  createInstance({
    baseURL,
    timeout: 0,
  });
}
