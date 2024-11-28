import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductImageGallary from "../../src/components/ProductImageGallery";
import "@testing-library/jest-dom/vitest";


describe('ProductIMageGallary', () => {

    it( "should not render anything if arr is empty", () => {
        const {container} = render(<ProductImageGallary imageUrls={[]}/>)
        expect(container).toBeEmptyDOMElement();
    })

    it("should render a list of images", () => {
        const imageUrls = ['url1', 'url2'];

        render(<ProductImageGallary imageUrls={imageUrls} />)
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
        imageUrls.forEach( (item, index) => {
            expect(images[index]).toHaveAttribute("src", item)
        })
    })
})