<template>
  <nav>
    <NuxtLink to="/">
      Home
    </NuxtLink>
    <NuxtLink to="/about">
      About
    </NuxtLink>
    <NuxtLink to="/project">
      Project
    </NuxtLink>
    <NuxtLink to="/contact">
      Contact
    </NuxtLink>
  </nav>
</template>

<script setup>
  useLenis(({velocity, scroll, progress}) => {
    console.log(`Scroll from Menu: ${ scroll }`)
  })
</script>