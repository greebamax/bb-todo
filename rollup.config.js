import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/scripts/main.js',
  dest: 'build/js/bundle.js',
  sourceMap: true,
  format: 'es',
  external: [ 'backbone' ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
