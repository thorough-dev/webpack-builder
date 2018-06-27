import { WebpackConfig } from '../builder-base';

// TODO(now) Document
export function setResolve(resolve: WebpackConfig['resolve']) {
  return (c: WebpackConfig) => ({
    ...c,
    resolve: {
      ...(c.resolve || {}),
      ...resolve
    }
  });
}

// TODO(now) Document
export function addResolveExtension(extension: string) {
  return (c: WebpackConfig) => {
    // Get any existing extensions defined.
    const existingExtensions = (c.resolve || {}).extensions || [];

    // Determine what the new `extensions` should be set to. If `extension`
    // is already included just set it equal to what it already is. If
    // `extension` is not included append it to the list to be set.
    const extensions = existingExtensions.includes(extension)
      ? existingExtensions
      : [...existingExtensions, extension];

    return setResolve({ extensions })(c);
  };
}
