import { useQuery } from '@tanstack/react-query';
import { net, PostOptions, URLs } from '../net';

export { useQuery } from '@tanstack/react-query';

/**
 * 获取服务器状态
 */
export function useRemoteQuery<Url extends URLs>(options: PostOptions<Url>) {
  const queryKey = [options.url, options.data];
  const queryFn = async () => await net.post(options);
  const query = useQuery({ queryFn, queryKey });
  return query;
}
