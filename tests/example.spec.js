const { test, expect } = require('@playwright/test');

test('renders sample page content', async ({ page }) => {
  await page.setContent(`
    <html>
      <head>
        <title>Playwright JS Sample</title>
      </head>
      <body>
        <main>
          <h1>Playwright is working</h1>
          <button type="button">Run sample</button>
        </main>
      </body>
    </html>
  `);

  await expect(page).toHaveTitle('Playwright JS Sample');
  await expect(page.getByRole('heading', { name: 'Playwright is working' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Run sample' })).toBeVisible();
});
