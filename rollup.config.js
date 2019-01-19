import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    // format: 'cjs',
    name: 'durationFormat',
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};
