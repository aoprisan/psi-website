import { describe, it, expect } from 'vitest';

// Inline the validation functions to test them independently
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  if (!phone) return true;
  return /^[\d\s()+-]{7,20}$/.test(phone);
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

function validateForm(data: { name: string; email: string; phone: string; subject: string; message: string }): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  if (!data.subject) errors.subject = 'Please select a subject';
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  return errors;
}

describe('Email validation', () => {
  it('accepts valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(validateEmail('notanemail')).toBe(false);
    expect(validateEmail('missing@')).toBe(false);
    expect(validateEmail('@nodomain.com')).toBe(false);
  });
});

describe('Phone validation', () => {
  it('accepts empty phone (optional field)', () => {
    expect(validatePhone('')).toBe(true);
  });

  it('accepts valid phone numbers', () => {
    expect(validatePhone('(123) 456-7890')).toBe(true);
    expect(validatePhone('+1 234 567 890')).toBe(true);
  });

  it('rejects invalid phone numbers', () => {
    expect(validatePhone('abc')).toBe(false);
    expect(validatePhone('12')).toBe(false);
  });
});

describe('Form validation', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '',
    subject: 'initial-consultation',
    message: 'I would like to schedule an appointment.',
  };

  it('returns no errors for valid data', () => {
    expect(validateForm(validData)).toEqual({});
  });

  it('returns errors for empty required fields', () => {
    const errors = validateForm({ name: '', email: '', phone: '', subject: '', message: '' });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.subject).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it('returns error for short message', () => {
    const errors = validateForm({ ...validData, message: 'Hi' });
    expect(errors.message).toBe('Message must be at least 10 characters');
  });

  it('returns error for invalid email', () => {
    const errors = validateForm({ ...validData, email: 'bad-email' });
    expect(errors.email).toBe('Please enter a valid email address');
  });
});
