import merge               from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import typescript          from '@rollup/plugin-typescript';

const baseConfig = createSpaConfig();

export default merge(baseConfig, {
  input:   './src/index.html',
  plugins: [typescript()],
});


/*
import commonjs from '@rollup/plugin-commonjs';
import resolve    from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-ts';
import pkg        from './package.json';

const input        = 'src/index.ts';
const tsconfig     = 'tsconfig.json';
const production = false;  //process?.env?.NODE_ENV === 'production';
const browserslist = pkg.browserslist[process.env?.NODE_ENV];

const keys = (deps) =>
  (deps == null ? [] : Object.keys(deps).map((dep) => new RegExp(`^${dep}`)));

const rollup = [
  {
    external: [...keys(pkg.dependencies), ...keys(pkg.peerDependencies)],
    input,
    output:   [
      {
        exports:   'auto',
        file:      pkg.main,
        format:    'cjs',
        sourcemap: production,
      },
      {
        file:      pkg.module,
        format:    'esm',
        sourcemap: production,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        browserslist,
        transpiler: 'babel',
        tsconfig,
      }),
      production
      && terser({
        output: {
          comments: false,
        },
      }),
    ],
    watch: {
      clearScreen: false,
    },
  },
  // {
  //   external: keys(pkg.peerDependencies),
  //   input,
  //   output:   {
  //     file:      pkg.browser,
  //     format:    'umd',
  //     sourcemap: production,
  //   },
  //   plugins: [
  //     resolve({
  //       // browser: true,
  //     }),
  //     commonjs(),
  //     typescript({
  //       browserslist,
  //       name:       'template',
  //       transpiler: 'babel',
  //       tsconfig,
  //     }),
  //     production
  //       && terser({
  //         output: {
  //           comments: false,
  //         },
  //       }),
  //   ],
  //   watch: {
  //     clearScreen: false,
  //   },
  // },
];

export default rollup;
*/
