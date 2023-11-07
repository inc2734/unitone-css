import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/library.js',
    output: {
      file: 'dist/library.js',
      format: 'cjs',
    },
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'runtime',
        exclude: "node_modules/**",
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
        ],
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      commonjs({
        requireReturnsDefault: 'esmExternals',
        extensions: ['.js', '.jsx'],
      }),
      terser(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'auto',
    },
    external:['react'],
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'runtime',
        exclude: "node_modules/**",
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
        ],
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      commonjs({
        requireReturnsDefault: 'esmExternals',
        extensions: ['.js', '.jsx'],
      }),
      terser(),
    ],
  },
  {
    input: 'src/app.js',
    output: {
      file: 'dist/app.js',
      format: 'cjs',
    },
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'runtime',
        exclude: "node_modules/**",
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
        ],
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      commonjs({
        requireReturnsDefault: 'esmExternals',
        extensions: ['.js', '.jsx'],
      }),
      terser(),
    ],
  },
];
