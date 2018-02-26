import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import handlebars from 'rollup-plugin-handlebars-plus';
import sass from 'rollup-plugin-sass';
import copy from 'rollup-plugin-copy';

const ENV = {
  DEV: 'development',
  PROD: 'production',
};
const isProd = process.env.NODE_ENV === ENV.PROD;

export default {
  input: 'src/scripts/main.js',
  output: {
    format: 'iife',
    sourcemap: !isProd,
    file: 'build/js/bundle.js',
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      include: 'node_modules/**',
      sourceMap: true,
    }),
    copy({
      'src/index.html': 'build/index.html',
    }),
    sass({
      output: 'build/css/bundle.css',
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
};
