import { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children
}: SectionProps) {
  return (
    <section id={id} className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="max-w-4xl text-4xl leading-[0.9] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-base sm:text-lg">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
