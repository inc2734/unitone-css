import fs from 'node:fs';
import path from 'node:path';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const createConfig = ({ input, file, external = [], exports }) => ({
  input,
  output: {
    file,
    format: 'cjs',
    ...(exports ? { exports } : {}),
  },
  external,
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
});

const layoutPrimitivesDir = path.resolve('src/layout-primitives');
const behaviorsDir = path.resolve('src/behaviors');
const compatibilityDir = path.resolve('src/compatibility');

const fileEntries = (dir) => fs.readdirSync(dir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
  .map((entry) => entry.name)
  .sort();

const reactEntries = fs.readdirSync(layoutPrimitivesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => fs.existsSync(path.join(layoutPrimitivesDir, name, 'react.jsx')))
  .sort();

const behaviorEntries = fs.readdirSync(layoutPrimitivesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => fs.existsSync(path.join(layoutPrimitivesDir, name, 'behavior.js')))
  .sort();

const layoutPrimitiveRootEntries = fileEntries(layoutPrimitivesDir);
const sharedBehaviorEntries = fileEntries(behaviorsDir);
const compatibilityEntries = fileEntries(compatibilityDir);

export default [
  createConfig({
    input: 'src/library.js',
    file: 'dist/library.js',
  }),
  createConfig({
    input: 'src/app.js',
    file: 'dist/app.js',
  }),
  ...layoutPrimitiveRootEntries.map((fileName) =>
    createConfig({
      input: `src/layout-primitives/${fileName}`,
      file: `dist/layout-primitives/${fileName}`,
    }),
  ),
  ...sharedBehaviorEntries.map((fileName) =>
    createConfig({
      input: `src/behaviors/${fileName}`,
      file: `dist/behaviors/${fileName}`,
    }),
  ),
  ...compatibilityEntries.map((fileName) =>
    createConfig({
      input: `src/compatibility/${fileName}`,
      file: `dist/compatibility/${fileName}`,
    }),
  ),
  ...behaviorEntries.map((name) =>
    createConfig({
      input: `src/layout-primitives/${name}/behavior.js`,
      file: `dist/layout-primitives/${name}/behavior.js`,
    }),
  ),
  ...reactEntries.map((name) =>
    createConfig({
      input: `src/layout-primitives/${name}/react.jsx`,
      file: `dist/layout-primitives/${name}/react.js`,
      external: ['react'],
      exports: 'auto',
    }),
  ),
];
