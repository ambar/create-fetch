import babel from '@rollup/plugin-babel'
import {terser} from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: [
      //
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'esm'},
    ],
    plugins: [babel()],
  },
  // ES build for unpkg CDN
  {
    input: 'src/index.js',
    output: {file: pkg.unpkg, format: 'esm'},
    plugins: [
      babel({
        babelrc: false,
        presets: [
          [
            '@babel/preset-env',
            {
              loose: true,
              bugfixes: true,
              // https://github.com/babel/preset-modules
              // https://babeljs.io/docs/en/babel-preset-env#targetsesmodules
              targets: {esmodules: true},
            },
          ],
        ],
        plugins: [
          [
            '@babel/plugin-proposal-object-rest-spread',
            {loose: true, useBuiltIns: true},
          ],
        ],
      }),
      terser(),
    ],
  },
]
