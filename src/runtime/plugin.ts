import { defineNuxtPlugin } from '#app'
import { useScrollState } from './composables/useScrollState'
import { Tempus, Lenis } from '#imports'

import gsap from "gsap"

export default defineNuxtPlugin((nuxtApp) => {
  if(process.client) {
    const { scrollState, setScrollState, setLenis } = useScrollState()
    
    gsap.ticker.remove(gsap.updateRoot)
    
    Tempus.add((time) => {
      gsap.updateRoot(time / 1000)
    }, 0)
    
    nuxtApp.vueApp.provide('Lenis', Lenis)
    nuxtApp.vueApp.provide('setScrollState', setScrollState)
    nuxtApp.vueApp.provide('setLenis', setLenis)
    nuxtApp.vueApp.provide('scrollState', scrollState)
  }
})