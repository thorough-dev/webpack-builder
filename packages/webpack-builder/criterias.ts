import { WebpackConfig } from './builder-base';

export type IfCriteriaFunc = (c: WebpackConfig) => boolean;

// TODO(now) Document
export const modeIs = (mode: WebpackConfig['mode']) => (
  c: WebpackConfig
) => c.mode === mode;
