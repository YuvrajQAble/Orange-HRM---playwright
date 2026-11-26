import { test, expect } from "../../fixtures/test.fixture";
import { LoginPage } from "../../pages/login.page";

test('T1C-TC-5 - Login with Special Characters in Username', async ({ loginPage }) => {
  await loginPage.open();

  // Act
  await loginPage.enterUsername('!@#$%^');
  await loginPage.enterPassword('***');
  await loginPage.submit();

  // Assert
  const errorMessageLocator = loginPage.getErrorMessageLocator();
  await expect(errorMessageLocator).toBeVisible();
  await expect(errorMessageLocator).toHaveText('Invalid credentials');
});