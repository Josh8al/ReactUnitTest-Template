import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserList from "../../UserList";

describe("UserList Component", () => {
	// ==================== STUDENT EXERCISES ====================

	// Mock user data for testing
	const mockUsers = [
		{ id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28 },
		{ id: 2, name: "Bob Smith", email: "bob@example.com", age: 34 },
	];

	/**
	 * EXERCISE 1 (Basic): Test loading state
	 *
	 * HINTS:
	 * - Create a mock fetch that never resolves: jest.fn(() => new Promise(() => {}))
	 * - Pass it to UserList: <UserList fetchUsers={mockFetch} />
	 * - Loading element has testId "loading"
	 * - Should show "Loading users..."
	 *
	 * The mock that never resolves keeps the component in loading state:
	 * const mockFetch = jest.fn(() => new Promise(() => {}));
	 */
	test("should show loading state initially", () => {
		// TODO: Implement this test
		// Step 1: Create mock fetch that never resolves
		const mockFetch = jest.fn(() => new Promise(() => {}));
		// Step 2: Render UserList with fetchUsers={mockFetch}
		render(<UserList fetchUsers={mockFetch} />);
		// Step 3: Assert loading element shows "Loading users..."
		const loadingElement = screen.getByTestId("loading");
		expect(loadingElement).toHaveTextContent("Loading users...");
	});

	/**
	 * EXERCISE 2 (Complex): Test rendering users after successful fetch
	 *
	 * HINTS:
	 * - Create mock that resolves with data: jest.fn().mockResolvedValue(mockUsers)
	 * - This is async - use async/await
	 * - Use waitFor() to wait for loading to complete
	 * - After loading, "users-table" element should exist
	 * - Each user row has testId "user-row-{id}" (e.g., "user-row-1", "user-row-2")
	 *
	 * Structure:
	 * test("...", async () => {
	 *   const mockFetch = jest.fn().mockResolvedValue(mockUsers);
	 *   render(<UserList fetchUsers={mockFetch} />);
	 *   await waitFor(() => {
	 *     expect(screen.getByTestId("users-table")).toBeInTheDocument();
	 *   });
	 *   // Check for user rows...
	 * });
	 */
	test("should render users after loading", async () => {
		// TODO: Implement this test
		// Step 1: Create mock fetch that resolves with mockUsers
		const mockFetch = jest.fn().mockResolvedValue(mockUsers);
		// Step 2: Render UserList
		render(<UserList fetchUsers={mockFetch} />);
		// Step 3: Wait for users-table to appear
		await waitFor(() => {
			expect(screen.getByTestId("users-table")).toBeInTheDocument();
		});
		// Step 4: Assert user-row-1 exists
		const userRow1 = screen.getByTestId("user-row-1");
		expect(userRow1).toBeInTheDocument();
		// Step 5: Assert user-row-2 exists
		const userRow2 = screen.getByTestId("user-row-2");
		expect(userRow2).toBeInTheDocument();
	});

	/**
	 * EXERCISE 3 (Complex): Test filtering users by search term
	 *
	 * HINTS:
	 * - Create mock that resolves with mockUsers
	 * - Wait for table to load first
	 * - Search input has testId "search-input"
	 * - Type "Alice" in search input using userEvent.type()
	 * - After filtering:
	 *   - user-row-1 (Alice) SHOULD be in document
	 *   - user-row-2 (Bob) should NOT be in document
	 *
	 * Use screen.queryByTestId() to check element doesn't exist:
	 * expect(screen.queryByTestId("user-row-2")).not.toBeInTheDocument()
	 */
	test("should filter users by search term", async () => {
		// TODO: Implement this test
		// Step 1: Create mock fetch with mockUsers
		const mockFetch = jest.fn().mockResolvedValue(mockUsers);

		// Step 2: Render UserList
		render(<UserList fetchUsers={mockFetch} />);
		// Step 3: Wait for table to load
		await waitFor(() => {
			expect(screen.getByTestId("users-table")).toBeInTheDocument();
		});
		// Step 4: Type "Alice" in search input
		const searchInput = screen.getByTestId("search-input");
		await userEvent.type(searchInput, "Alice");
		// Step 5: Assert user-row-1 (Alice) is visible
		const userRow1 = screen.getByTestId("user-row-1");
		expect(userRow1).toBeInTheDocument();
		// Step 6: Assert user-row-2 (Bob) is NOT visible
		const userRow2 = screen.queryByTestId("user-row-2");
		expect(userRow2).not.toBeInTheDocument();
	});
});
