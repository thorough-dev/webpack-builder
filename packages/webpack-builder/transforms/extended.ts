/**
 * This file contains helpful transform functions that are not specifically
 * part of Webpack itself but are extremely commonly used with Webpack.
 */

import { WebpackConfig } from '../builder-base';

/**
 * Allows easily setting the `webpack-dev-server` settings.
 */
export function setDevServer(devServer: WebpackConfig['devServer']) {
  return (c: WebpackConfig) => ({
    ...c,
    devServer: { ...(c.devServer || {}), ...devServer }
  });
}
