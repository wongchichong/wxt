# @wxt-dev/module-woby

WXT module to add Woby support to your web extension.

## Installation

```bash
pnpm add -D @wxt-dev/module-woby woby
```

## Usage

Add the module to your `wxt.config.ts`:

```ts
import { defineConfig } from 'wxt';
import woby from '@wxt-dev/module-woby';

export default defineConfig({
  modules: [
    woby() // Add woby module
  ],
  // ...other configs
});
```

Then you can start using Woby components in your entrypoints (e.g., `popup.tsx`, `options.tsx`, or content scripts).

Make sure your `tsconfig.json` is configured for Woby JSX:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "woby"
    // ... other options
  }
}
```
