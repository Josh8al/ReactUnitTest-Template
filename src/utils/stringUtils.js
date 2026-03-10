/**
 * Pure Utility Functions for String Operations
 * Great for practicing unit tests with string manipulation
 */

// Basic string operations
export const capitalize = (str) => {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str) => {
  if (typeof str !== "string") return "";
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

export const reverse = (str) => {
  if (typeof str !== "string") return "";
  return str.split("").reverse().join("");
};

export const isPalindrome = (str) => {
  if (typeof str !== "string") return false;
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
};

// Word operations
export const countWords = (str) => {
  if (typeof str !== "string" || str.trim() === "") return 0;
  return str.trim().split(/\s+/).length;
};

export const countCharacters = (str, includeSpaces = true) => {
  if (typeof str !== "string") return 0;
  return includeSpaces ? str.length : str.replace(/\s/g, "").length;
};

export const truncate = (str, maxLength, suffix = "...") => {
  if (typeof str !== "string") return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
};

// Search and replace operations
export const countOccurrences = (str, substring) => {
  if (
    typeof str !== "string" ||
    typeof substring !== "string" ||
    substring === ""
  ) {
    return 0;
  }
  return (str.match(new RegExp(substring, "g")) || []).length;
};

export const removeWhitespace = (str) => {
  if (typeof str !== "string") return "";
  return str.replace(/\s+/g, "");
};

export const normalizeWhitespace = (str) => {
  if (typeof str !== "string") return "";
  return str.replace(/\s+/g, " ").trim();
};

// Case operations
export const toKebabCase = (str) => {
  if (typeof str !== "string") return "";
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

export const toCamelCase = (str) => {
  if (typeof str !== "string") return "";
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
};

export const toSnakeCase = (str) => {
  if (typeof str !== "string") return "";
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();
};

// Slug generation
export const slugify = (str) => {
  if (typeof str !== "string") return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Extract operations
export const extractNumbers = (str) => {
  if (typeof str !== "string") return [];
  const matches = str.match(/\d+/g);
  return matches ? matches.map(Number) : [];
};

export const extractEmails = (str) => {
  if (typeof str !== "string") return [];
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return str.match(emailRegex) || [];
};

// Masking
export const maskString = (str, visibleChars = 4, maskChar = "*") => {
  if (typeof str !== "string") return "";
  if (str.length <= visibleChars) return str;
  const visible = str.slice(-visibleChars);
  const masked = maskChar.repeat(str.length - visibleChars);
  return masked + visible;
};

// Template string
export const template = (str, data) => {
  if (typeof str !== "string") return "";
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data && data[key] !== undefined ? data[key] : match;
  });
};
