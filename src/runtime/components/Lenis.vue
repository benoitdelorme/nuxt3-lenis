<template>
  <div ref="lenisWrapper">
    <div  v-if="!root" ref="lenisContent">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

<script setup>
const emit = defineEmits(['scroll'])

const props = defineProps({
  options: {
    type: Object,
    default: Object
  },
  root: {
    type: Boolean,
    default: false
  },
  autoRaf: {
    type: Boolean,
    default: true
  },
  rafPriority: {
    type: Number,
    default: 0
  }
})

const lenisWrapper = ref()
const lenisContent = ref()
const callbacks = inject("lenisScrollCallbacks")
const lenis = inject("lenisInstance")

const options = computed(() => {
  return {
    ...props.options,
    ...(!props.root && {
      wrapper: lenisWrapper.value,
      content: lenisContent.value
    })
  }
})

const onFrame = (time) => {
  if (!lenis.value) return
  lenis.value.raf(time)
}

const initLenis = () => {
  if(process.client) {
    lenis.value = new Lenis(options.value)

    lenis.value.on("scroll", (e) => {
      for(let i = 0; i < callbacks?.value.length; i++) {
        callbacks.value[i].callback(e)
      }

      emit("scroll", e)
    })

    if(props.autoRaf) {
      Tempus.add(onFrame, props.rafPriority)
    }
  }
}

const destroyLenis = () => {
  if (!lenis.value) return
  
  lenis.value.destroy()
  lenis.value = null
  
  if(props.autoRaf) {
    Tempus.remove(onFrame)
  }
}

onMounted(() => {
  initLenis()
})

onBeforeUnmount(() => {
  destroyLenis()
})

defineExpose({
  instance: lenis,
  destroyLenis,
  initLenis
})

</script>