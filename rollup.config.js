import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'core/orbital.js',
  output: {
    file: 'dist/orbital.js',
    format: 'iife',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
