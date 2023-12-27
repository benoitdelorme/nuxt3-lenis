import { readonly } from 'vue'
import { useState } from '#app'

export function useScrollState (initialState = false) {
  const scrollState = useState('scrollState', () => initialState)
  const lenisInstance = useState('lenisInstance', () => initialState)
  
  const setScrollState = (scrollState) => {
    scrollState.value = scrollState
  }

  const setLenis = (instance) => {
    lenisInstance.value = instance
  }
  
  return {
    scrollState: readonly(scrollState),
    setScrollState,
    lenisInstance,
    setLenis
  }
}