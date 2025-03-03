import type { CreateAxiosDefaults } from 'axios';

export function createAxiosConfig(
  config: Partial<CreateAxiosDefaults>,
): CreateAxiosDefaults {
  const TEN_SECONDS = 10 * 1000;

  const axiosConfig: CreateAxiosDefaults = {
    timeout: TEN_SECONDS,
  };

  Object.assign(axiosConfig, config);

  return axiosConfig;
}
