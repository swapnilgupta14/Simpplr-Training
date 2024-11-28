import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";
import { cleanup } from "@testing-library/react";
import { it, expect, describe, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("ExpandableText", () => {

    afterEach(() => {
        cleanup();
    });

    const CHARACTER_LIMIT = 255;
    const longText = "a".repeat(CHARACTER_LIMIT + 1);
    const truncatedText = longText.slice(0, CHARACTER_LIMIT) + "...";

    it("should display full text if it contains fewer than 255 characters", () => {
        const shortText = "Hey! My name is John Doe";
        render(<ExpandableText text={shortText} />);
        expect(screen.getByText(shortText)).toBeInTheDocument();
    });

    it("should truncate the text if it exceeds 255 characters", () => {
        render(<ExpandableText text={longText} />);
        expect(screen.getByText(truncatedText)).toBeInTheDocument();

        const expandButton = screen.getByRole("button");
        expect(expandButton).toBeInTheDocument();
        expect(expandButton).toHaveTextContent(/more/i);
    });

    it("should expand the text when the 'Show More' button is clicked", async () => {
        render(<ExpandableText text={longText} />);

        const expandButton = screen.getByRole("button");
        const user = userEvent.setup();
        await user.click(expandButton);

        expect(screen.getByText(longText)).toBeInTheDocument();
        expect(expandButton).toHaveTextContent(/less/i);
    });

    it("should collapse the text when the 'Show Less' button is clicked", async () => {
        render(<ExpandableText text={longText} />);
        const showMoreButton = screen.getByRole("button", { name: /more/i });
        const user = userEvent.setup();
        await user.click(showMoreButton);

        const showLessButton = screen.getByRole("button", { name: /less/i });
        await user.click(showLessButton);

        expect(screen.getByText(truncatedText)).toBeInTheDocument();
        expect(showLessButton).toHaveTextContent(/more/i);
    });

});