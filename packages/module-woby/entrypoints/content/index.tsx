// packages/module-woby/entrypoints/content/index.tsx
// Minimal content script entry point using Woby

import { render } from 'woby';
import type { JSX } from 'woby';

const App = (): JSX.Element => {
  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 9999, background: 'white', padding: '10px', border: '1px solid black' }}>
      Hello from Woby Content Script!
    </div>
  );
};

const mountPoint = document.createElement('div');
mountPoint.id = 'woby-content-script-root';
document.body.appendChild(mountPoint);

render(<App />, mountPoint);

export default {}; // Ensure it's treated as a module
