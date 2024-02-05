import {
  inject,
  watch,
} from "vue";

export function useLenis(callback = null, deps = [], priority = 1, removeCallback = null) {
  let callbacks = inject("lenisScrollCallbacks")
  let lenis = inject("lenisInstance")
  
  if(callback && callbacks) {
    callbacks.value.push({callback, priority})
    callbacks.value.sort((a, b) => a.priority - b.priority)

    removeCallback = () => {
      callbacks.value = callbacks.value.filter(
        (cb) => cb.callback !== callback
      )
    }

    if(deps.length > 0) {
      watch(deps, () => {
        callback(lenis.value)
      })
    }
  }

  return {
    instance: lenis,
    removeCallback: removeCallback
  }
}