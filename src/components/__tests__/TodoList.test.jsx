import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../../TodoList";

describe("TodoList Component", () => {
	test("should render empty state initially", () => {
		render(<TodoList />);

		const emptyMessage = screen.getByTestId("empty-message");
		expect(emptyMessage).toHaveTextContent("No todos yet");
	});

	test("should toggle todo completion status", () => {
		render(<TodoList />);

		const input = screen.getByTestId("todo-input");
		const form = screen.getByTestId("todo-form");

		fireEvent.change(input, { target: { value: "Test" } });
		fireEvent.click(form);

		const checkbox = screen.getByRole("checkbox");

		expect(checkbox).not.toBeChecked();

		fireEvent.click(checkbox);

		expect(checkbox).toBeChecked();
	});

	test("should filter todos by completion status", () => {
		render(<TodoList />);

		const input = screen.getByTestId("todo-input");
		const form = screen.getByTestId("todo-form");

		fireEvent.change(input, { target: { value: "Task 1" } });
		fireEvent.click(form);

		fireEvent.change(input, { target: { value: "Task 2" } });
		fireEvent.click(form);

		const checkboxes = screen.getAllByRole("checkbox");
		fireEvent.click(checkboxes[0]);

		const filterButton = screen.getByTestId("filter-completed");
		fireEvent.click(filterButton);

		const todoList = screen.getByTestId("todo-list");
		expect(todoList.children.length).toBe(1);
	});
});
