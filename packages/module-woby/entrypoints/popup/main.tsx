// packages/module-woby/entrypoints/popup/main.tsx
import { render } from 'woby';
import { App } from '../../components/App'; // Path to the App component

const rootElement = document.getElementById('app');

if (rootElement) {
  render(<App />, rootElement);
} else {
  console.error('Root element #app not found');
}
