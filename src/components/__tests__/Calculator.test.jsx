import {render, screen, fireEvent} from "@testing-library/react";
import Calculator from "../Calculator";

describe("Calc Component", () => {
    beforeEach(() => {
        render(<Calculator/>);
    });
    
    test('should render with 0', () => {
        expect(screen.getByTestId("calc-display")).toHaveTextContent("0");
    });

    test('should display digits', () => {
        fireEvent.click(screen.getByTestId("btn-1"));
        fireEvent.click(screen.getByTestId("btn-2"));
        fireEvent.click(screen.getByTestId("btn-3"));
        expect(screen.getByTestId("calc-display")).toHaveTextContent("123");
    });

    test('should perform addition', () => {
        fireEvent.click(screen.getByTestId("btn-5"));
        fireEvent.click(screen.getByTestId("btn-add"));
        fireEvent.click(screen.getByTestId("btn-3"));
        fireEvent.click(screen.getByTestId("btn-equals"));
        expect(screen.getByTestId("calc-display")).toHaveTextContent("8");
    });
});