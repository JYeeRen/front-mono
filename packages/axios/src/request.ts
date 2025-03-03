import axios from 'axios';
import { instance } from './instance';
import type { Body, Params, ReqConfig, URLs } from './type';

async function post<URL extends URLs>(
  url: URL,
  data?: Body<URL>['data'],
  config?: ReqConfig<URL>,
) {
  return await instance.request({
    method: 'POST',
    url: url,
    data: data,
    ...config,
  });
}

async function get<URL extends URLs>(
  url: URL,
  data?: Params<URL>['params'],
  config?: ReqConfig<URL>,
) {
  return await instance.request({
    method: 'GET',
    url: url,
    data: data,
    ...config,
  });
}

async function browserDownload(url: string, fileName: string) {
  const res = await axios.get(url, {
    responseType: 'blob',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  const blob = res.data;
  if (!(blob instanceof Blob)) throw new Error('blob');

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  if (fileName) {
    link.download = fileName;
  }
  link.click();
  window.URL.revokeObjectURL(link.href);
}

export { post, get, browserDownload };
