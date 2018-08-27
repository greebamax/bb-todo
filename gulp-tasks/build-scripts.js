const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { uglify } = require('rollup-plugin-uglify');
const replace = require('rollup-plugin-replace');
const alias = require('rollup-plugin-alias');

const { resolve } = require('path');
const { ENV } = require('./helpers');

module.exports = async ({ isProd }, callback) => {
  const bundle = await rollup.rollup({
    input: 'src/scripts/main.js',
    plugins: [
      alias({
        handlebars: resolve('node_modules/handlebars/dist/handlebars.min.js'),
        underscore: resolve('node_modules/lodash/index.js'),
        base: resolve('src/scripts/base'),
      }),
      nodeResolve({
        browser: true,
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
      (isProd && uglify()),
    ],
  });

  await bundle.write({
    format: 'iife',
    sourcemap: !isProd,
    file: 'build/js/bundle.js',
  });

  callback();
};
