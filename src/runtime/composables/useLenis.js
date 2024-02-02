import { inject, watch } from '#app'
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  inject,
  toRefs,
  watch,
} from "vue";

export function useLenis(callback = null, deps = [], priority = 1) {
  let callbacks = inject("lenisScrollCallbacks")
  let lenis = inject("lenisInstance")

  if(!callback && !callbacks) return

  callbacks.value.push({callback, priority})
  callbacks.value.sort((a, b) => a.priority - b.priority)

  const removeCallback = () => {
    callbacks.value = callbacks.value.filter(
      (cb) => cb.callback !== callback
    )
  }

  if(deps.length > 0) {
    watch(deps, () => {
      callback(lenis.value)
    })
  }

  return {
    instance: lenis,
    removeCallback: removeCallback
  }
}