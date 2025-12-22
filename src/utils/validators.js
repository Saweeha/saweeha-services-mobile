/**
 * Validation utility functions
 */

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true, error: null };
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @param {object} options - Validation options
 * @param {number} options.minLength - Minimum password length (default: 8)
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validatePassword = (password, options = {}) => {
  const { minLength = 8 } = options;

  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${minLength} characters long`,
    };
  }

  // Check for at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter || !hasNumber) {
    return {
      isValid: false,
      error: 'Password must contain at least one letter and one number',
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validates full name
 * @param {string} name - Full name to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateFullName = (name) => {
  if (!name || name.trim() === '') {
    return { isValid: false, error: 'Full name is required' };
  }

  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }

  // Check if name contains at least first and last name (2 words)
  const nameParts = trimmedName.split(/\s+/).filter((part) => part.length > 0);
  if (nameParts.length < 2) {
    return { isValid: false, error: 'Please enter your first and last name' };
  }

  // Check if each part is valid (at least 2 characters)
  const invalidParts = nameParts.filter((part) => part.length < 2);
  if (invalidParts.length > 0) {
    return { isValid: false, error: 'Each name part must be at least 2 characters' };
  }

  return { isValid: true, error: null };
};

/**
 * Validates that two passwords match
 * @param {string} password - Original password
 * @param {string} confirmPassword - Password confirmation
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return { isValid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true, error: null };
};

/**
 * Validates login form
 * @param {object} formData - { email, password }
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateLoginForm = (formData) => {
  const { email, password } = formData;
  const errors = {};

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  if (!password || password.trim() === '') {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates registration form
 * @param {object} formData - { fullName, email, password, confirmPassword }
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateRegisterForm = (formData) => {
  const { fullName, email, password, confirmPassword } = formData;
  const errors = {};

  const nameValidation = validateFullName(fullName);
  if (!nameValidation.isValid) {
    errors.fullName = nameValidation.error;
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  // Only validate password match if password itself is valid
  if (passwordValidation.isValid) {
    const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);
    if (!passwordMatchValidation.isValid) {
      errors.confirmPassword = passwordMatchValidation.error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

