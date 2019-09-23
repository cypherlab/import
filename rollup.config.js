const pro = process.env.NODE_ENV == 'production'
const dev = process.env.NODE_ENV == 'dev'

import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default [
    {
      input: 'src/index.js',
      output: {
        file: 'dist/index.esm.js',
        format: 'es'      
      },
      plugins: [
        babel(),
        resolve(),
        commonjs(),
        terser(),
      ]
    },
    {
      input: 'src/index.js',
      output: {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'ImportUtils'     
      },
      plugins: [
        babel(),
        resolve(),
        commonjs(),
        terser(),
      ]
    }
]