export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

export const validateName = (name) => {
  if (!name) return "Name is required";
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";
  return null;
};

export const validateAddress = (address) => {
  if (!address) return "Address is required";
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
};

export const validateLoginForm = (formData) => {
  const errors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateSignupForm = (formData) => {
  const errors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const addressError = validateAddress(formData.address);
  if (addressError) errors.address = addressError;

  const confirmPasswordError = validateConfirmPassword(
    formData.password,
    formData.confirmPassword
  );
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  return errors;
};
