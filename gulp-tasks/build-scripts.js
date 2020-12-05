const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const replace = require('rollup-plugin-replace');
const alias = require('rollup-plugin-alias');
const inject = require('rollup-plugin-inject');

const { join } = require('path');
const { ENV, PATH } = require('./helpers');

module.exports = async ({ isProd }) => {
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
