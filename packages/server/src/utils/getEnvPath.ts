export type Env =
  | 'development'
  | 'production'
  | 'localhost'
  | 'showcase'
  | 'hadyai';

export const getEnvPath = () => {
  const env = process.env.NODE_ENV as Env;
  switch (env) {
    case 'hadyai':
      return '.env.hadyai';
    case 'development':
      return '.env.development';
    case 'production':
      return '.env.production';
    case 'localhost':
      return '.env.localhost';
    case 'showcase':
      return '.env.showcase';
    default:
      const _unreachable: never = env;
      throw `Unexpected NODE_ENV value: ${_unreachable}`;
  }
};
