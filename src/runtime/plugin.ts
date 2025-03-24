import { defineNuxtPlugin } from "#app";
import { ref } from "vue";
import Lenis from "lenis";
import type { ILenisCallback } from "./types/LenisCallback";

export default defineNuxtPlugin((nuxtApp) => {
  const callbacks = ref<ILenisCallback[]>([]);
  const instance = ref<Lenis | null>(null);

  nuxtApp.vueApp.provide("lenisScrollCallbacks", callbacks);
  nuxtApp.vueApp.provide("lenisInstance", instance);
});
