const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const replace = require('rollup-plugin-replace');
const handlebars = require('rollup-plugin-handlebars-plus');
const alias = require('rollup-plugin-alias');
const { resolve } = require('path');

const ENV = {
  DEV: 'development',
  PROD: 'production',
};

module.exports = async ({ isProd }) => {
  const bundle = await rollup.rollup({
    input: 'src/scripts/main.js',
    plugins: [
      alias({
        underscore: resolve('node_modules/lodash/index.js'),
        base: resolve('src/scripts/base'),
      }),
      nodeResolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs({
        include: 'node_modules/**',
        sourceMap: true,
      }),
      handlebars({
        handlebars: {
          options: {
            sourceMap: !isProd,
          },
        },
        jquery: 'jquery',
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        exclude: 'node_modules/**',
        __ENV__: JSON.stringify(process.env.NODE_ENV || ENV.DEV), // `development` by default
      }),
      (isProd && uglify()),
    ],
  });

  await bundle.write({
    format: 'iife',
    sourcemap: !isProd,
    file: 'build/js/bundle.js',
  });
};
