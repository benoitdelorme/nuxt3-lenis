import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports,
  addComponent,
} from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt3-lenis",
    configKey: "lenis",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    addPlugin: true,
  },

  setup() {
    const resolver = createResolver(import.meta.url);

    addImports([
      {
        name: "default",
        as: "Lenis",
        from: "lenis",
      },
    ]);
    addImports([
      {
        name: "default",
        as: "Tempus",
        from: "tempus",
      },
    ]);
    addImports([
      {
        name: "useLenis",
        as: "useLenis",
        from: resolver.resolve("./runtime/composables/useLenis"),
      },
    ]);
    addPlugin(resolver.resolve("./runtime/plugin")),
      addComponent({
        name: "LenisContainer",
        filePath: resolver.resolve(
          "./runtime/components",
          "LenisContainer.vue"
        ),
      });
  },
});
