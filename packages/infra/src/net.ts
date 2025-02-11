import axios, { Axios } from 'axios';
import { Args, Res, URLs } from './net.types';

class Net {
  client: Axios;

  constructor() {
    this.client = axios.create();
  }

  async post<URL extends URLs>(
    url: URL,
    ...args: Args<URL>
  ): Promise<Res<URL>> {
    const [data] = args;
    return this.client.post(url, data);
  }
}

const net = new Net();

net.post('api/noParams');
net.post('api/noRes', { str: 'str' });
net.post('api/both', { str: 'str' });
