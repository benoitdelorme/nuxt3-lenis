import type Lenis from "lenis";
import { inject, watch, type Ref } from "vue";
import type { ILenisCallback } from "../types/LenisCallback";

export function useLenis<T = any>(
  callback: Function | null = null,
  deps: Ref<T>[] = [],
  priority: number = 1,
  removeCallback: Function | null = null
): { instance: Ref<Lenis>; removeCallback: Function } {
  let callbacks = inject<Ref<ILenisCallback[]>>("lenisScrollCallbacks");
  let lenis = inject<Ref<Lenis>>("lenisInstance");

  if (callback && callbacks) {
    callbacks.value.push({ callback, priority });
    callbacks.value.sort((a, b) => a.priority - b.priority);

    removeCallback = () => {
      callbacks.value = callbacks.value.filter(
        (cb) => cb.callback !== callback
      );
    };

    if (deps.length > 0) {
      watch(deps, () => {
        if (!lenis) return;
        callback(lenis.value);
      });
    }
  }

  return {
    instance: lenis!,
    removeCallback: removeCallback!,
  };
}
