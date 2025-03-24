// types.d.ts
import { LenisOptions } from "lenis";
import { Component } from "vue";

declare module "vue" {
  export interface GlobalComponents {
    LenisContainer: Component<{
      options?: LenisOptions;
      root?: boolean;
      autoRaf?: boolean;
      rafPriority: number;
    }>;
  }
}
