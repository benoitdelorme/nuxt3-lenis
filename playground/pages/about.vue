<template>
  <Lenis ref="lenisRef" :options="options" @scroll="onScroll" :autoRaf="false" root>
    <section>Examples: with options, external rAF, Scroll Event</section>
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
  console.log({scroll, velocity, direction, progress})
}

onMounted(() => {
  /* lenisRef.value.instance.on("scroll", ({scroll, velocity, direction, progress}) => {
    console.log({scroll, velocity, direction, progress})
  }) */

  Tempus.add(onFrame, 0)
})

onBeforeUnmount(() => {
  Tempus.remove(onFrame, 0)
})
</script>