import typescript from 'rollup-plugin-typescript2'
import {terser} from 'rollup-plugin-terser'
import pkg from './package.json'

const source = 'src/index.ts'

export default [
  {
    input: source,
    output: [
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'esm'},
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            // preserve object spread
            target: 'ES2018',
          },
        },
      }),
    ],
  },
  // Modern ESM build for unpkg CDN, and script[type=module]
  {
    input: source,
    output: {file: pkg.unpkg, format: 'esm'},
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            // transpile object spread
            target: 'ES2017',
            declaration: false,
          },
        },
      }),
      terser({
        output: {comments: false},
      }),
    ],
  },
]
