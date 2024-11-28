import { render, screen, cleanup } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";
import { it, expect, describe, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("TermsAndConditions Component", () => {
    afterEach(() => {
        cleanup();
    });

    const renderComponent = () => {
        render(<TermsAndConditions />);

        return {
            heading: screen.getByRole("heading", { name: "Terms & Conditions" }),
            checkbox: screen.getByRole("checkbox", { name: /i accept the terms and conditions/i }),
            btn: screen.getByRole("button", { name: /submit/i }),
        };
    };

    it("should render with correct text and initial state", () => {
        const { heading, checkbox, btn } = renderComponent();

        expect(heading).toBeInTheDocument();
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
        expect(btn).toBeInTheDocument();
        expect(btn).toHaveTextContent(/submit/i);
        expect(btn).toBeDisabled();
    });

    it("should enable the button when the checkbox is checked", async () => {
        const { checkbox, btn } = renderComponent();
        const user = userEvent.setup();

        await user.click(checkbox);

        expect(checkbox).toBeChecked();
        expect(btn).toBeEnabled();
    });

    it("should disable the button when the checkbox is unchecked after being checked", async () => {
        const { checkbox, btn } = renderComponent();
        const user = userEvent.setup();

        await user.click(checkbox);
        expect(btn).toBeEnabled();

        await user.click(checkbox);
        expect(btn).toBeDisabled();
    });
});
