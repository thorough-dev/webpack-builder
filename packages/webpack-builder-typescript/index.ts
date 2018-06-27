import {
  pipe,
  addRule,
  addResolveExtension
} from '@thorough/webpack-builder/transforms';

interface ITypeScriptConfig {
  loader?: string;
  tsx?: boolean;
  test?: string | RegExp;
  exclude?: RegExp;
}

export const addTypeScript = ({
  loader = 'awesome-typescript-loader',
  tsx = false
}: ITypeScriptConfig = {}) => {
  // Allow TSX files only if `tsx` is `true`.
  const test = tsx ? /\.tsx?$/ : /\.ts$/;

  return pipe(
    addRule({ test, loader }),
    addResolveExtension('.js'),
    tsx
      ? pipe(addResolveExtension('.ts'), addResolveExtension('.tsx'))
      : addResolveExtension('.ts')
  );
};
