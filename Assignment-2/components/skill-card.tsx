import { Code2, Database, Layout, Terminal } from "lucide-react";

type SkillCardProps = {
  title: string;
  description: string;
  meta: string;
};

const iconMap: Record<string, any> = {
  "Frontend Engineering": Layout,
  "Machine Learning": Database,
  "Product & UI Design": Code2,
  "Core Engineering": Terminal,
};

export function SkillCard({ title, description, meta }: SkillCardProps) {
  const Icon = iconMap[title] || Code2;

  return (
    <div className="surface group relative overflow-hidden rounded-[2rem] p-8 transition-colors hover:bg-accent/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-accent ring-1 ring-white/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-background group-hover:ring-0">
        <Icon className="h-6 w-6" />
      </div>
      
      <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
        {meta}
      </p>
      
      <h3 className="mt-4 text-2xl font-display leading-tight text-white group-hover:text-accent">
        {title}
      </h3>
      
      <p className="mt-4 text-sm leading-relaxed text-white/50">
        {description}
      </p>
      
      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-accent/5 blur-3xl transition-all duration-700 group-hover:bg-accent/20" />
    </div>
  );
}
