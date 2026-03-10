/**
 * Validation Utility Functions
 * Perfect for testing form validation logic
 */

// Email validation
export const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecial = false,
  } = options;

  if (typeof password !== "string") return false;
  if (password.length < minLength) return false;
  if (requireUppercase && !/[A-Z]/.test(password)) return false;
  if (requireLowercase && !/[a-z]/.test(password)) return false;
  if (requireNumber && !/\d/.test(password)) return false;
  if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

  return true;
};

export const getPasswordStrength = (password) => {
  if (typeof password !== "string") return "invalid";

  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
};

// Phone validation
export const isValidPhone = (phone) => {
  if (typeof phone !== "string") return false;
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// URL validation
export const isValidUrl = (url) => {
  if (typeof url !== "string") return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Credit card validation (Luhn algorithm)
export const isValidCreditCard = (cardNumber) => {
  if (typeof cardNumber !== "string") return false;

  const cleaned = cardNumber.replace(/\s|-/g, "");
  if (!/^\d{13,19}$/.test(cleaned)) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Date validation
export const isValidDate = (dateString) => {
  if (typeof dateString !== "string") return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

export const isDateInPast = (dateString) => {
  if (!isValidDate(dateString)) return false;
  return new Date(dateString) < new Date();
};

export const isDateInFuture = (dateString) => {
  if (!isValidDate(dateString)) return false;
  return new Date(dateString) > new Date();
};

export const isAdult = (birthDate, minAge = 18) => {
  if (!isValidDate(birthDate)) return false;

  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= minAge;
};

// Required field validation
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
};

// Length validation
export const hasMinLength = (value, minLength) => {
  if (typeof value !== "string") return false;
  return value.length >= minLength;
};

export const hasMaxLength = (value, maxLength) => {
  if (typeof value !== "string") return false;
  return value.length <= maxLength;
};

export const isInLengthRange = (value, minLength, maxLength) => {
  return hasMinLength(value, minLength) && hasMaxLength(value, maxLength);
};

// Number validation
export const isNumber = (value) => {
  return typeof value === "number" && !isNaN(value);
};

export const isPositiveNumber = (value) => {
  return isNumber(value) && value > 0;
};

export const isNegativeNumber = (value) => {
  return isNumber(value) && value < 0;
};

export const isInteger = (value) => {
  return isNumber(value) && Number.isInteger(value);
};

export const isInNumberRange = (value, min, max) => {
  return isNumber(value) && value >= min && value <= max;
};

// Username validation
export const isValidUsername = (username, options = {}) => {
  const {
    minLength = 3,
    maxLength = 20,
    allowUnderscore = true,
    allowNumbers = true,
  } = options;

  if (typeof username !== "string") return false;
  if (!isInLengthRange(username, minLength, maxLength)) return false;

  let pattern = "^[a-zA-Z]";
  if (allowUnderscore && allowNumbers) {
    pattern += "[a-zA-Z0-9_]*";
  } else if (allowNumbers) {
    pattern += "[a-zA-Z0-9]*";
  } else if (allowUnderscore) {
    pattern += "[a-zA-Z_]*";
  } else {
    pattern += "[a-zA-Z]*";
  }
  pattern += "$";

  return new RegExp(pattern).test(username);
};

// Postal code validation (simple US format)
export const isValidPostalCode = (code, country = "US") => {
  if (typeof code !== "string") return false;

  const patterns = {
    US: /^\d{5}(-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
    CA: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i,
    DE: /^\d{5}$/,
  };

  const pattern = patterns[country];
  return pattern ? pattern.test(code) : false;
};

// Form validation helper
export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = values[field];
    const fieldRules = rules[field];

    for (const rule of fieldRules) {
      const error = rule(value, values);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
