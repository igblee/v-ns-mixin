import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const path = require('path')

export default {
  input: {
    main: path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    format: 'es',
    dir: path.resolve(__dirname, 'dist'),
    name: 'vNSMixin',
    plugins: [terser(), ],
  },
  watch: {
    clearScreen: true,
    include: ['src/**', ],
  },
  plugins: [babel(), ],
}
