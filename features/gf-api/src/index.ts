import { createRequest } from '@repo/axios';

interface ApiSuccess<T = unknown> {
  code: 0;
  data: T;
  msg?: string;
}

interface ApiError<T = unknown> {
  code: number;
  data: T;
  msg?: string;
}

export async function init(baseURL: string) {
  const request = createRequest<ApiSuccess>({
    baseURL
  })

  const res = await request({ url: 'api/noParams' });
  res.data;
}