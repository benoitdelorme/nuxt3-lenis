<template>
  <nav>
    <NuxtLink to="/">
      Home
    </NuxtLink> &nbsp;
    <NuxtLink to="/about">
      About
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