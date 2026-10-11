export function validateEmail(email) {
  if (!email?.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Enter a valid email';
  return '';
}

export function validatePassword(password) {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
}

export function validateName(name) {
  if (!name?.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name is too short';
  return '';
}

export function validatePrice(price) {
  if (price === '' || price === null || price === undefined) return 'Price is required';
  const value = Number(price);
  if (Number.isNaN(value)) return 'Price must be a number';
  if (value < 0) return 'Price cannot be negative';
  return '';
}

export function validatePartySize(size, maxSeats) {
  const value = Number(size);
  if (!size || Number.isNaN(value) || value < 1) return 'Party size must be at least 1';
  if (maxSeats && value > maxSeats) return `This table only seats ${maxSeats}`;
  return '';
}

export function validateBookingDate(date) {
  if (!date) return 'Date is required';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const chosen = new Date(`${date}T00:00:00`);
  if (Number.isNaN(chosen.getTime())) return 'Use YYYY-MM-DD';
  if (chosen < today) return 'Date cannot be in the past';
  return '';
}

export function validateTime(time) {
  if (!time) return 'Time is required';
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return 'Use HH:MM, for example 19:30';
  return '';
}
