/**
 * Pure Utility Functions for Math Operations
 * These functions are ideal for unit testing as they have no side effects
 */

// Basic arithmetic operations
export const add = (a, b) => a + b;

export const subtract = (a, b) => a - b;

export const multiply = (a, b) => a * b;

export const divide = (a, b) => {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
};

// More complex math operations
export const factorial = (n) => {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
};

export const fibonacci = (n) => {
  if (n < 0) {
    throw new Error("Fibonacci is not defined for negative numbers");
  }
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

export const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

export const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

export const lcm = (a, b) => {
  return Math.abs(a * b) / gcd(a, b);
};

// Statistical functions
export const average = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error("Input must be a non-empty array");
  }
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

export const median = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error("Input must be a non-empty array");
  }
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

export const standardDeviation = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error("Input must be a non-empty array");
  }
  const avg = average(numbers);
  const squareDiffs = numbers.map((num) => Math.pow(num - avg, 2));
  return Math.sqrt(average(squareDiffs));
};

// Range and clamp functions
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

export const percentage = (value, total) => {
  if (total === 0) {
    throw new Error("Total cannot be zero");
  }
  return (value / total) * 100;
};

export const round = (value, decimals = 0) => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};
