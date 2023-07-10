export type Env =
  | 'development'
  | 'production'
  | 'localhost'
  | 'showcase'
  | 'hadyai';

export const getEnvPath = () => {
  const env = process.env.NODE_ENV as Env;
  console.log(`NODE_ENV=${env}...`)
  switch (env) {
    case 'hadyai':
      return '.env.hadyai';
    case 'development':
      return '.env.development';
    case 'production':
      return '.env.production';
    case 'localhost':
      console.log('in')
      return '.env.localhost';
    case 'showcase':
      return '.env.showcase';
    default:
      return '.env.hadyai';
    // console.log('env unreachable')
    // const _unreachable: never = env;
    // throw `Unexpected NODE_ENV value: ${_unreachable}`;
  }
};
