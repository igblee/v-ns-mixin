import Vue from 'vue'
import ns, { namespaceMixin } from '../../../../dist/main'

Vue.use(ns)

export default namespaceMixin('test1', {
  data () {
    return {
      test1: 1,
    }
  },
  computed: {
    test2 () {
      return 'test2:' + this.test
    },
    test3: {
      get () {
        return 'test3:' + this.test
      },
      set (val) {
        this.test4(val)
        return val
      },
    },
  },
  watch: {
    test1: {
      deep: true,
      handler (value, old) {
        console.log('[app debug]: handler -> old', old)
        console.log('[app debug]: handler -> value', value)
      },
    },
    test2 (value, old) {
      console.log('[app debug]: handler -> old', old)
      console.log('[app debug]: handler -> value', value)
    },
  },
  created () {
    setInterval(() => {
      this.test1++
    }, 1000)
  },
  methods: {
    test4 (param) {
    console.log('[app debug]: param', param)
    },
  },
})
