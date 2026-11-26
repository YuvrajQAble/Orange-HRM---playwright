import { test, expect } from "../../fixtures/test.fixture";
import { AddEmployeePage } from "../../pages/add-employee.page";
import { LoginPage } from "../../pages/login.page";

let previousID: number | null = null;

async function assertIncrementedID(currentID: string) {
  const currentIDNumber = Number(currentID);
  if (previousID !== null) {
    expect(currentIDNumber).toBe(previousID + 1);
  }
  previousID = currentIDNumber;
}

test.describe('Employees', () => {
  test('ORA-TC-2 - Verify unique employee ID generation', async ({ loginPage, page }) => {
    const addEmployeePage = new AddEmployeePage(page);
    
    await loginPage.open();
    await loginPage.signIn('Admin', 'admin123');

    await addEmployeePage.open();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');

    // Enter employee details
    const firstName = 'John';
    const lastName = 'Doe';
    await addEmployeePage.enterFirstName(firstName);
    await addEmployeePage.enterLastName(lastName);

    // Save employee
    await addEmployeePage.saveEmployee();

    // Verify unique employee ID generation
    const generatedID = await addEmployeePage.getGeneratedEmployeeID();
    expect(generatedID).not.toBeNull();
    const validID = generatedID ?? "0";
    expect(validID).toMatch(/^\d{4}$/); // Assuming the ID is a 4-digit number
    expect(Number(validID)).toBeGreaterThan(0); // Ensure the ID is greater than 0 for increment verification

    // New assertion for increment verification
    await assertIncrementedID(validID);
  });
});