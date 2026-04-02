import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  as?: "link" | "button";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  href,
  variant = "primary",
  external = false,
  as = "link",
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition duration-300",
    variant === "primary"
      ? "bg-accent text-black shadow-glow hover:bg-accentStrong"
      : "border border-white/[0.15] bg-white/[0.03] text-white hover:border-accent hover:bg-accent/10 hover:text-accentStrong",
    className
  ]
    .filter(Boolean)
    .join(" ");

  if (as === "button") {
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    );
  }

  if (!href) {
    return null;
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
