import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import handlebars from 'rollup-plugin-handlebars-plus';
import sass from 'rollup-plugin-sass';

const ENV = {
  DEV: 'development',
  PROD: 'production',
};

export default {
  input: 'src/scripts/main.js',
  output: {
    format: 'iife',
    sourcemap: process.env.NODE_ENV !== ENV.PROD,
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
    sass({
      output: 'build/css/bundle.css',
    }),
    handlebars({
      handlebars: {
        options: {
          sourceMap: process.env.NODE_ENV !== ENV.PROD,
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
    (process.env.NODE_ENV === ENV.PROD && uglify()),
  ],
};
