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

export const validateFullName = (name) => {
  if (!name || name.trim() === '') {
    return { isValid: false, error: 'Full name is required' };
  }

  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }

  const nameParts = trimmedName.split(/\s+/).filter((part) => part.length > 0);
  if (nameParts.length < 2) {
    return { isValid: false, error: 'Please enter your first and last name' };
  }

  const invalidParts = nameParts.filter((part) => part.length < 2);
  if (invalidParts.length > 0) {
    return { isValid: false, error: 'Each name part must be at least 2 characters' };
  }

  return { isValid: true, error: null };
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }

  const trimmedPhone = phone.trim();

  if (!trimmedPhone.startsWith('+')) {
    return { isValid: false, error: 'Phone number must start with country code (e.g., +966)' };
  }

  const digits = trimmedPhone.slice(1).replace(/\s/g, '');
  if (!/^\d+$/.test(digits)) {
    return { isValid: false, error: 'Phone number should only contain digits after the country code' };
  }

  if (digits.length < 10 || digits.length > 15) {
    return { isValid: false, error: 'Please enter a valid phone number with country code' };
  }

  return { isValid: true, error: null };
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return { isValid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true, error: null };
};

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

export const validateRegisterForm = (formData) => {
  const { fullName, email, phone, password, confirmPassword } = formData;
  const errors = {};

  const nameValidation = validateFullName(fullName);
  if (!nameValidation.isValid) {
    errors.fullName = nameValidation.error;
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  const phoneValidation = validatePhone(phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

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

