import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FAQItem from '@/components/ui/FAQItem';

describe('FAQItem', () => {
  const defaultProps = {
    question: 'How do I schedule my first appointment?',
    answer: 'You can schedule by calling our office.',
    isOpen: false,
    onToggle: vi.fn(),
  };

  it('renders the question text', () => {
    render(<FAQItem {...defaultProps} />);
    expect(screen.getByText(defaultProps.question)).toBeInTheDocument();
  });

  it('does not show answer when closed', () => {
    render(<FAQItem {...defaultProps} />);
    expect(screen.queryByText(defaultProps.answer)).not.toBeInTheDocument();
  });

  it('shows answer when open', () => {
    render(<FAQItem {...defaultProps} isOpen={true} />);
    expect(screen.getByText(defaultProps.answer)).toBeInTheDocument();
  });

  it('has correct aria-expanded attribute', () => {
    const { rerender } = render(<FAQItem {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    rerender(<FAQItem {...defaultProps} isOpen={true} />);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onToggle when clicked', () => {
    const onToggle = vi.fn();
    render(<FAQItem {...defaultProps} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledOnce();
  });
});
