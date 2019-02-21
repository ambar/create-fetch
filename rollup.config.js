import babel from 'rollup-plugin-babel'
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
    output: {file: pkg.unpkg, format: 'esm', indent: false},
    plugins: [
      babel({
        babelrc: false,
        presets: [
          [
            '@babel/preset-env',
            {
              loose: true,
              useBuiltIns: 'entry',
              targets: {
                // https://caniuse.com/#search=modules
                browsers: ['Chrome 61', 'Firefox 60', 'Safari 10.1'],
              },
            },
          ],
        ],
      }),
      terser(),
    ],
  },
]
