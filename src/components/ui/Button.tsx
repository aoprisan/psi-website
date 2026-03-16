import Link from 'next/link';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'large';
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  href,
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const base = 'inline-block font-semibold rounded-lg transition-colors duration-200 text-center';
  const sizes = {
    default: 'px-8 py-3',
    large: 'px-8 py-4',
  };
  const variants = {
    primary:
      'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'bg-white text-[var(--primary)] hover:bg-[var(--neutral-50)]',
    outline:
      'bg-transparent border-2 border-white text-white hover:bg-white/10',
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
