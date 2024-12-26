import { test, expect } from "@playwright/test";

test.describe("Form Tests", () => {
  test("should render form and handle input, submission", async ({ page }) => {
    await page.goto("http://localhost:5173/form");
    await expect(page.locator("h1")).toHaveText("<Form");
    await expect(
      page.locator("input[placeholder='Enter Input']")
    ).toBeVisible();
    await expect(page.locator("button:has-text('Submit')")).toBeVisible();

    const input = page.locator("input[placeholder='Enter Input']");
    await input.fill("Test Input njjnjn");
    await page.locator("button:has-text('Submit')").click();

    await expect(page.locator("h2")).toHaveText("Submitted Response:");
    await expect(page.locator("p")).toHaveText("Test Input njjnjn");
  });

  test("should navigate to the home page when the back button is clicked", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/form");
    await page.locator("h1 span:has-text('<')").click();
    await expect(page).toHaveURL("http://localhost:5173/home");
  });

  test.skip("should skip", async ({ page }) => {
    await page.goto("http://localhost:5173/form");
  });

  //   ---------------------------------------------

  test.fail("should fail when req elements are missing", async ({ page }) => {
    await page.goto("http://localhost:5173/form");
    await expect(
      page.locator("button:has-text('Nonexistent Button')")
    ).toBeVisible();
  });

  test.fixme(
    "should fix the broken feature in the form component",
    async ({ page }) => {
      await page.goto("http://localhost:5173/form");
      await expect(page.locator("h1")).toHaveText("<Form");
    }
  );

  test("should handle a slow response", async ({ page }) => {
    test.slow();
    await page.goto("http://localhost:5173/form");
    await page.waitForTimeout(3000);
    await expect(page.locator("h1")).toHaveText("<Form");
  });

  //   test.only("should validate multiple submissions", async ({ page }) => {
  //     await page.goto("http://localhost:5173/form");
  //     const input = page.locator("input[placeholder='Enter Input']");
  //     const submitButton = page.locator("button:has-text('Submit')");

  //     await input.fill("First Submission");
  //     await submitButton.click();
  //     await input.fill("Second Submission");
  //     await submitButton.click();

  //     const responses = page.locator("p");
  //     await expect(responses.nth(0)).toHaveText("First Submission");
  //     await expect(responses.nth(1)).toHaveText("Second Submission");
  //   });
});
