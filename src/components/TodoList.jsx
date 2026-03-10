import { useState } from "react";

/**
 * TodoList Component - Complex stateful component for testing CRUD operations
 */
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    if (editText.trim() === "") {
      deleteTodo(id);
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editText.trim() } : todo,
        ),
      );
    }
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const toggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;
  const completedTodoCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="todo-list">
      <h2>Todo List</h2>

      <form onSubmit={addTodo} data-testid="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          data-testid="todo-input"
        />
        <button type="submit" data-testid="add-todo-btn">
          Add
        </button>
      </form>

      {todos.length > 0 && (
        <>
          <div className="todo-controls">
            <button onClick={toggleAll} data-testid="toggle-all-btn">
              {todos.every((todo) => todo.completed)
                ? "Uncheck All"
                : "Check All"}
            </button>
            <div className="filters">
              <button
                onClick={() => setFilter("all")}
                className={filter === "all" ? "active" : ""}
                data-testid="filter-all"
              >
                All ({todos.length})
              </button>
              <button
                onClick={() => setFilter("active")}
                className={filter === "active" ? "active" : ""}
                data-testid="filter-active"
              >
                Active ({activeTodoCount})
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={filter === "completed" ? "active" : ""}
                data-testid="filter-completed"
              >
                Completed ({completedTodoCount})
              </button>
            </div>
            {completedTodoCount > 0 && (
              <button
                onClick={clearCompleted}
                data-testid="clear-completed-btn"
              >
                Clear Completed
              </button>
            )}
          </div>

          <ul className="todos" data-testid="todo-list">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={todo.completed ? "completed" : ""}
                data-testid={`todo-item-${todo.id}`}
              >
                {editingId === todo.id ? (
                  <div className="editing">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(todo.id);
                        if (e.key === "Escape") cancelEdit();
                      }}
                      data-testid="edit-input"
                      autoFocus
                    />
                    <button
                      onClick={() => saveEdit(todo.id)}
                      data-testid="save-edit-btn"
                    >
                      Save
                    </button>
                    <button onClick={cancelEdit} data-testid="cancel-edit-btn">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      data-testid={`todo-checkbox-${todo.id}`}
                    />
                    <span
                      onDoubleClick={() => startEditing(todo.id, todo.text)}
                      data-testid={`todo-text-${todo.id}`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      data-testid={`delete-todo-${todo.id}`}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {todos.length === 0 && (
        <p data-testid="empty-message">No todos yet. Add one above!</p>
      )}
    </div>
  );
}

export default TodoList;
