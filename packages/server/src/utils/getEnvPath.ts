export type Env =
  | 'development'
  | 'production'
  | 'localhost'
  | 'showcase'
  | 'hadyai'
  | 'endo'
  | 'chonburi';

export const getEnvPath = () => {
  const env = process.env.NODE_ENV as Env;
  switch (env) {
    case 'hadyai':
      console.log('local env from .env.hadyai')
      return '.env.hadyai';
    case 'chonburi':
      console.log('local env from .env.chonburi')
      return '.env.chonburi';
    case 'development':
      console.log('local env from .env.development')
      return '.env.development';
    case 'production':
      console.log('local env from .env.production')
      return '.env.production';
    case 'localhost':
      console.log('local env from .env.localhost')
      return '.env.localhost';
    case 'showcase':
      console.log('local env from .env.showcase')
      return '.env.showcase';
    case 'endo':
      console.log('local env from .env.endo')
      return '.env.endo';
    default:
      console.log('local env from .env.hadyai cause default')
      return '.env.hadyai';
    // console.log('env unreachable')
    // const _unreachable: never = env;
    // throw `Unexpected NODE_ENV value: ${_unreachable}`;
  }
};
