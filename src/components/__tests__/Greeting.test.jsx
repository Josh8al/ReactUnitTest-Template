import { render, screen } from "@testing-library/react"
import Greeting from "../Greeting";

describe('Greeting Component', () => {
    test("Should display provided name", () => {
        render(<Greeting name="Edwin"/>);
        expect(screen.getByTestId("greeting-message")).toHaveTextContent("Edwin");
    });

    test("Should display provided name", () => {
        render(<Greeting/>);
        expect(screen.getByTestId("greeting-message")).toHaveTextContent("Guest");
    });
})