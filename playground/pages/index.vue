<template>
  <LenisContainer
    root
    :options="{
      autoRaf: true,
      wheelMultiplier: 0.1,
      smoothWheel: true,
    }"
  >
    <section>
      <img width="300" src="~/assets/nuxt-logo-black.svg" alt="Nuxt Logo" />
    </section>
    <section>
      <img width="300" src="~/assets/nuxt-logo-black.svg" alt="Nuxt Logo" />
    </section>
    <section>
      <img width="300" src="~/assets/nuxt-logo-black.svg" alt="Nuxt Logo" />
    </section>
    <section>
      <img width="300" src="~/assets/nuxt-logo-black.svg" alt="Nuxt Logo" />
    </section>
    <section>
      <img width="300" src="~/assets/nuxt-logo-black.svg" alt="Nuxt Logo" />
    </section>
  </LenisContainer>
</template>

<script setup lang="ts">
const lenis = useLenis();

onMounted(() => {
  console.log(lenis.instance.value);
});
</script>
