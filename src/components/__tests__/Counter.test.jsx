import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../../Counter";

describe("Counter Component", () => {
	// ==================== STUDENT EXERCISES ====================

	/**
	 * EXERCISE 1 (Basic): Test increment functionality
	 *
	 * HINTS:
	 * - Use render(<Counter />) to mount the component
	 * - Counter starts at 0 by default
	 * - Increment button has testId "increment-btn"
	 * - Count display has testId "count-value"
	 * - After clicking increment, count should be "1"
	 * - Use fireEvent.click() to simulate the click
	 */
	test("should increment count when clicking increment button", () => {
		// TODO: Implement this test
		// Step 1: Render the Counter component
		render(<Counter />);
		// Step 2: Click the increment button
		const incrementBtn = screen.getByTestId("increment-btn");
		fireEvent.click(incrementBtn);
		// Step 3: Assert count shows "1"
		const countValue = screen.getByTestId("count-value");
		expect(countValue).toHaveTextContent("1");
	});

	/**
	 * EXERCISE 2 (Complex): Test reset functionality with initial value
	 *
	 * HINTS:
	 * - Counter accepts an initialValue prop: <Counter initialValue={10} />
	 * - After incrementing, clicking reset should return to initial value
	 * - Reset button has testId "reset-btn"
	 *
	 * Test sequence:
	 * 1. Render with initialValue={10}
	 * 2. Click increment (count becomes 11)
	 * 3. Click reset
	 * 4. Verify count returns to "10"
	 */
	test("should reset to initial value when clicking reset button", () => {
		// TODO: Implement this test
		// Step 1: Render Counter with initialValue={10}
		render(<Counter initialValue={10} />);
		// Step 2: Click increment button
		const incrementBtn = screen.getByTestId("increment-btn");
		fireEvent.click(incrementBtn);
		// Step 3: Click reset button
		const resetBtn = screen.getByTestId("reset-btn");
		fireEvent.click(resetBtn);
		// Step 4: Assert count shows "10" (initial value)
		const countValue = screen.getByTestId("count-value");
		expect(countValue).toHaveTextContent("10");
	});

	/**
	 * EXERCISE 3 (Complex): Test min/max boundaries
	 *
	 * HINTS:
	 * - Counter accepts min and max props: <Counter initialValue={0} min={0} max={2} />
	 * - When at min (0), decrement should NOT decrease below 0
	 * - When at max (2), increment should NOT increase above 2
	 *
	 * Test sequence:
	 * 1. Render with initialValue={0}, min={0}, max={2}
	 * 2. Click decrement (should stay at 0)
	 * 3. Assert still "0"
	 * 4. Click increment 3 times (should stop at 2)
	 * 5. Assert shows "2" (not 3)
	 */
	test("should respect min and max boundaries", () => {
		// TODO: Implement this test
		// Step 1: Render Counter with min={0}, max={2}
		render(<Counter initialValue={0} min={0} max={2} />);
		// Step 2: Try to decrement below 0
		const decrementBtn = screen.getByTestId("decrement-btn");
		fireEvent.click(decrementBtn);
		// Step 3: Assert stays at "0"
		const countValue = screen.getByTestId("count-value");
		expect(countValue).toHaveTextContent("0");
		// Step 4: Increment 3 times
		const incrementBtn = screen.getByTestId("increment-btn");
		fireEvent.click(incrementBtn);
		fireEvent.click(incrementBtn);
		fireEvent.click(incrementBtn);
		// Step 5: Assert stops at "2"
		expect(countValue).toHaveTextContent("2");
	});
});
