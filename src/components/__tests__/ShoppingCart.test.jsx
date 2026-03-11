import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShoppingCart from "../../ShoppingCart";

describe("ShoppingCart Component", () => {
	// ==================== STUDENT EXERCISES ====================
	// 1 Basic Test + 2 Complex Tests

	/**
	 * EXERCISE 1 (Basic): Test empty cart state
	 *
	 * HINTS:
	 * - Use render(<ShoppingCart />) to mount the component
	 * - Empty cart message has testId "empty-cart"
	 * - Should display "Your cart is empty"
	 * - Use .toHaveTextContent() for text verification
	 */
	test("should render empty cart message initially", () => {
		// TODO: Implement this test
		// Step 1: Render ShoppingCart
		render(<ShoppingCart />);
		// Step 2: Assert empty-cart element shows "Your cart is empty"
		const emptyCartMessage = screen.getByTestId("empty-cart");
		expect(emptyCartMessage).toHaveTextContent("Your cart is empty");
	});

	/**
	 * EXERCISE 2 (Complex): Test adding an item to cart
	 *
	 * HINTS:
	 * - This is async - use async/await with userEvent
	 * - Product name input has testId "product-name-input"
	 * - Product price input has testId "product-price-input"
	 * - Add button has testId "add-item-btn"
	 *
	 * Test sequence:
	 * 1. Type "Apple" in name input
	 * 2. Type "1.50" in price input
	 * 3. Click add button
	 * 4. Assert empty-cart is NOT in document: expect(...).not.toBeInTheDocument()
	 * 5. Assert cart-items IS in document
	 *
	 * Use screen.queryByTestId() for checking element doesn't exist
	 */
	test("should add an item to cart", async () => {
		// TODO: Implement this test
		// Step 1: Render ShoppingCart
		render(<ShoppingCart />);
		// Step 2: Type "Apple" in product name input
		const productNameInput = screen.getByTestId("product-name-input");
		await userEvent.type(productNameInput, "Apple");
		// Step 3: Type "1.50" in product price input
		const productPriceInput = screen.getByTestId("product-price-input");
		await userEvent.type(productPriceInput, "1.50");
		// Step 4: Click add item button
		const addItemBtn = screen.getByTestId("add-item-btn");
		await userEvent.click(addItemBtn);
		// Step 5: Assert empty cart message is gone
		const emptyCartMessage = screen.queryByTestId("empty-cart");
		expect(emptyCartMessage).not.toBeInTheDocument();
		// Step 6: Assert cart items container exists
		const cartItems = screen.getByTestId("cart-items");
		expect(cartItems).toBeInTheDocument();
	});

	/**
	 * EXERCISE 3 (Complex): Test total calculation with tax
	 *
	 * HINTS:
	 * - Add an item with price $10.00
	 * - Tax rate is 10% (hardcoded in component)
	 * - Subtotal testId: "subtotal" → should show "$10.00"
	 * - Tax testId: "tax" → should show "$1.00"
	 * - Total testId: "total" → should show "$11.00"
	 *
	 * Test sequence:
	 * 1. Add item "Apple" with price "10.00"
	 * 2. Click add button
	 * 3. Check subtotal is "$10.00"
	 * 4. Check tax is "$1.00"
	 * 5. Check total is "$11.00"
	 */
	test("should calculate correct total with tax", async () => {
		// TODO: Implement this test
		// Step 1: Render ShoppingCart
		render(<ShoppingCart />);
		// Step 2: Add an item with price $10.00
		const productNameInput = screen.getByTestId("product-name-input");
		const productPriceInput = screen.getByTestId("product-price-input");
		const addItemBtn = screen.getByTestId("add-item-btn");
		await userEvent.type(productNameInput, "Apple");
		await userEvent.type(productPriceInput, "10.00");
		await userEvent.click(addItemBtn);

		// Step 3: Assert subtotal shows "$10.00"
		const subtotal = screen.getByTestId("subtotal");
		expect(subtotal).toHaveTextContent("$10.00");
		// Step 4: Assert tax shows "$1.00"
		const tax = screen.getByTestId("tax");
		expect(tax).toHaveTextContent("$1.00");
		// Step 5: Assert total shows "$11.00"
		const total = screen.getByTestId("total");
		expect(total).toHaveTextContent("$11.00");
	});
});
