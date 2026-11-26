import { BasePage } from "./base.page";
import { Page, Locator, expect } from "@playwright/test";

export class AddEmployeePage extends BasePage {
  protected readonly path = '/pim/addEmployee';

  private get firstNameField(): Locator {
    return this.page.getByPlaceholder('First Name');
  }

  private get lastNameField(): Locator {
    return this.page.getByPlaceholder('Last Name');
  }

  private get saveButton(): Locator {
    return this.page.getByRole('button', { name: 'Save' });
  }

  private get employeeIDField(): Locator {
    return this.page.locator('div.oxd-grid-2.orangehrm-full-width-grid:nth-of-type(2) > div.oxd-grid-item.oxd-grid-item--gutters > div.oxd-input-group.oxd-input-field-bottom-space > div:nth-of-type(2) > input.oxd-input.oxd-input--active');
  }

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await this.page.getByRole('link', { name: 'Add Employee' }).click();
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameField.fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameField.fill(lastName);
  }

  async saveEmployee(): Promise<void> {
    await this.saveButton.click();
    await expect(this.employeeIDField).toBeVisible();
  }

  async getGeneratedEmployeeID(): Promise<string | null> {
    return await this.employeeIDField.inputValue();
  }
}