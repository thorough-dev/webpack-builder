import * as webpack from 'webpack';
import { WebpackConfig } from '../builder-base';
import { IfCriteriaFunc } from '../criterias';

export type TransformFunc = (c: WebpackConfig) => WebpackConfig;

// TODO(now) Write tests for all of these

// TODO(now) Document
export function pipe(...transformFuncs: TransformFunc[]) {
  return (c: WebpackConfig) => transformPipe(c, ...transformFuncs);
}

// TODO(now) Document
export function transformPipe(
  config: WebpackConfig,
  ...transformFuncs: TransformFunc[]
) {
  return transformFuncs.reduce((prev, curr) => curr(prev), config);
}

// TODO(now) Convert to `function` style, Document
export const addPlugin = (p: webpack.Plugin) => (c: WebpackConfig) => ({
  ...c,
  plugins: [...(c.plugins || []), p]
});

// TODO(now) Document
export function addRule(r: webpack.RuleSetRule) {
  return (c: WebpackConfig): WebpackConfig => {
    const module = c.module || { rules: [] };

    return {
      ...c,
      module: {
        ...module,
        rules: [...module.rules, r]
      }
    };
  };
}

/**
 * Adds an entrypoint to the WebpackConfig.
 *
 * @param name Name of entry point.
 * @param path Relative path to the entrypoint's source file.
 */
export function addEntry(name: string, path: string | string[]) {
  return (c: WebpackConfig) => ({
    ...c,
    entry: { ...((c.entry as object) || {}), [name]: path }
  });
}

// TODO(now) Document
export function setMode(mode: WebpackConfig['mode']) {
  return (c: WebpackConfig) => ({ ...c, mode });
}

// TODO(now) Document
export function IF(criteria: IfCriteriaFunc, transforms: TransformFunc[]) {
  return (c: WebpackConfig) =>
    criteria(c) ? transformPipe(c, ...transforms) : c;
}
