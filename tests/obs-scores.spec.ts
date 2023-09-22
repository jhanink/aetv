import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost/obs-scores.html?tourney=test&table=2');

  await expect(page.locator('.ant-layout')).toHaveText(/Race to/);
});

