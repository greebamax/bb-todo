import { join } from 'path';
import { rollup } from 'rollup';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import inject from 'rollup-plugin-inject';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { ENV, PATH } from './helpers.js';

export default async ({ isProd }) => {
  const bundle = await rollup({
    input: join(PATH.SRC, 'scripts', 'main.js'),
    plugins: [
      alias({
        base: join(PATH.SRC, 'scripts', 'base'),
        common: join(PATH.SRC, 'scripts', 'common'),
        handlebars: join(PATH.ROOT, 'node_modules', 'handlebars', 'dist', 'handlebars.min.js'),
        helpers: join(PATH.SRC, 'scripts', 'helpers'),
        underscore: join(PATH.ROOT, 'node_modules', 'lodash', 'index.js'),
      }),
      nodeResolve({
        browser: true,
        extensions: ['.js', '.json', '.tmpl'],
      }),
      commonjs({
        include: 'node_modules/**',
        sourceMap: !isProd,
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        exclude: 'node_modules/**',
        __ENV__: JSON.stringify(isProd ? ENV.PROD : ENV.DEV),
      }),
      inject({
        jQuery: 'jquery',
      }),
      (isProd && terser()),
    ],
    treeshake: !isProd,
  });

  return bundle.write({
    format: 'iife',
    sourcemap: !isProd,
    file: join(PATH.DEST, 'js', 'bundle.js'),
  });
};
