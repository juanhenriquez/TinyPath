import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

setup('authenticate', async ({ page }) => {
  await page.goto('/auth/sign-in');

  // wait for the Clerk widget to be rendered.
  await page.waitForSelector('.cl-rootBox', {
    state: 'attached',
  });

  const testEmail = `test+clerk_test@example.com`;
  const emailInputField = page.locator('#identifier-field');
  const continueButton = page.getByRole('button', { name: 'Continue' });

  await emailInputField.fill(testEmail);

  // Click the continue button.
  await continueButton.click();

  // Wait for the OTP field to be visible.
  const otpFieldsSelectors = new Array(6)
    .fill(0)
    .map((_, index) => `[name="codeInput-${index}"]`);

  // Wait for the OTP field to be visible.
   await page.waitForSelector('.cl-otpCodeField', {
    state: 'attached',
  });

  await page.locator(`[name="codeInput-0"]`).fill('4');
  await wait(300);
  await page.locator(`[name="codeInput-1"]`).fill('2');
  await wait(300);
  await page.locator(`[name="codeInput-2"]`).fill('4');
  await wait(300);
  await page.locator(`[name="codeInput-3"]`).fill('2');
  await wait(300);
  await page.locator(`[name="codeInput-4"]`).fill('4');
  await wait(300);
  await page.locator(`[name="codeInput-5"]`).fill('2');

  await page.waitForURL('/dashboard');

  await expect(page.getByRole('button', { name: 'Create Link' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
