export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  // Ethiopian phone format: +251 91 234 5678
  const re = /^\+251[97]\d{8}$/;
  return re.test(phone);
};

export const validateUrl = (url) => {
  if (!url) return true;
  const re = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
  return re.test(url);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

export const validatePasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  
  return {
    checks,
    score,
    strength: score <= 2 ? 'weak' : score <= 3 ? 'medium' : score <= 4 ? 'strong' : 'very-strong'
  };
};

export const validateCompanyId = (id) => {
  const re = /^\d{9}$/;
  return re.test(id);
};

export const validateGPA = (gpa) => {
  if (!gpa) return true;
  const num = parseFloat(gpa);
  return !isNaN(num) && num >= 0 && num <= 4.0;
};

export const validateDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

export const validateFutureDate = (date) => {
  if (!validateDate(date)) return false;
  return new Date(date) > new Date();
};

export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

export const validateSalary = (salary) => {
  if (!salary) return true;
  const re = /^\$?[\d,]+(\s*-\s*\$?[\d,]+)?$/;
  return re.test(salary);
};

export const validateJobTitle = (title) => {
  return title && title.length >= 5 && title.length <= 100;
};

export const validateDescription = (description) => {
  return description && description.length >= 50;
};

export const validateSkills = (skills) => {
  return skills && skills.length >= 10;
};

export const validateQualifications = (qualifications) => {
  return qualifications && qualifications.length >= 20;
};

export const validateExperience = (years) => {
  const num = parseInt(years);
  return !isNaN(num) && num >= 0 && num <= 50;
};

export const validateVacancies = (count) => {
  const num = parseInt(count);
  return !isNaN(num) && num >= 1 && num <= 999;
};

export const validateName = (name) => {
  return name && name.length >= 2 && name.length <= 50;
};

export const validateUserType = (type) => {
  return ['jobseeker', 'company', 'admin'].includes(type);
};

export const validateStatus = (status) => {
  return ['Pending', 'Approved', 'Rejected'].includes(status);
};

export const validateApplicationStatus = (status) => {
  return ['pending', 'reviewed', 'accepted', 'rejected'].includes(status);
};