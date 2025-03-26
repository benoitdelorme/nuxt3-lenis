> **⚠️ WARNING**  
> This library will no longer be updated. I recommend using the official version of Lenis Vue instead:  
> [Lenis Vue Official GitHub](https://github.com/darkroomengineering/lenis/blob/main/packages/vue/README.md)  
> Please migrate to the official library for continued updates and support.


# Nuxt3 Lenis

## Introduction

nuxt3-lenis provides a `<LenisContainer>` component that creates a [Lenis](https://github.com/studio-freight/lenis) instance.
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

Add the module in nuxt.config

```
modules: [
  "nuxt3-lenis"
],
```

## Usage

```vue
<template>
  <LenisContainer root>
    <!-- Content -->
  </LenisContainer>
</template>

<script setup>
const lenis = useLenis(({scroll, velocity, progress, direction}) => { ... })
</script>
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

## Hooks

Once the Lenis context is set (components mounted inside `<LenisContainer>`) you can use these handy hooks:

`useLenis` is a hook that returns the Lenis instance

The hook takes three argument:

- `callback`: The function to be called whenever a scroll event is emitted
- `deps`: Trigger callback on change
- `priority`: Manage callback execution order

<br/>

## Examples

### With customs options

```vue
<template>
  <LenisContainer :options="options" root>
    <!-- Content -->
  </LenisContainer>
</template>

<script setup>
const options = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "horizontal",
  gestureOrientation: "vertical",
};
</script>
```

### GSAP integration

```vue
<template>
  <LenisContainer ref="lenisRef" :autoRaf="false" root>
    <!-- Content -->
  </LenisContainer>
</template>

<script setup>
const lenisRef = ref(null);

const onFrame = (time) => {
  lenisRef.value.instance.raf(time * 1000);
};

onMounted(() => {
  gsap.ticker.add(onFrame);
});

onBeforeUnmount(() => {
  gsap.ticker.remove(onFrame);
});
</script>
```

### Scroll Event

```vue
<template>
  <LenisContainer @scroll="onScroll" root>
    <!-- Content -->
  </LenisContainer>
</template>

<script setup>
const onScroll = ({ scroll, velocity, direction, progress }) => {
  console.log({ scroll, velocity, direction, progress });
};
</script>
```

### With custom rAF

```vue
<template>
  <LenisContainer ref="lenisRef" :autoRaf="false" root>
    <!-- Content -->
  </LenisContainer>
</template>

<script setup>
const lenisRef = ref(null);

const onFrame = (time) => {
  lenisRef.value.instance.raf(time);
};

onMounted(() => {
  lenisRef.value.instance.on(
    "scroll",
    ({ scroll, velocity, direction, progress }) => {
      console.log({ scroll, velocity, direction, progress });
    }
  );

  Tempus.add(onFrame, 0);
});

onBeforeUnmount(() => {
  Tempus.remove(onFrame, 0);
});
</script>
```
