import { BasePage } from "./base.page";
import { Page, Locator } from "@playwright/test";

export class LoginPage extends BasePage {
  protected readonly path = '/auth/login';

  private get usernameField(): Locator {
    return this.page.getByPlaceholder('Username');
  }

  private get passwordField(): Locator {
    return this.page.getByPlaceholder('Password');
  }

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.goto(this.path);
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.page.keyboard.press('Enter');
  }
}