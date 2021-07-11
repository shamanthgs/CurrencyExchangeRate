import { env } from './env';

export const isProduction = () => env.nodeEnv !== 'dev';
