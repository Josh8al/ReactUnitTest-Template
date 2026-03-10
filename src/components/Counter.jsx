import { useState } from "react";

/**
 * Counter Component - Stateful component for testing state changes
 */
function Counter({
  initialValue = 0,
  step = 1,
  min = -Infinity,
  max = Infinity,
}) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((prev) => Math.min(prev + step, max));
  };

  const decrement = () => {
    setCount((prev) => Math.max(prev - step, min));
  };

  const reset = () => {
    setCount(initialValue);
  };

  return (
    <div className="counter">
      <h2>Counter</h2>
      <div className="counter-display">
        <span data-testid="count-value">{count}</span>
      </div>
      <div className="counter-controls">
        <button
          onClick={decrement}
          disabled={count <= min}
          data-testid="decrement-btn"
        >
          -
        </button>
        <button onClick={reset} data-testid="reset-btn">
          Reset
        </button>
        <button
          onClick={increment}
          disabled={count >= max}
          data-testid="increment-btn"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
