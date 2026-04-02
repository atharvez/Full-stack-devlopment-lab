type SkillCardProps = {
  title: string;
  description: string;
  meta: string;
};

export function SkillCard({ title, description, meta }: SkillCardProps) {
  return (
    <article className="surface clipped-panel group rounded-[1.75rem] p-6 transition duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent/70">
        {meta}
      </p>
      <h3 className="mt-6 text-3xl leading-none text-white">{title}</h3>
      <p className="mt-4 text-sm text-white/[0.65]">{description}</p>
    </article>
  );
}
