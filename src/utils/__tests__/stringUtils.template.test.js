import {
  isPalindrome,
  toKebabCase,
  toCamelCase,
  toSnakeCase,
  extractEmails,
  extractNumbers,
  countWords,
  countOccurrences,
} from "../stringUtils";

describe("stringUtils", () => {
  // ==================== STUDENT EXERCISES ====================
  // 1 Basic Test + 2 Complex Tests

  /**
   * EXERCISE 1 (Basic): Test the isPalindrome() function
   *
   * HINTS:
   * - A palindrome reads the same forwards and backwards
   * - "racecar" is a palindrome
   * - The function ignores case and special characters
   * - "A man a plan a canal Panama" is a famous palindrome
   * - "hello" is NOT a palindrome
   */
  test("should check if string is a palindrome", () => {
    // Test 1: Simple palindrome like "racecar"
    expect(isPalindrome("racecar")).toBe(true);

    // Test 2: Palindrome with spaces and mixed case
    expect(isPalindrome("A man a plan a canal Panama")).toBe(true);

    // Test 3: Non-palindrome
    expect(isPalindrome("hello")).toBe(false);
  });

  /**
   * EXERCISE 2 (Complex): Test case format conversions (kebab, camel, snake)
   *
   * HINTS:
   * - toKebabCase("myVariableName") returns "my-variable-name"
   * - toSnakeCase("myVariableName") returns "my_variable_name"
   * - toCamelCase("my-variable-name") returns "myVariableName"
   * - toCamelCase("my_variable_name") returns "myVariableName"
   * - Test round-trip conversion: camel → kebab → camel
   * - Note: toKebabCase("XMLHttpRequest") returns "xmlhttp-request"
   * - toSnakeCase("getUserById") returns "get_user_by_id"
   */
  test("should convert between different case formats consistently", () => {
    // Test 1: camelCase to kebab-case
    expect(toKebabCase("myVariableName")).toBe("my-variable-name");

    // Test 2: camelCase to snake_case
    expect(toSnakeCase("myVariableName")).toBe("my_variable_name");

    // Test 3: kebab-case back to camelCase
    expect(toCamelCase("my-variable-name")).toBe("myVariableName");

    // Test 4: snake_case back to camelCase
    expect(toCamelCase("my_variable_name")).toBe("myVariableName");

    // Test 5: Complex conversions (XMLHttpRequest, getUserById)
    expect(toKebabCase("XMLHttpRequest")).toBe("xmlhttp-request");
    expect(toSnakeCase("getUserById")).toBe("get_user_by_id");
  });

  /**
   * EXERCISE 3 (Complex): Test data extraction from strings
   *
   * HINTS:
   * - Use this test string:
   *   "Contact us at support@example.com or sales@company.org for orders over $500. Call 123-456-7890."
   * - extractEmails(text) returns array of emails found
   *   Expected: ["support@example.com", "sales@company.org"]
   * - extractNumbers(text) returns array of numbers found
   *   Expected: [500, 123, 456, 7890]
   * - countWords(text) returns word count: 12
   * - countOccurrences(text, "or") returns 5
   *   (appears in: supp"or"t, "or", f"or", "or"ders, "or"g)
   * - Use .toHaveLength() for array length checks
   */
  test("should extract and process embedded data from strings", () => {
    const text =
      "Contact us at support@example.com or sales@company.org for orders over $500. Call 123-456-7890.";

    // Test 1: Extract emails from text
    expect(extractEmails(text)).toEqual([
      "support@example.com",
      "sales@company.org",
    ]);

    // Test 2: Verify email count is 2
    expect(extractEmails(text)).toHaveLength(2);

    // Test 3: Extract numbers from text
    expect(extractNumbers(text)).toEqual([500, 123, 456, 7890]);

    // Test 4: Count words (should be 12)
    expect(countWords(text)).toBe(12);

    // Test 5: Count "or" occurrences (should be 5)
    expect(countOccurrences(text, "or")).toBe(5);
  });
});