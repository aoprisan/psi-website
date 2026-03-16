import { describe, it, expect } from 'vitest';
import { validateEmail, validatePhone, validateForm } from '@/lib/validation';

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
