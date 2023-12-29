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

const lenis = ref(null)
const lenisWrapper = ref()
const lenisContent = ref()

const lenisOptions = computed(() => {
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
    lenis.value = new Lenis(lenisOptions.value)

    lenis.value.on("scroll", (e) => {
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