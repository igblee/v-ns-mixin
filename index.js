const __map = new Map()
const prefix = '$_'
let __Vue = null

function hasOwn (data, key) {
  return Object.hasOwnProperty.call(data, key)
}

function lazyGetProxyContext (ns) {
  return __map.get(ns)
}

function mixinBind (fn, ns) {
  // if component overwrite namespace mixin watcher, fn may be { handler() {}, deep: true... }
  if (myTypeOf(fn) !== 'Function' && myTypeOf(fn?.handler) !== 'Function') {
    return fn
  }
  const handler = myTypeOf(fn) === 'Function' ? fn : fn.handler
  return function (...args) {
    return handler.apply(lazyGetProxyContext(ns), args)
  }
}

function getSource (ns) {
  return __map.get(ns)
}

function external () {
  return this
}

function myTypeOf (data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

function observe (ns, context) {
  if (myTypeOf(context) !== 'Object') {
    throw new Error('data being oberved must be Object')
  }
  const handler = {
    get (target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set (target, key, value, receiver) {
      context.$ext()[`${ns}${prefix}${key}`] = value
      return Reflect.set(target, key, value, receiver)
    },
    deleteProperty (target, key) {
      Reflect.deleteProperty(context.$ext(), `${ns}${prefix}${key}`)
      return Reflect.deleteProperty(target, key)
    },
  }
  const proxy = new Proxy(context, handler)
  return proxy
}

export default function install (Vue) {
  if (install.installed) {

  } else {
    install.installed = true
    __Vue = Vue
    Vue.mixin({
      beforeCreate () {
        this.$ns = getSource
      },
    })
    Object.defineProperty(Vue.prototype, '$ns ', {
      enumerable: true,
      configurable: false,
      get () { return this.$ns },
      set () {},
    })
  }
}

export function namespaceMixin (ns, mixin) {
  const nData = Object.create(null)
  const nComputed = Object.create(null)
  const nWatch = Object.create(null)
  const nMethods = Object.create(null)
  const nHooks = Object.create(null)
  let context = Object.create(null)
  context.$ext = () => {}
  if (mixin.data) {
    const rawData = mixin.data()
    context = { ...context, ...rawData, }
    Object.keys(rawData).forEach((key) => {
      nData[`${ns}${prefix}${key}`] = rawData[key]
    })
  }
  if (mixin.computed) {
    const rawComputed = mixin.computed
    Object.keys(rawComputed).forEach((key) => {
      if (myTypeOf(rawComputed[key]) === 'Object') {
        if (hasOwn(rawComputed[key], 'get')) {
          rawComputed[key].get = mixinBind(rawComputed[key].get, ns)
        }
        if (hasOwn(rawComputed[key], 'set')) {
          rawComputed[key].set = mixinBind(rawComputed[key].set, ns)
        }
        Object.defineProperty(context, key, {
          enumerable: true,
          configurable: true,
          get: rawComputed[key].get,
          set: rawComputed[key].set,
        })
      } else {
        rawComputed[key] = mixinBind(rawComputed[key], ns)
        Object.defineProperty(context, key, {
          enumerable: true,
          configurable: true,
          get: rawComputed[key],
        })
      }
      nComputed[`${ns}${prefix}${key}`] = rawComputed[key]
    })
  }
  if (mixin.methods) {
    const rawMethods = mixin.methods
    Object.keys(rawMethods).forEach((key) => {
      rawMethods[key] = mixinBind(rawMethods[key], ns)
      nMethods[`${ns}${prefix}${key}`] = mixinBind(rawMethods[key], ns)
      context[key] = rawMethods[key]
    })
  }
  if (mixin.watch) {
    const rawWatch = mixin.watch
    Object.keys(rawWatch).forEach((key) => {
      if (myTypeOf(rawWatch[key]) === 'Object') {
        rawWatch[key].handler = mixinBind(rawWatch[key].handler, ns)
      } else {
        rawWatch[key] = mixinBind(rawWatch[key], ns)
      }
      nWatch[`${ns}${prefix}${key}`] = mixinBind(rawWatch[key], ns)
    })
  }
  const hookList = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'beforeDestroy',
    'destroyed',
    'errorCaptured',
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteLeave',
  ]

  hookList.forEach((hook) => {
    if (mixin[hook]) {
      nHooks[hook] = mixinBind(mixin[hook], ns)
    }
  })

  return {
    data () {
      context.$ext = external.bind(this)
      const proxyContext = observe(ns, context)
      __map.set(ns, proxyContext)
      // so that the dom will update when context change
      __Vue.observable(context)
      return nData
    },
    computed: nComputed,
    watch: nWatch,
    methods: nMethods,
    ...nHooks,
  }
}
