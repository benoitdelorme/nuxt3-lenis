# Nuxt3 Lenis
## Introduction
nuxt3-lenis provides a `<Lenis>` component that creates a [Lenis](https://github.com/studio-freight/lenis) instance.
<br/>

## Installation

For npm users:
```
npm i nuxt3-lenis
```

For yarn users:
```
yarn add nuxt3-lenis
```

## Usage

```vue
<template>
  <Lenis root>
    /* content */
  </Lenis>
</template>
```
<br/>

## Props
- `options`: [Lenis options](https://github.com/studio-freight/lenis#instance-settings).
- `root`: Lenis will be instanciate using `<html>` scroll. Default: `false`.
- `autoRaf`: if `false`, `lenis.raf` needs to be called manually. Default: `true`.
- `rafPriority`: [Tempus](https://github.com/studio-freight/tempus#readme) execution priority. Default: `0`.

<br/>

## Events
- `scroll`: [Lenis instance](https://github.com/studio-freight/lenis?tab=readme-ov-file#instance-events).

<br/>

## Examples

### With customs options

```vue
<template>
  <Lenis :options="options" root>
    { /* content */ }
  </Lenis>
</template>

<script setup>
const options = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "horizontal",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false
}
</script>
```

### GSAP integration

```vue
<template>
  <Lenis ref="lenisRef" :autoRaf="false" root>
    { /* content */ }
  </Lenis>
</template>

<script setup>
const lenisRef = ref(null)

const onFrame = (time) => {
  lenisRef.value.instance.raf(time * 1000)
}

onMounted(() => {
  gsap.ticker.add(onFrame)
})

onBeforeUnmount(() => {
  gsap.ticker.remove(onFrame)
})
</script>
```

### Scroll Event

```vue
<template>
  <Lenis @scroll="onScroll" root>
    { /* content */ }
  </Lenis>
</template>

<script setup>
const onScroll = ({scroll, velocity, direction, progress}) => {
  console.log({scroll, velocity, direction, progress})
}
</script>
```

### With custom rAF

```vue
<template>
  <Lenis ref="lenisRef" :autoRaf="false" root>
    { /* content */ }
  </Lenis>
</template>

<script setup>
const lenisRef = ref(null)

const onFrame = (time) => {
  lenisRef.value.instance.raf(time)
}

onMounted(() => {
  lenisRef.value.instance.on("scroll", ({scroll, velocity, direction, progress}) => {
    console.log({scroll, velocity, direction, progress})
  })

  Tempus.add(onFrame, 0)
})

onBeforeUnmount(() => {
  Tempus.remove(onFrame, 0)
})
</script>
```
