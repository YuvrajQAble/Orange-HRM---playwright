import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  readonly path = '/auth/login';

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto(this.path);
  }

  async fillUsername(username: string) {
    await this.page.getByPlaceholder('Username').fill(username);
  }

  async fillPassword(password: string) {
    await this.page.getByPlaceholder('Password').fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}