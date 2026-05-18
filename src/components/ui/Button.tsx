import { Link } from "react-router-dom";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "arrow";

const Arrow = () => (
  <svg
    className="arrow"
    aria-hidden
    width="14"
    height="10"
    viewBox="0 0 14 10"
    fill="none"
  >
    <path
      d="M1 5h12m0 0L9 1m4 4L9 9"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
    />
  </svg>
);

function classes(variant: Variant, className?: string) {
  const base = variant === "primary" ? "btn-primary" : "btn-arrow";
  return `${base} ${className ?? ""}`.trim();
}

type LinkProps = {
  to: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "to" | "className" | "children">;

type ButtonProps = {
  to?: undefined;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button(props: LinkProps | ButtonProps) {
  if ("to" in props && props.to !== undefined) {
    const { to, variant = "arrow", children, className, ...rest } = props;
    return (
      <Link to={to} className={classes(variant, className)} {...rest}>
        {variant === "arrow" ? (
          <>
            <span>{children}</span>
            <Arrow />
            <span className="line" aria-hidden />
          </>
        ) : (
          <>
            <span>{children}</span>
            <Arrow />
          </>
        )}
      </Link>
    );
  }
  const { variant = "arrow", children, className, ...rest } = props;
  return (
    <button className={classes(variant, className)} {...rest}>
      {variant === "arrow" ? (
        <>
          <span>{children}</span>
          <Arrow />
          <span className="line" aria-hidden />
        </>
      ) : (
        <>
          <span>{children}</span>
          <Arrow />
        </>
      )}
    </button>
  );
}
