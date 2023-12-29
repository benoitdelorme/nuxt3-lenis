<template>
  <Lenis ref="lenisRef" :options="options" @scroll="onScroll" :autoRaf="false" root>
    <section>Examples: with options, external rAF, Lenis event, Emit event</section>
    <section>Section</section>
    <section>Section</section>
    <section>Section</section>
    <section>Section</section>
  </Lenis>
</template>

<script setup>
const lenisRef = ref(null)

const options = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false
}

const onFrame = (time) => {
  lenisRef.value.instance.raf(time)
}

const onScroll = ({scroll, velocity, direction, progress}) => {
  console.log(`Scroll from About Page: ${ scroll }`)
}

onMounted(() => {
  Tempus.add(onFrame, 0)
})

onBeforeUnmount(() => {
  Tempus.remove(onFrame, 0)
})
</script>