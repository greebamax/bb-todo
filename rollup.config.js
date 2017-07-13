import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import handlebars from 'rollup-plugin-handlebars-plus';

const ENV = {
  DEV: 'development',
  PROD: 'production',
};

export default {
  entry: 'src/scripts/main.js',
  dest: 'build/js/bundle.js',
  sourceMap: process.env.NODE_ENV !== ENV.PROD,
  format: 'iife',
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
      ENV: JSON.stringify(process.env.NODE_ENV || ENV.DEV),
    }),
    (process.env.NODE_ENV === ENV.PROD && uglify()),
  ],
};
