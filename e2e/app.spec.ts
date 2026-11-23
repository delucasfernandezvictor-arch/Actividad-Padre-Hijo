import { expect, test } from '@playwright/test';

test('el padre envía un mensaje a los hijos', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Actividad Padre - Hijo').first()).toBeVisible();
});
