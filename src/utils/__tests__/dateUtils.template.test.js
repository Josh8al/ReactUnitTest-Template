import {
  daysBetween,
  addDays,
  addMonths,
  addYears,
  isLeapYear,
  getDaysInMonth,
  isSameDay,
  isBefore,
  isAfter,
  isBetween,
} from "../dateUtils";

describe("dateUtils", () => {
  // ==================== STUDENT EXERCISES ====================
  // 1 Basic Test + 2 Complex Tests

  /**
   * EXERCISE 1 (Basic): Test the daysBetween() function
   *
   * HINTS:
   * - daysBetween(date1, date2) returns the number of days between two dates
   * - Create dates using: new Date("2024-03-01") and new Date("2024-03-15")
   * - The result should be 14 days
   * - The function returns absolute value (order doesn't matter)
   */
  test("should calculate days between two dates", () => {
    // Test: Calculate days between March 1 and March 15
    expect(daysBetween(new Date("2024-03-01"), new Date("2024-03-15"))).toBe(14);
  });

  /**
   * EXERCISE 2 (Complex): Test date arithmetic across month and year boundaries
   *
   * HINTS:
   * - addDays(date, days) adds days to a date
   * - Adding days across month boundary:
   *   - new Date("2024-01-30") + 5 days → February 4
   *   - Check: result.getMonth() === 1 (February), result.getDate() === 4
   *
   * - addMonths(date, months) adds months to a date
   * - Jan 31 + 1 month rolls to March (Feb doesn't have 31 days)
   *   - new Date("2024-01-31") + 1 month → March (month 2)
   *
   * - addYears(date, years) adds years to a date
   * - Leap year transition:
   *   - new Date("2024-02-29") + 1 year → March 1, 2025 (Feb 29 doesn't exist in 2025)
   *
   * - Negative arithmetic:
   *   - new Date("2024-03-15") - 20 days → February (month 1)
   */
  test("should handle date arithmetic across month and year boundaries", () => {
    // Test 1: Add 5 days to Jan 30 → should be Feb 4
    const feb4 = addDays(new Date("2024-01-30"), 5);
    expect(feb4.getMonth()).toBe(1);
    expect(feb4.getDate()).toBe(4);

    // Test 2: Add 1 month to Jan 31 → should roll to March
    const march = addMonths(new Date("2024-01-31"), 1);
    expect(march.getMonth()).toBe(2);

    // Test 3: Add 1 year to Feb 29 (leap year) → should be March 1
    const nextYear = addYears(new Date("2024-02-29"), 1);
    expect(nextYear.getMonth()).toBe(2);
    expect(nextYear.getDate()).toBe(1);

    // Test 4: Subtract 20 days from March 15 → should be in February
    const feb = addDays(new Date("2024-03-15"), -20);
    expect(feb.getMonth()).toBe(1);
  });

  /**
   * EXERCISE 3 (Complex): Test leap years and days in month calculations
   *
   * HINTS:
   * - isLeapYear(year) returns true/false
   *   - 2024 → true (divisible by 4)
   *   - 2023 → false (not divisible by 4)
   *   - 2000 → true (divisible by 400)
   *   - 1900 → false (divisible by 100 but NOT 400)
   *   - 2100 → false (divisible by 100 but NOT 400)
   *
   * - getDaysInMonth(date) returns number of days in that month
   *   - February 2024 (leap year) → 29 days
   *   - February 2023 (non-leap) → 28 days
   *   - January → 31 days
   *   - April → 30 days
   *   - December → 31 days
   */
  test("should validate leap years and days in month calculations", () => {
    // Test 1: Leap year tests (2024, 2023, 2000, 1900, 2100)
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2100)).toBe(false);

    // Test 2: Days in February for leap vs non-leap year
    expect(getDaysInMonth(new Date("2024-02-01"))).toBe(29);
    expect(getDaysInMonth(new Date("2023-02-01"))).toBe(28);

    // Test 3: Days in various months (Jan, April, December)
    expect(getDaysInMonth(new Date("2024-01-01"))).toBe(31);
    expect(getDaysInMonth(new Date("2024-04-01"))).toBe(30);
    expect(getDaysInMonth(new Date("2024-12-01"))).toBe(31);
  });
});