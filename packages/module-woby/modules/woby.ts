import 'wxt';
import { addImportPreset, addViteConfig, defineWxtModule } from 'wxt/modules';

export default defineWxtModule<WobyModuleOptions>({
  name: '@wxt-dev/module-woby',
  configKey: 'woby',
  setup(wxt, options) {
    const { vite: viteOptions } = options ?? {};

    addViteConfig(wxt, () => {
      const userConfig = typeof viteOptions === 'function' ? viteOptions() : viteOptions;

      const mergedConfig = { ...userConfig }; // Start with user's config

      // Ensure build target
      mergedConfig.build = { ...(userConfig?.build), target: 'esnext' };

      // Configure esbuild for Woby JSX, respecting tsconfig.json's "jsxImportSource": "woby"
      // and "jsx": "react-jsx" (which implies 'automatic' runtime).
      mergedConfig.esbuild = {
        ...(userConfig?.esbuild), // Spread existing esbuild config
        jsx: 'automatic', // For "react-jsx" behavior
        jsxImportSource: 'woby', // Crucial for Woby
      };
      // If in development, and Woby supports/needs jsxDev, that could be added too.
      // Example from solid: jsxDev: wxt.config.mode !== 'production'
      // Woby docs don't mention jsxDev, so omit for now.

      return mergedConfig;
    });

    addImportPreset(wxt, 'woby');

    // Enable auto-imports for JSX files from Woby
    wxt.hook('config:resolved', (config) => {
      if (!config.imports) return; // Imports can be disabled

      config.imports.dirsScanOptions ??= {};
      // This pattern ensures .ts, .js, .tsx, .jsx etc. are scanned for auto-imports.
      // It's taken directly from how module-solid handles it.
      config.imports.dirsScanOptions.filePatterns = [
        '*.{ts,js,mjs,cjs,mts,cts,jsx,tsx}',
      ];
    });
  },
});

export interface WobyModuleOptions {
  /**
   * Custom Vite configuration to apply.
   * Will be merged with WXT's default Vite config for Woby.
   * @see https://vitejs.dev/config/
   */
  vite?: import('vite').UserConfig | (() => import('vite').UserConfig);
}

// Augment WXT's InlineConfig type
declare module 'wxt' {
  export interface InlineConfig {
    woby?: WobyModuleOptions;
  }
}
