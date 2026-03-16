import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '@/components/layout/Header';

describe('Header', () => {
  it('renders the brand name', () => {
    render(<Header />);
    expect(screen.getByText('Psychology Practice')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'FAQ' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders the Book Appointment CTA', () => {
    render(<Header />);
    const ctaLinks = screen.getAllByRole('link', { name: 'Book Appointment' });
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('toggles mobile menu on button click', () => {
    render(<Header />);
    const toggleButton = screen.getByLabelText('Toggle menu');

    // Menu should not show mobile nav initially (it's hidden via CSS class)
    fireEvent.click(toggleButton);

    // After click, mobile links should appear (they duplicate desktop links)
    // The navigation items will be rendered twice (desktop + mobile)
    const aboutLinks = screen.getAllByText('About');
    expect(aboutLinks.length).toBeGreaterThanOrEqual(2);
  });
});
