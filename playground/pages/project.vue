<template>
  <Lenis ref="lenisRef" :options="options" root>
    <div class="section-wrapper">
      <section>Horizontal Scroll Example</section>
      <section>Section</section>
      <section>Section</section>
      <section>Section</section>
      <section>Section</section>
    </div>
  </Lenis>
</template>

<script setup>

const lenisRef = ref(null)

const options = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "horizontal",
  gestureOrientation: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false
}
</script>

<style scope>
section {
  height: 100vh;
  min-width: 100vw;
}

.section-wrapper {
  display: flex;
}
</style>