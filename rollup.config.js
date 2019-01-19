import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

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
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};
