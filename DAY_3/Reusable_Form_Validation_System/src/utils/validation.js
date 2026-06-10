export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) return "Email is required";
  if (!emailRegex.test(email))
    return "Enter a valid email address";

  return "";
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[!@#$%^&*])(?=.{8,})/;

  if (!password) return "Password is required";

  if (!passwordRegex.test(password)) {
    return "Password must be 8+ characters and contain a special character";
  }

  return "";
};

export const validateRequired = (
  value,
  fieldName
) => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }

  return "";
};