import { Link } from "react-router-dom";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "primary-light" | "link";

const Arrow = () => (
  <svg aria-hidden width="14" height="10" viewBox="0 0 14 10" fill="none">
    <path
      d="M1 5h12m0 0L9 1m4 4L9 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function classes(variant: Variant, className?: string) {
  const base =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
        ? "btn-secondary"
        : variant === "primary-light"
          ? "btn-primary btn-primary--light"
          : "text-link";
  return `${base} ${className ?? ""}`.trim();
}

type LinkProps = {
  to: string;
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "to" | "className" | "children">;

type ButtonProps = {
  to?: undefined;
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button(props: LinkProps | ButtonProps) {
  if (props.to !== undefined) {
    const { to, variant = "primary", arrow, children, className, ...rest } = props;
    return (
      <Link to={to} className={classes(variant, className)} {...rest}>
        <span>{children}</span>
        {(arrow ?? variant !== "link") && <Arrow />}
      </Link>
    );
  }
  const { to: _to, variant = "primary", arrow, children, className, ...rest } = props;
  return (
    <button className={classes(variant, className)} {...rest}>
      <span>{children}</span>
      {(arrow ?? variant !== "link") && <Arrow />}
    </button>
  );
}
