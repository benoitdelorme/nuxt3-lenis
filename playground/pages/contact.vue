<template>
  <Lenis root>
    <section>UseLenis() Hook</section>
    <section>Section</section>
    <section>Section</section>
    <section>Section</section>
    <section>Section</section>
  </Lenis>
</template>

<script setup>
let lenis

onMounted(() => {
  lenis = useLenis(({velocity, scroll, progress}) => {
    console.log(`Scroll from Contact Page with priority: ${ scroll }`)
  }, [], 0)

  console.log('Lenis Instance:')
  console.log(lenis.instance.value)
})

onBeforeUnmount(() => {
  lenis.removeCallback()
})

</script>