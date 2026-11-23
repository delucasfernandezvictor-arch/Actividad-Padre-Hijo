import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, test } from 'vitest';

import App from './App';

test('renderiza la app con el padre y los dos hijos', async () => {
  render(<App />);
  expect(await screen.findByTestId('hijo-Hijo 1')).toBeDefined();
  expect(await screen.findByTestId('hijo-Hijo 2')).toBeDefined();
});
