/**
 * Format price with thousand separators
 * @param {string | number} value - The price value
 * @returns {string} Formatted price with thousand separators
 */
export const formatPriceDisplay = (value) => {
  if (!value) return '';
  
  // Remove any non-numeric characters except 'B', 'M', 'K'
  const numericValue = value.toString().replace(/[^0-9BMK]/g, '');
  
  // If it contains B, M, or K, return as is
  if (/[BMK]/i.test(numericValue)) {
    return numericValue;
  }
  
  // Format with thousand separators
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Get raw value for submission (removes thousand separators)
 * @param {string} value - The formatted price value
 * @returns {string} Raw price without formatting
 */
export const getPriceRawValue = (value) => {
  if (!value) return '';
  return value.toString().replace(/,/g, '');
};

/**
 * Format price input with real-time thousand separators
 * @param {string} value - The input value
 * @returns {string} Formatted value with thousand separators
 */
export const formatPriceInput = (value) => {
  if (!value) return '';
  
  const str = value.toString();
  
  // If it ends with B, M, K (like 5B), keep as is
  if (/[BMK]$/i.test(str)) {
    return str;
  }
  
  // Remove all non-numeric characters except B, M, K
  const sanitized = str.replace(/[^0-9BMK]/g, '');
  
  // Check if it has B, M, K suffix
  const match = sanitized.match(/(\d+)([BMK])?/i);
  if (!match) return '';
  
  const numbers = match[1];
  const suffix = match[2] || '';
  
  // Add thousand separators to numbers
  const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return formatted + suffix;
};
