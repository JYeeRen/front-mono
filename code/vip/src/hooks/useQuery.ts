import { useQuery as useReactQuery } from '@tanstack/react-query';
import { net, type Net } from '@app/infra';

export function useQuery<URL extends Net.URLs>(url: URL, ...args: Net.OptionalParams<URL>) {

  const queryFn = async () => await net.post(url, ...args);

  const query = useReactQuery({ queryKey: [url, args[0]], queryFn });
  if (query.isError) {
    throw query.error;
  }
  return query.data!;
}
