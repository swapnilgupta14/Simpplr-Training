import { test, expect } from "@playwright/test";

test.describe("Form Tests", () => {
    test.beforeEach(async ({ page }) => {
        // Clear todos before each test to ensure clean state
        await page.route("**/todos", async route => {
            if (route.request().method() === "GET") {
                await route.fulfill({ json: { todos: [] } });
            } else {
                await route.continue();
            }
        });
    });

    test("should render form and handle input, submission", async ({ page }) => {
        await page.goto("http://localhost:5173/form");
        await expect(page.locator("h1")).toHaveText("Todo List");
        await expect(page.locator("[data-testid=todo-input]")).toBeVisible();
        await expect(page.locator("[data-testid=submit-button]")).toBeVisible();

        // Clear existing todos and mock the POST response
        await page.route("**/todos", async route => {
            if (route.request().method() === "POST") {
                await route.fulfill({
                    json: {
                        todo: {
                            id: 1,
                            text: "Test Input"
                        }
                    }
                });
            }
        });

        const input = page.locator("[data-testid=todo-input]");
        await input.fill("Test Input");
        await page.locator("[data-testid=submit-button]").click();

        await expect(page.locator("h2")).toHaveText("Submitted Todos:");
        await expect(page.locator("[data-testid=todos-list] li").first()).toHaveText("Test Input");
    });

    test("should navigate to the home page when the back button is clicked", async ({ page }) => {
        await page.goto("http://localhost:5173/form");
        await page.locator("button:has-text('<')").click();
        await expect(page).toHaveURL("http://localhost:5173/home");
    });

    test("should handle API errors gracefully", async ({ page }) => {
        await page.route("**/todos", route => route.fulfill({
            status: 500,
            body: "Internal Server Error"
        }));
        
        await page.goto("http://localhost:5173/form");
        await expect(page.locator("[role=alert]")).toHaveText("Failed to fetch todos");
    });

    test("should handle multiple submissions", async ({ page }) => {
        await page.goto("http://localhost:5173/form");

        // Mock the POST responses with different IDs
        let todoId = 1;
        await page.route("**/todos", async route => {
            if (route.request().method() === "POST") {
                const requestBody = JSON.parse(await route.request().postData() || "{}");
                await route.fulfill({
                    json: {
                        todo: {
                            id: todoId++,
                            text: requestBody.text
                        }
                    }
                });
            }
        });

        const input = page.locator("[data-testid=todo-input]");
        const submitButton = page.locator("[data-testid=submit-button]");

        // First submission
        await input.fill("First Submission");
        await submitButton.click();

        // Second submission
        await input.fill("Second Submission");
        await submitButton.click();

        const todos = page.locator("[data-testid=todos-list] li");
        await expect(todos.first()).toHaveText("First Submission");
        await expect(todos.nth(1)).toHaveText("Second Submission");
    });
});

test.describe("API Tests", () => {
    test("Get Todos", async ({ request }) => {
        const response = await request.get("http://localhost:5000/todos");
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        expect(Array.isArray(data.todos)).toBeTruthy();
        expect(data.todos.length).toBeGreaterThanOrEqual(0);
        
        if (data.todos.length > 0) {
            expect(typeof data.todos[0].id).toBe("number");
            expect(typeof data.todos[0].text).toBe("string");
        }
    });

    test("Add Todo", async ({ request }) => {
        const todoText = "Task 1";
        const newTodo = await request.post("http://localhost:5000/todos", {
            data: { text: todoText }
        });
        expect(newTodo.ok()).toBeTruthy();
        
        const response = await request.get("http://localhost:5000/todos");
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        const addedTodo = data.todos.find((todo: { text: string }) => todo.text === todoText);
        expect(addedTodo).toBeTruthy();
        expect(typeof addedTodo.id).toBe("number");
    });
});