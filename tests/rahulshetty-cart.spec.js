const { test, expect } = require('@playwright/test');

test('signs in and verifies iphone X is added to the cart', async ({ page }) => {
  const productName = 'iphone X';

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('Learning@830$3mK2');

  await page.getByRole('radio', { name: 'User' }).check();
  await page.getByRole('button', { name: 'Okay' }).click();

  await page.locator('#signInBtn').click();
  await page.locator('.card').first().waitFor({ state: 'visible' });

  const productCard = page.locator('.card').filter({ hasText: productName });
  await expect(productCard).toHaveCount(1);
  await productCard.getByRole('button', { name: 'Add' }).click();

  const checkoutButton = page.locator('a.nav-link.btn.btn-primary');
  await expect(checkoutButton).toContainText('Checkout');
  await checkoutButton.click();

  const cartRows = page.locator('h4.media-heading a');
  await expect(cartRows).toContainText([productName]);
  await page.waitForTimeout(20000);
  await expect(page.locator('button.btn-success')).toContainText('Checkout');
});
