import { multiply, fibonacci, gcd, lcm } from "../mathUtils";

describe("mathUtils", () => {
  // ==================== STUDENT EXERCISES ====================
  // 1 Basic Test + 2 Complex Tests

  /**
   * EXERCISE 1 (Basic): Test the multiply() function
   *
   * HINTS:
   * - Test positive numbers: 4 * 3 = 12
   * - Test negative numbers: -2 * 3 = -6
   * - Consider testing: negative * negative, zero multiplication
   */
  test("should multiply two numbers correctly", () => {
    // Test 1: Multiply positive numbers
    expect(multiply(4, 3)).toBe(12);

    // Test 2: Multiply with negative number
    expect(multiply(-2, 3)).toBe(-6);
  });

  /**
   * EXERCISE 2 (Complex): Test fibonacci sequence and verify mathematical properties
   *
   * HINTS:
   * - fibonacci(n) returns the nth Fibonacci number
   * - Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...
   * - Map over [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(fibonacci)
   * - Result should be: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
   * - Verify the mathematical property: F(n) = F(n-1) + F(n-2)
   * - Use a for loop to check fibonacci(i) === fibonacci(i-1) + fibonacci(i-2)
   * - Negative numbers should throw: expect(() => fibonacci(-1)).toThrow()
   */
  test("should compute fibonacci sequence and verify mathematical properties", () => {
    // Test 1: Map fibonacci over [0-10] and check sequence
    const sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(fibonacci);
    expect(sequence).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);

    // Test 2: Verify F(n) = F(n-1) + F(n-2) for i = 2 to 10
    for (let i = 2; i <= 10; i++) {
      expect(fibonacci(i)).toBe(fibonacci(i - 1) + fibonacci(i - 2));
    }

    // Test 3: Test error handling for negative numbers
    expect(() => fibonacci(-1)).toThrow();
  });

  /**
   * EXERCISE 3 (Complex): Test GCD and LCM with mathematical relationship verification
   *
   * HINTS:
   * - gcd(48, 18) = 6 (Greatest Common Divisor)
   * - gcd(100, 25) = 25
   * - gcd(17, 13) = 1 (coprime numbers)
   * - lcm(4, 6) = 12 (Least Common Multiple)
   * - lcm(21, 6) = 42
   * - IMPORTANT: Verify the relationship: GCD(a,b) * LCM(a,b) = a * b
   * - Test with negative numbers: gcd(-48, 18) should still be 6
   */
  test("should find GCD and LCM with verification of mathematical relationship", () => {
    // Test 1: GCD tests (48,18), (100,25), (17,13)
    expect(gcd(48, 18)).toBe(6);
    expect(gcd(100, 25)).toBe(25);
    expect(gcd(17, 13)).toBe(1);

    // Test 2: LCM tests (4,6), (21,6)
    expect(lcm(4, 6)).toBe(12);
    expect(lcm(21, 6)).toBe(42);

    // Test 3: Verify GCD(a,b) * LCM(a,b) === a * b for a=48, b=18
    expect(gcd(48, 18) * lcm(48, 18)).toBe(48 * 18);

    // Test 4: Test with negative numbers
    expect(gcd(-48, 18)).toBe(6);
  });
});