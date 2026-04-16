import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  as?: "link" | "button";
  showIcon?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  href,
  variant = "primary",
  external = false,
  as = "link",
  showIcon = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-full px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]";
  
  const variants = {
    primary: "bg-accent text-background shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
    secondary: "border border-white/10 bg-white/[0.03] text-white backdrop-blur-md hover:border-accent hover:bg-accent/5 hover:text-accent",
    ghost: "text-white/60 hover:text-accent hover:bg-accent/5",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {showIcon && external && <ArrowUpRight className="ml-2 h-3 w-3" />}
    </>
  );

  if (as === "button") {
    return (
      <button className={classes} {...props}>
        {content}
      </button>
    );
  }

  if (!href) return null;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
