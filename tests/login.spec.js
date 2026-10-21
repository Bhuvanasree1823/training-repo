const { test, expect } = require('@playwright/test');

test.describe('Login form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
  });

  test('valid credentials log the user in', async ({ page }) => {
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/secure/);
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  });

  test('invalid password shows an error', async ({ page }) => {
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });

  test('unknown username shows an error', async ({ page }) => {
    await page.getByLabel('Username').fill('nobody');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });
});