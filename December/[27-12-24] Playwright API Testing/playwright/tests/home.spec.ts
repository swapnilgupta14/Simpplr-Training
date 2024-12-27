import { test, expect } from "@playwright/test";

test.describe("Home Component Tests", () => {
    test("should navigate to Form page when the button is clicked", async ({ page }) => {
        await page.goto("http://localhost:5173/home");
        
        await page.click("text=Go to Form");
        
        const currentUrl = page.url();
        expect(currentUrl).toContain("/form");
        
        await expect(page.locator("h1")).toHaveText("Todo List");
    });
});