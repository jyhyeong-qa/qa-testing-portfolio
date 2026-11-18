const { test, expect } = require('@playwright/test');

test.describe('SauceDemo End-to-End QA Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://saucedemo.com');
  });

  test('TC-01: Valid user can log in successfully', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL('https://saucedemo.cominventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC-02: Locked-out user receives error message', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Sorry, this user has been locked out');
  });

  test('TC-05 & TC-07: Complete end-to-end purchase flow', async ({ page }) => {
    // Login
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Navigate to cart and checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    // Fill checkout details
    await page.locator('[data-test="firstName"]').fill('Ahmad');
    await page.locator('[data-test="lastName"]').fill('Zaki');
    await page.locator('[data-test="postalCode"]').fill('50000');
    await page.locator('[data-test="continue"]').click();

    // Finish order and verify confirmation
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

});
