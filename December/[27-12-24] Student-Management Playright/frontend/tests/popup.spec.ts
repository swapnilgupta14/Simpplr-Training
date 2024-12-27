import { test, expect } from '@playwright/test';
import type { Student } from '../src/types';

test.describe('Student Modal Form', () => {
  const testStudent: Student = {
    full_name: 'Test Student',
    email: 'test@example.com',
    age: 20,
    major: 'Computer Science',
    campus: 'Main Campus',
    college_degree: 'Bachelor of Science',
    branch: 'Computer Engineering',
    year: '2024'
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should display modal with empty form fields for new student', async ({ page }) => {
    await page.click('button:has-text("Add Student")');
    const modal = await page.locator('.bg-white.rounded-lg');
    await expect(modal).toBeVisible();

    await expect(page.locator('input[name="full_name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
    await expect(page.locator('input[name="age"]')).toHaveValue('');
    await expect(page.locator('select[name="major"]')).toHaveValue('');
    await expect(page.locator('select[name="campus"]')).toHaveValue('');
    await expect(page.locator('select[name="college_degree"]')).toHaveValue('');
    await expect(page.locator('select[name="branch"]')).toHaveValue('');
    await expect(page.locator('select[name="year"]')).toHaveValue('');
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    await page.click('button:has-text("Add Student")');

    await page.fill('input[name="full_name"]', testStudent.full_name);
    await page.fill('input[name="email"]', testStudent.email);
    await page.fill('input[name="age"]', testStudent.age.toString());
    await page.selectOption('select[name="major"]', testStudent.major);
    await page.selectOption('select[name="campus"]', testStudent.campus);
    await page.selectOption('select[name="college_degree"]', testStudent.college_degree);
    await page.selectOption('select[name="branch"]', testStudent.branch);
    await page.selectOption('select[name="year"]', testStudent.year);

    await page.click('button[type="submit"]');

    const modal = page.locator('.bg-white.rounded-lg');
    await expect(modal).not.toBeVisible();

    await expect(page.locator(`text=${testStudent.full_name}`)).toBeVisible();
    await expect(page.locator(`text=${testStudent.email}`)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.click('button:has-text("Add Student")');

    await page.click('button[type="submit"]');

    await expect(page.locator('[data-testid="full_name-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="age-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="major-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="campus-error"]')).toBeVisible();
  });

  test('should correctly load and edit existing student data', async ({ page }) => {
    await page.click('button:has-text("Add Student")');
    await page.fill('input[name="full_name"]', testStudent.full_name);
    await page.fill('input[name="email"]', testStudent.email);
    await page.fill('input[name="age"]', testStudent.age.toString());
    await page.selectOption('select[name="major"]', testStudent.major);
    await page.selectOption('select[name="campus"]', testStudent.campus);
    await page.selectOption('select[name="college_degree"]', testStudent.college_degree);
    await page.selectOption('select[name="branch"]', testStudent.branch);
    await page.selectOption('select[name="year"]', testStudent.year);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);

    await page.click('tr:first-child button:has-text("Edit")');

    await expect(page.locator('input[name="full_name"]')).toHaveValue(testStudent.full_name);
    await expect(page.locator('input[name="email"]')).toHaveValue(testStudent.email);
    await expect(page.locator('input[name="age"]')).toHaveValue(testStudent.age.toString());
    await expect(page.locator('select[name="major"]')).toHaveValue(testStudent.major);
    await expect(page.locator('select[name="campus"]')).toHaveValue(testStudent.campus);
  });

  test('should close modal when clicking close button', async ({ page }) => {
    await page.click('button:has-text("Add Student")');

    const modal = page.locator('.bg-white.rounded-lg');
    await expect(modal).toBeVisible();

    await page.click('button:has-text("Cancel")');

    await expect(modal).not.toBeVisible();
  });

  test('should reset form when clicking reset button', async ({ page }) => {
    await page.click('button:has-text("Add Student")');

    await page.fill('input[name="full_name"]', 'Test Name');
    await page.fill('input[name="email"]', 'test@email.com');

    await page.click('button:has-text("Reset")');

    await expect(page.locator('input[name="full_name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
  });

  test('should handle invalid email format', async ({ page }) => {
    await page.click('button:has-text("Add Student")');

    await page.fill('input[name="email"]', 'invalid-email');

    await page.click('button[type="submit"]');

    const emailError = page.locator('[data-testid="email-error"]');
    await expect(emailError).toBeVisible();
    await expect(emailError).toContainText('valid email');
  });

  test('should handle invalid age', async ({ page }) => {
    await page.click('button:has-text("Add Student")');
    await page.fill('input[name="age"]', '-1');
    await page.click('button[type="submit"]');
    const ageError = page.locator('[data-testid="age-error"]');
    await expect(ageError).toBeVisible();
    await expect(ageError).toContainText('valid age');
  });
});