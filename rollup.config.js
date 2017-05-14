import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/scripts/main.js',
  dest: 'build/js/bundle.js',
  sourceMap: true,
  format: 'iife',
  external: ['jquery'],
  globals: {
    backbone: 'Backbone',
    underscore: '_',
    jquery: '$',
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
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
