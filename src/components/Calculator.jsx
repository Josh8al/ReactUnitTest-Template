import { useState } from "react";
import { add, subtract, multiply, divide } from "../utils/mathUtils";

/**
 * Calculator Component - Component using utility functions
 */
function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [error, setError] = useState("");

  const inputDigit = (digit) => {
    setError("");
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    setError("");
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setError("");
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      try {
        const result = calculate(firstOperand, inputValue, operator);
        setDisplay(String(result));
        setFirstOperand(result);
      } catch (err) {
        setError(err.message);
        setDisplay("0");
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        return;
      }
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first, second, op) => {
    switch (op) {
      case "+":
        return add(first, second);
      case "-":
        return subtract(first, second);
      case "*":
        return multiply(first, second);
      case "/":
        return divide(first, second);
      default:
        return second;
    }
  };

  const equals = () => {
    if (operator === null || firstOperand === null) return;

    const inputValue = parseFloat(display);

    try {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    } catch (err) {
      setError(err.message);
      clear();
    }
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <div className="calculator">
      <h2>Calculator</h2>

      {error && (
        <div className="calc-error" data-testid="calc-error">
          {error}
        </div>
      )}

      <div className="calc-display" data-testid="calc-display">
        {display}
      </div>

      <div className="calc-buttons">
        <button onClick={clear} data-testid="btn-clear" className="function">
          AC
        </button>
        <button
          onClick={toggleSign}
          data-testid="btn-sign"
          className="function"
        >
          +/-
        </button>
        <button
          onClick={percentage}
          data-testid="btn-percent"
          className="function"
        >
          %
        </button>
        <button
          onClick={() => performOperation("/")}
          data-testid="btn-divide"
          className={`operator ${operator === "/" ? "active" : ""}`}
        >
          ÷
        </button>

        <button onClick={() => inputDigit("7")} data-testid="btn-7">
          7
        </button>
        <button onClick={() => inputDigit("8")} data-testid="btn-8">
          8
        </button>
        <button onClick={() => inputDigit("9")} data-testid="btn-9">
          9
        </button>
        <button
          onClick={() => performOperation("*")}
          data-testid="btn-multiply"
          className={`operator ${operator === "*" ? "active" : ""}`}
        >
          ×
        </button>

        <button onClick={() => inputDigit("4")} data-testid="btn-4">
          4
        </button>
        <button onClick={() => inputDigit("5")} data-testid="btn-5">
          5
        </button>
        <button onClick={() => inputDigit("6")} data-testid="btn-6">
          6
        </button>
        <button
          onClick={() => performOperation("-")}
          data-testid="btn-subtract"
          className={`operator ${operator === "-" ? "active" : ""}`}
        >
          −
        </button>

        <button onClick={() => inputDigit("1")} data-testid="btn-1">
          1
        </button>
        <button onClick={() => inputDigit("2")} data-testid="btn-2">
          2
        </button>
        <button onClick={() => inputDigit("3")} data-testid="btn-3">
          3
        </button>
        <button
          onClick={() => performOperation("+")}
          data-testid="btn-add"
          className={`operator ${operator === "+" ? "active" : ""}`}
        >
          +
        </button>

        <button
          onClick={() => inputDigit("0")}
          data-testid="btn-0"
          className="zero"
        >
          0
        </button>
        <button onClick={inputDecimal} data-testid="btn-decimal">
          .
        </button>
        <button onClick={equals} data-testid="btn-equals" className="operator">
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
