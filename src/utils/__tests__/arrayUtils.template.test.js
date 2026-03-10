import { unique, deepFlatten, sum, range, groupBy } from "../arrayUtils";

describe("arrayUtils", () => {
  // ==================== STUDENT EXERCISES ====================
  // 1 Basic Test + 2 Complex Tests

  /**
   * EXERCISE 1 (Basic): Test the unique() function
   *
   * HINTS:
   * - unique() removes duplicate values from an array
   * - Test with numbers: [1, 2, 2, 3, 3, 3] should become [1, 2, 3]
   * - Test with strings: ["a", "b", "a"] should become ["a", "b"]
   * - Use toEqual() matcher for array comparisons
   */
  test("should return unique values from array", () => {
    // Test 1: Remove duplicate numbers
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);

    // Test 2: Remove duplicate strings
    expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
  });

  /**
   * EXERCISE 2 (Complex): Test deep flatten, sum, and range generation together
   *
   * HINTS:
   * - deepFlatten() completely flattens nested arrays at ANY depth
   * - Input: [[1, [2, [3]]], [[4, 5]], [[[6]]]]
   * - Output: [1, 2, 3, 4, 5, 6]
   * - sum() adds all numbers in an array: sum([1,2,3,4,5,6]) = 21
   * - range(start, end) generates array from start to end-1
   * - range(1, 7) returns [1, 2, 3, 4, 5, 6]
   * - Verify: deepFlatten result equals range(1, 7)
   */
  test("should deeply flatten nested arrays and compute sum with range generation", () => {
    const nested = [[1, [2, [3]]], [[4, 5]], [[[6]]]];

    // Test 1: Deep flatten the nested array
    const flattened = deepFlatten(nested);

    // Test 2: Verify flattened result equals [1, 2, 3, 4, 5, 6]
    expect(flattened).toEqual([1, 2, 3, 4, 5, 6]);

    // Test 3: Sum the flattened array (should be 21)
    expect(sum(flattened)).toBe(21);

    // Test 4: Generate range(1, 7) and verify it equals flattened array
    expect(range(1, 7)).toEqual(flattened);
  });

  /**
   * EXERCISE 3 (Complex): Test groupBy with objects and verify group integrity
   *
   * HINTS:
   * - groupBy(array, property) groups objects by a property value
   * - Test data: employees with name, department, salary
   * - After groupBy(employees, "department"):
   *   - grouped["Engineering"] should have 3 employees
   *   - grouped["Marketing"] should have 1 employee
   *   - grouped["HR"] should have 1 employee
   * - Use Object.keys(grouped).toHaveLength(3) to verify group count
   * - Use .map() to extract salaries and sum() to total them
   *
   * Sample data:
   * const employees = [
   *   { name: "Alice", department: "Engineering", salary: 90000 },
   *   { name: "Bob", department: "Marketing", salary: 70000 },
   *   { name: "Charlie", department: "Engineering", salary: 85000 },
   *   { name: "Diana", department: "HR", salary: 65000 },
   *   { name: "Eve", department: "Engineering", salary: 95000 },
   * ];
   */
  test("should group objects by property and verify group integrity", () => {
    const employees = [
      { name: "Alice", department: "Engineering", salary: 90000 },
      { name: "Bob", department: "Marketing", salary: 70000 },
      { name: "Charlie", department: "Engineering", salary: 85000 },
      { name: "Diana", department: "HR", salary: 65000 },
      { name: "Eve", department: "Engineering", salary: 95000 },
    ];

    // Test 1: Group employees by department
    const grouped = groupBy(employees, "department");

    // Test 2: Verify there are 3 groups (Engineering, Marketing, HR)
    expect(Object.keys(grouped)).toHaveLength(3);

    // Test 3: Verify Engineering has 3 employees
    expect(grouped["Engineering"]).toHaveLength(3);

    // Test 4: Calculate total Engineering salaries (should be 270000)
    const engineeringSalaries = grouped["Engineering"].map((e) => e.salary);
    expect(sum(engineeringSalaries)).toBe(270000);
  });
});