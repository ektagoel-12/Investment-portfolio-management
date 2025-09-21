// tests/setup.ts
import { beforeAll } from 'vitest';

// Example: mock matchMedia if needed
beforeAll(() => {
  window.matchMedia = window.matchMedia || function () {
    return { matches: false, addListener: () => {}, removeListener: () => {} };
  };
});
