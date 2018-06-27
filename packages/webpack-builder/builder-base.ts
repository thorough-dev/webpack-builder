import * as webpack from 'webpack';
import * as path from 'path';
import { log } from './logger';
import { IfCriteriaFunc, modeIs } from './criterias';

import {
  addEntry,
  addPlugin,
  IF,
  setMode,
  TransformFunc,
  pipe
} from './transforms';

export type WebpackConfig = webpack.Configuration;

const BASE_CONFIGURATION: WebpackConfig = {
  mode: 'development'
};

export class WebpackBuilder {
  constructor(protected config = BASE_CONFIGURATION) {}

  /**
   * Logs the current config object to the console for debugging purposes
   * and returns builder as-is for additional chaining.
   */
  tap() {
    log('Current Config:', this.build(), '\n');
    return this;
  }

  // TODO(now) Document
  let(transformFunc: TransformFunc) {
    return new WebpackBuilder(transformFunc(this.config));
  }

  // TODO(now) Document
  pipe(...transformFuncs: TransformFunc[]) {
    return this.let(pipe(...transformFuncs));
  }

  // TODO(now) Document
  setProductionIf(criteria: IfCriteriaFunc) {
    return this.if(criteria, [setMode('production')]);
  }

  // TODO(now) Document
  addPlugin(plugin: webpack.Plugin) {
    return this.let(addPlugin(plugin));
  }

  // TODO(now) Document
  addEntry(name: string, entrypoint: string | string[]) {
    return this.let(addEntry(name, entrypoint));
  }

  // TODO(now) Document
  mergeSetObject<T extends keyof WebpackConfig>(
    key: T,
    value: WebpackConfig[T]
  ) {
    return new WebpackBuilder({
      ...this.config,
      [key]: {
        ...((this.config[key] || {}) as object),
        ...(value as object)
      }
    });
  }

  // TODO(now) Document
  set(key: keyof WebpackConfig, value: any) {
    // TODO This will let you set anything to the key, even if it's not
    // valid.
    return new WebpackBuilder({
      ...this.config,
      [key]: value
    });
  }

  // TODO(now) Document
  setMode(mode: WebpackConfig['mode']) {
    return this.let(setMode(mode));
  }

  // TODO(now) Document
  setBuildDirectory(directoryPath) {
    return this.setOutput({
      path: path.resolve(process.cwd(), directoryPath)
    });
  }

  // TODO(now) Document
  setOutput(output: Partial<WebpackConfig['output']>) {
    return this.mergeSetObject('output', output);
  }

  /**
   * Use this function to modify your WebpackBuilder instance
   * conditionally. The `transformFunc` is only applied to the
   * `WebpackBuilder` if the `criteriaFunc` returns truthy.
   *
   * @param criteriaFunc A function which accepts a Webpack configuration
   * and returns a Boolean.
   * @param transformFunc A function which accepts a WebpackBuilder object
   * and returns a new one.
   */
  if(criteriaFunc: IfCriteriaFunc, transformFuncs: TransformFunc[]) {
    return this.let(IF(criteriaFunc, transformFuncs));
  }

  /**
   * A convenience method to allow you to vary your configuration depending
   * on the Webpack mode your configuration is in.
   *
   * @param mode Webpack mode you wish to check for.
   * @param transformFuncs An array of transforms to apply if the Webpack
   * mode is equal to `mode`.
   */
  ifMode(mode: WebpackConfig['mode'], transformFuncs: TransformFunc[]) {
    return this.if(modeIs(mode), transformFuncs);
  }

  /**
   * Returns the currently configured `WebpackConfig` object.
   */
  build() {
    return this.config;
  }
}
