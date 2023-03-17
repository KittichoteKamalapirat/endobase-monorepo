import { ObjectKeys } from '.';

const ENV = {
  showcase: 'showcase',
  hadyai: 'hadyai',
  development: 'development',
} as const;

export type EnvKey = ObjectKeys<typeof ENV>;

export const getEnvPath = (NODE_ENV: EnvKey) => {
  console.log('NODE_ENV', NODE_ENV);
  const envSuffix = ENV[NODE_ENV];
  const envPath = envSuffix ? `.env.${envSuffix}` : '.env';
  return envPath;
};
