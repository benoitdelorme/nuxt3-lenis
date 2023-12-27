<template>
  <div ref="lenisContainer">
     <slot />
  </div>
</template>

<script>
import gsap from "gsap"
import { Tempus } from '#imports'
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default defineComponent({
  props: ["options"],
  setup({ options }, { emit }) {
    if(process.client) {
      const Lenis = inject("Lenis")
      const setScrollState = inject("setScrollState")
      const setLenis = inject("setLenis")

      const lenisInstance = ref(null)
      const lenisContainer = ref(null)
        
      gsap.ticker.lagSmoothing(0)

      const lenisOptions = reactive(
        Object.assign(
            {},
            {
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              direction: "vertical",
              gestureDirection: "vertical",
              smooth: true,
              mouseMultiplier: 1,
              smoothTouch: false,
              touchMultiplier: 2,
              infinite: false,
            },
            options || {}
        )
      )
      
      onMounted(() => {
        initLenis()
      })

      onBeforeUnmount(() => {
        destroyLenis()
      })
      
      const onFrame = (time) => {
        if (!lenisInstance.value) return
        lenisInstance.value.raf(time)
      };

      const initLenis = () => {
        lenisInstance.value = new Lenis(lenisOptions)
        
        lenisInstance.value.on("scroll", (scrollData) => {
            setScrollState(scrollData)
            ScrollTrigger.update()
            emit("scroll", scrollData)
        })
        
        setLenis(lenisInstance.value)
        emit("initiated", { lenis: lenisInstance.value })

        Tempus.add(onFrame, 0)
      }

      const destroyLenis = () => {
        if (!lenisInstance.value) return
        
        setScrollState(false)
        lenisInstance.value.off("scroll")
        lenisInstance.value.destroy()
        lenisInstance.value = null
        
        Tempus.remove(onFrame)
      }

      return {
        initLenis,
        destroyLenis,
        lenisContainer,
        lenisInstance,
      }
    }
  }
})

</script>