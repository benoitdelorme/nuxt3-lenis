<template>
  <div ref="lenisWrapper">
    <div v-if="!root" ref="lenisContent">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

<script lang="ts">
interface IProps {
  options?: LenisOptions;
  root?: boolean;
  autoRaf?: boolean;
  rafPriority?: number;
}

export default {
  name: "LenisContainer",
};
</script>

<script setup lang="ts">
import type { LenisOptions } from "lenis";
import type { ILenisCallback } from "../types/LenisCallback.ts";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  inject,
  type Ref,
} from "vue";

import Lenis from "lenis";
import Tempus from "tempus";

const emit = defineEmits(["scroll"]);

const props = withDefaults(defineProps<IProps>(), {
  options: () => {
    return {
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 0.8,
    };
  },
  autoRaf: true,
  root: false,
  rafPriority: 0,
});

const lenisWrapper = ref<HTMLDivElement>();
const lenisContent = ref<HTMLDivElement>();
const callbacks = inject<Ref<ILenisCallback[]>>("lenisScrollCallbacks");
const lenis = inject<Ref<Lenis>>("lenisInstance");

const options = computed(() => {
  return {
    ...props.options,
    ...(!props.root && {
      wrapper: lenisWrapper.value,
      content: lenisContent.value,
    }),
  };
});

const onFrame = (time: number) => {
  if (!lenis) return;
  if (!lenis.value) return;
  lenis.value.raf(time);
};

const initLenis = () => {
  if (lenis) {
    lenis.value = new Lenis(options.value);

    lenis.value.on("scroll", (e) => {
      if (callbacks) {
        for (let i = 0; i < callbacks?.value.length; i++) {
          callbacks.value[i].callback(e);
        }
      }

      emit("scroll", e);
    });

    if (props.autoRaf) {
      Tempus.add(onFrame, { priority: props.rafPriority });
    }
  }
};

const destroyLenis = () => {
  if (!lenis) return;
  if (!lenis.value) return;

  lenis.value.destroy();

  // if (props.autoRaf) {
  //   Tempus.
  // }
};

onMounted(() => {
  initLenis();
});

onBeforeUnmount(() => {
  destroyLenis();
});

defineExpose({
  instance: lenis,
  destroyLenis,
  initLenis,
});
</script>
