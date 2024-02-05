<template>
  <Lenis root>
    <section>
      <img width="300" src="~/assets/nuxt-logo-black.svg" alt="Nuxt Logo">
    </section>
    <section>
      <img width="300" src="~/assets/nuxt-logo-black.svg" alt="Nuxt Logo">
    </section>
    <section>
      <img width="300" src="~/assets/nuxt-logo-black.svg" alt="Nuxt Logo">
    </section>
    <section>
      <img width="300" src="~/assets/nuxt-logo-black.svg" alt="Nuxt Logo">
    </section>
    <section>
      <img width="300" src="~/assets/nuxt-logo-black.svg" alt="Nuxt Logo">
    </section>
  </Lenis>
</template>

<script setup>
  const lenis = useLenis()
  
  onMounted(() => {
    console.log(lenis.instance.value)
  })
</script>