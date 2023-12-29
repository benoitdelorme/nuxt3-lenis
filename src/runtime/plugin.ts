import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const callbacks = ref([])
  const instance = ref(null)

  nuxtApp.vueApp.provide('lenisScrollCallbacks', callbacks)
  nuxtApp.vueApp.provide('lenisInstance', instance)
})