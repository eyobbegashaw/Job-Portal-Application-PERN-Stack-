// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Phone number validation (Ethiopian format)
const isValidPhone = (phone) => {
  const phoneRegex = /^\+251[97]\d{8}$/;
  return phoneRegex.test(phone);
};

// URL validation
const isValidUrl = (url) => {
  if (!url) return true; // Optional field
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
  return urlRegex.test(url);
};

// Number validation
const isValidNumber = (number) => {
  const numRegex = /^\d+$/;
  return numRegex.test(number);
};

// GPA validation
const isValidGPA = (gpa) => {
  if (!gpa) return true; // Optional field
  const gpaRegex = /^\d*\.?\d{1,2}$/;
  return gpaRegex.test(gpa) && parseFloat(gpa) >= 0 && parseFloat(gpa) <= 4.0;
};

// Company ID validation (9 digits)
const isValidCompanyId = (id) => {
  const idRegex = /^\d{9}$/;
  return idRegex.test(id);
};

// Password strength validation
const isStrongPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Date validation (future date)
const isFutureDate = (date) => {
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDate > today;
};

// File type validation
const isValidFileType = (filename, allowedTypes) => {
  const ext = filename.split('.').pop().toLowerCase();
  return allowedTypes.includes(ext);
};

// File size validation (in bytes)
const isValidFileSize = (size, maxSize) => {
  return size <= maxSize;
};

// Salary range validation
const isValidSalaryRange = (range) => {
  if (!range) return true;
  const salaryRegex = /^\$?[\d,]+(\s*-\s*\$?[\d,]+)?$/;
  return salaryRegex.test(range);
};

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isValidNumber,
  isValidGPA,
  isValidCompanyId,
  isStrongPassword,
  isFutureDate,
  isValidFileType,
  isValidFileSize,
  isValidSalaryRange
};