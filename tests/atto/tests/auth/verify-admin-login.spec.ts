import { test, expect } from '../../fixtures/test.fixture';
import { LoginPage } from '../../pages/login.page';

test('ORA-TC-1: Verify Admin Login with Valid Credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();

  await loginPage.fillUsername('Admin');
  await loginPage.fillPassword('admin123');
  await loginPage.submit();

  await expect(page).toHaveURL(/dashboard\/index/);
});
