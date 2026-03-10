import { useState } from "react";
import "./App.css";
import {
  Counter,
  TodoList,
  LoginForm,
  RegistrationForm,
  UserList,
  Calculator,
  Greeting,
  ShoppingCart,
} from "./components";

// Mock fetch function for UserList demo
const mockFetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28 },
        { id: 2, name: "Bob Smith", email: "bob@example.com", age: 34 },
        { id: 3, name: "Charlie Brown", email: "charlie@example.com", age: 22 },
        { id: 4, name: "Diana Ross", email: "diana@example.com", age: 31 },
      ]);
    }, 500);
  });
};

function App() {
  const [activeTab, setActiveTab] = useState("greeting");

  const handleLoginSubmit = async (data) => {
    console.log("Login submitted:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleRegistrationSubmit = async (data) => {
    console.log("Registration submitted:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const tabs = [
    { id: "greeting", label: "Greeting" },
    { id: "counter", label: "Counter" },
    { id: "calculator", label: "Calculator" },
    { id: "todo", label: "Todo List" },
    { id: "cart", label: "Shopping Cart" },
    { id: "login", label: "Login Form" },
    { id: "register", label: "Registration" },
    { id: "users", label: "User List" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "greeting":
        return <Greeting name="Developer" time={new Date().getHours()} />;
      case "counter":
        return <Counter initialValue={0} step={1} min={0} max={100} />;
      case "calculator":
        return <Calculator />;
      case "todo":
        return <TodoList />;
      case "cart":
        return <ShoppingCart />;
      case "login":
        return <LoginForm onSubmit={handleLoginSubmit} />;
      case "register":
        return <RegistrationForm onSubmit={handleRegistrationSubmit} />;
      case "users":
        return <UserList fetchUsers={mockFetchUsers} />;
      default:
        return <Greeting name="Developer" />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Unit Testing Practice</h1>
        <p>A collection of components for learning Jest unit testing</p>
      </header>

      <nav className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "active" : ""}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-content">{renderContent()}</main>

      <footer className="app-footer">
        <p>
          <strong>Testable Features:</strong> Pure utility functions, stateful
          components, form validation, async data fetching
        </p>
      </footer>
    </div>
  );
}

export default App;
