const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { uglify } = require('rollup-plugin-uglify');
const replace = require('rollup-plugin-replace');
const handlebars = require('rollup-plugin-handlebars-plus');
const alias = require('rollup-plugin-alias');
const rootImport = require('rollup-plugin-root-import');
const { resolve } = require('path');
const { ENV } = require('./helpers');

const partialRoots = [
  `${process.cwd()}/src/scripts`,
  `${process.cwd()}/src/scripts/common/partials`,
];

module.exports = async ({ isProd }) => {
  const bundle = await rollup.rollup({
    input: 'src/scripts/main.js',
    plugins: [
      rootImport({
        useEntry: 'prepend',
        extensions: ['.js', '.hbs', '.json'],
        root: partialRoots,
      }),
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
        sourceMap: !isProd,
      }),
      handlebars({
        handlebars: {
          options: {
            sourceMap: !isProd,
          },
        },
        helpers: resolve('src/scripts/helpers/handlebars/index.js'),
        jquery: 'jquery',
        partialRoot: partialRoots,
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
};
