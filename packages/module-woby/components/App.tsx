// packages/module-woby/components/App.tsx
import type { JSX } from 'woby'; // For type-checking JSX elements

export const App = (): JSX.Element => {
  // Simple state example if desired, or just static content
  // const [count, setCount] = $(0); // Example from Woby docs if $ is for signals
  // For now, just a static heading
  return <h1>Hello from Woby Module!</h1>;
};
