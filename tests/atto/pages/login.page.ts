import { BasePage } from "./base.page";
import { Locator, Page } from "@playwright/test";

export class LoginPage extends BasePage {
  protected readonly path = '/web/index.php/auth/login';
  private readonly usernameField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessageLocator: Locator;

  constructor(protected readonly page: Page) {
    super(page);
    this.usernameField = page.getByPlaceholder('Username');
    this.passwordField = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessageLocator = page.locator('div.orangehrm-login-slot-wrapper > div.orangehrm-login-slot:nth-of-type(2) > div.orangehrm-login-form:nth-of-type(2) > div.orangehrm-login-error > div.oxd-alert.oxd-alert--error:nth-of-type(1)');
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameField.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  getErrorMessageLocator(): Locator {
    return this.errorMessageLocator;
  }
}
