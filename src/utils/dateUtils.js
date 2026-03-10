/**
 * Date Utility Functions
 * Useful for testing date manipulation and formatting
 */

// Date formatting
export const formatDate = (date, format = "YYYY-MM-DD") => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return format
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};

// Date arithmetic
export const addDays = (date, days) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addMonths = (date, months) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const addYears = (date, years) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

// Date difference
export const daysBetween = (date1, date2) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error("Invalid dates");
  }
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date2 - date1) / oneDay));
};

export const monthsBetween = (date1, date2) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error("Invalid dates");
  }
  const months = (date2.getFullYear() - date1.getFullYear()) * 12;
  return Math.abs(months + date2.getMonth() - date1.getMonth());
};

export const yearsBetween = (date1, date2) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error("Invalid dates");
  }
  return Math.abs(date2.getFullYear() - date1.getFullYear());
};

// Date comparisons
export const isSameDay = (date1, date2) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    return false;
  }
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isBefore = (date1, date2) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error("Invalid dates");
  }
  return date1 < date2;
};

export const isAfter = (date1, date2) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error("Invalid dates");
  }
  return date1 > date2;
};

export const isBetween = (date, startDate, endDate) => {
  if (
    !(date instanceof Date) ||
    !(startDate instanceof Date) ||
    !(endDate instanceof Date)
  ) {
    throw new Error("Invalid dates");
  }
  return date >= startDate && date <= endDate;
};

// Date parts
export const getStartOfDay = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const getEndOfDay = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

export const getStartOfMonth = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getEndOfMonth = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getDaysInMonth = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

// Week operations
export const getWeekNumber = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

export const isWeekend = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const isWeekday = (date) => {
  return !isWeekend(date);
};

// Relative time
export const getRelativeTime = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) return "just now";
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  if (diffInDays < 30)
    return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? "s" : ""} ago`;
  if (diffInDays < 365)
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? "s" : ""} ago`;
  return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) > 1 ? "s" : ""} ago`;
};

// Age calculation
export const calculateAge = (birthDate) => {
  if (!(birthDate instanceof Date) || isNaN(birthDate)) {
    throw new Error("Invalid date");
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

// Leap year
export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
