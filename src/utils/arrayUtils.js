/**
 * Pure Utility Functions for Array Operations
 * Excellent for testing array transformations and algorithms
 */

// Basic array operations
export const first = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return arr[0];
};

export const last = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return arr[arr.length - 1];
};

export const isEmpty = (arr) => {
  return !Array.isArray(arr) || arr.length === 0;
};

// Unique and duplicates
export const unique = (arr) => {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr)];
};

export const findDuplicates = (arr) => {
  if (!Array.isArray(arr)) return [];
  const seen = new Set();
  const duplicates = new Set();
  arr.forEach((item) => {
    if (seen.has(item)) {
      duplicates.add(item);
    }
    seen.add(item);
  });
  return [...duplicates];
};

export const removeDuplicates = (arr) => {
  return unique(arr);
};

// Chunking and flattening
export const chunk = (arr, size) => {
  if (!Array.isArray(arr) || size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export const flatten = (arr, depth = 1) => {
  if (!Array.isArray(arr)) return [];
  return arr.flat(depth);
};

export const deepFlatten = (arr) => {
  if (!Array.isArray(arr)) return [];
  return arr.flat(Infinity);
};

// Sorting
export const sortNumbers = (arr, ascending = true) => {
  if (!Array.isArray(arr)) return [];
  return [...arr].sort((a, b) => (ascending ? a - b : b - a));
};

export const sortStrings = (arr, ascending = true) => {
  if (!Array.isArray(arr)) return [];
  return [...arr].sort((a, b) => {
    return ascending ? a.localeCompare(b) : b.localeCompare(a);
  });
};

export const sortByProperty = (arr, property, ascending = true) => {
  if (!Array.isArray(arr)) return [];
  return [...arr].sort((a, b) => {
    if (a[property] < b[property]) return ascending ? -1 : 1;
    if (a[property] > b[property]) return ascending ? 1 : -1;
    return 0;
  });
};

// Searching and filtering
export const filterByProperty = (arr, property, value) => {
  if (!Array.isArray(arr)) return [];
  return arr.filter((item) => item[property] === value);
};

export const findByProperty = (arr, property, value) => {
  if (!Array.isArray(arr)) return undefined;
  return arr.find((item) => item[property] === value);
};

export const groupBy = (arr, property) => {
  if (!Array.isArray(arr)) return {};
  return arr.reduce((groups, item) => {
    const key = item[property];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
};

// Set operations
export const intersection = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  const set2 = new Set(arr2);
  return arr1.filter((item) => set2.has(item));
};

export const difference = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
};

export const union = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  return [...new Set([...arr1, ...arr2])];
};

// Shuffle and sample
export const shuffle = (arr) => {
  if (!Array.isArray(arr)) return [];
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const sample = (arr, count = 1) => {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const shuffled = shuffle(arr);
  return shuffled.slice(0, Math.min(count, arr.length));
};

// Sum and aggregation
export const sum = (arr) => {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((total, num) => total + num, 0);
};

export const sumByProperty = (arr, property) => {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((total, item) => total + (item[property] || 0), 0);
};

export const max = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return Math.max(...arr);
};

export const min = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return Math.min(...arr);
};

// Range generation
export const range = (start, end, step = 1) => {
  if (step === 0) throw new Error("Step cannot be zero");
  const result = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
};

// Partition
export const partition = (arr, predicate) => {
  if (!Array.isArray(arr)) return [[], []];
  return arr.reduce(
    ([pass, fail], item) => {
      return predicate(item)
        ? [[...pass, item], fail]
        : [pass, [...fail, item]];
    },
    [[], []],
  );
};
