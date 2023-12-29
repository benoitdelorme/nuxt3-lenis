<template>
  <main>
    <nuxt-page />
    <NavigationMenu />
  </main>
</template>

<script setup>

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');

html, body {
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Inter', sans-serif;
}

section {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:nth-child(1) {
    background-color: #00dc82;
  }
  &:nth-child(2) {
    background-color: #1FFFE6;
  }
  &:nth-child(3) {
    background-color: #1FBFFF;
  }
  &:nth-child(4) {
    background-color: #1F47FF;
  }
  &:nth-child(5) {
    background-color: #501FFF;
  }
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background: rgb(255 255 255 / 40%);
  backdrop-filter: blur(10px);
  text-transform: uppercase;
}

nav a {
  margin: 0 1rem;
}
</style>