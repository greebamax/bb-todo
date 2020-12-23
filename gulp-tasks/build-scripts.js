const { join } = require('path');
const { rollup } = require('rollup');
const alias = require('@rollup/plugin-alias');
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const inject = require('@rollup/plugin-inject');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const { terser } = require('rollup-plugin-terser');
const { ENV, PATH } = require('./helpers.js');

module.exports = async ({ isProd }) => {
  const bundle = await rollup({
    input: join(PATH.SRC, 'scripts', 'main.js'),
    plugins: [
      alias({
        entries: {
          base: join(PATH.SRC, 'scripts', 'base'),
          common: join(PATH.SRC, 'scripts', 'common'),
          handlebars: join(
            PATH.ROOT,
            'node_modules',
            'handlebars',
            'dist',
            'handlebars.min.js',
          ),
          helpers: join(PATH.SRC, 'scripts', 'helpers'),
          underscore: join(PATH.ROOT, 'node_modules', 'lodash', 'index.js'),
        },
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
        babelHelpers: 'bundled',
      }),
      replace({
        exclude: 'node_modules/**',
        __ENV__: JSON.stringify(isProd ? ENV.PROD : ENV.DEV),
      }),
      inject({
        jQuery: 'jquery',
        $: 'jquery',
      }),
      isProd && terser(),
    ],
    treeshake: !isProd,
  });

  return bundle.write({
    format: 'iife',
    sourcemap: !isProd,
    file: join(PATH.DEST, 'js', 'bundle.js'),
  });
};
