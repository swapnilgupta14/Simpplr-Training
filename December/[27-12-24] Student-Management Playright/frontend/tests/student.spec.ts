import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const mockStudent = {
  full_name: 'Jane Smith',
  email: 'jane.smith@example.com',
  age: '20',
  major: 'Computer Science',
  campus: 'Main Campus'
};

test.describe('Student Modal Form', () => {
  test.beforeAll(async ({ request }) => {
    try {
      const response = await request.get('http://localhost:5173/health');
      if (!response.ok()) {
        test.skip();
      }
    } catch (error) {
      test.skip();
      console.log(error);
    }
  });

  async function fillStudentForm(page: Page, data = mockStudent) {
    await page.fill('input[name="full_name"]', data.full_name);
    await page.fill('input[name="email"]', data.email);
    await page.fill('input[name="age"]', data.age);
    await page.fill('input[name="major"]', data.major);
    await page.fill('input[name="campus"]', data.campus);
  }

  test.beforeEach(async ({ page }) => {
    await test.step('Setup', async () => {
      await page.goto('http://localhost:5173');
      await page.waitForLoadState('networkidle');
      await page.click('text=Add New Student', { timeout: 5000 });
    });
  });

  test('should display modal with empty form fields for new student', async ({ page }) => {
    await test.step('Verify empty form', async () => {
      await expect(page.locator('h2:has-text("Add New Student")')).toBeVisible();
      await expect(page.locator('input[name="full_name"]')).toHaveValue('');
      await expect(page.locator('input[name="email"]')).toHaveValue('');
      await expect(page.locator('input[name="age"]')).toHaveValue('');
      await expect(page.locator('input[name="major"]')).toHaveValue('');
      await expect(page.locator('input[name="campus"]')).toHaveValue('');
    });
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    await test.step('Fill and submit form', async () => {
      await fillStudentForm(page);
      await page.click('button:has-text("Add Student")');
    });

    await test.step('Verify submission', async () => {
      await expect(page.locator('h2:has-text("Add New Student")')).not.toBeVisible();
      await expect(page.locator(`text=${mockStudent.full_name}`)).toBeVisible();
    });
  });

  test('should validate required fields', async ({ page }) => {
    await test.step('Submit empty form', async () => {
      await page.click('button:has-text("Add Student")');
      const fullNameInput = page.locator('input[name="full_name"]');
      await expect(fullNameInput).toBeFocused();
      const isValid = await fullNameInput.evaluate(el => (el as HTMLInputElement).validity.valid);
      expect(isValid).toBeFalsy();
    });
  });

  test('should validate email format', async ({ page }) => {
    await test.step('Test invalid email', async () => {
      await page.fill('input[name="email"]', 'invalid-email');
      const emailInput = page.locator('input[name="email"]');
      const isValid = await emailInput.evaluate(el => (el as HTMLInputElement).validity.valid);
      expect(isValid).toBeFalsy();
    });

    await test.step('Test valid email', async () => {
      await page.fill('input[name="email"]', mockStudent.email);
      const emailInput = page.locator('input[name="email"]');
      const isValid = await emailInput.evaluate(el => (el as HTMLInputElement).validity.valid);
      expect(isValid).toBeTruthy();
    });
  });

  test('should validate age range', async ({ page }) => {
    await test.step('Test age validation', async () => {
      await page.fill('input[name="age"]', '15');
      expect(await page.locator('input[name="age"]')
        .evaluate(el => (el as HTMLInputElement).validity.valid)).toBeFalsy();
      await page.fill('input[name="age"]', '101');
      expect(await page.locator('input[name="age"]')
        .evaluate(el => (el as HTMLInputElement).validity.valid)).toBeFalsy();

      await page.fill('input[name="age"]', '20');
      expect(await page.locator('input[name="age"]')
        .evaluate(el => (el as HTMLInputElement).validity.valid)).toBeTruthy();
    });
  });

  test('should correctly load and edit existing student data', async ({ page }) => {
    await test.step('Create and edit student', async () => {
      await fillStudentForm(page);
      await page.click('button:has-text("Add Student")');
      
      await page.click('[data-testid="edit-student"]');
      await expect(page.locator('input[name="full_name"]')).toHaveValue(mockStudent.full_name);
      await expect(page.locator('input[name="email"]')).toHaveValue(mockStudent.email);
      await expect(page.locator('input[name="age"]')).toHaveValue(mockStudent.age);
      
      await page.fill('input[name="full_name"]', 'Jane Updated Smith');
      await page.click('button:has-text("Update Student")');
      await expect(page.locator('text=Jane Updated Smith')).toBeVisible();
    });
  });

  test('should close modal when clicking close button', async ({ page }) => {
    await test.step('Close modal', async () => {
      await page.click('button:has-text("×")');
      await expect(page.locator('.modal')).not.toBeVisible();
    });
  });
});