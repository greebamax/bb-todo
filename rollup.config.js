import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/scripts/main.js',
  dest: 'build/js/bundle.js',
  sourceMap: true,
  plugins: [
    resolve(),
  ]
};
