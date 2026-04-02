import Image from "next/image";

type ProjectCardProps = {
  title: string;
  description: string;
  stack: string[];
  image: string;
  priority?: boolean;
};

export function ProjectCard({
  title,
  description,
  stack,
  image,
  priority = false
}: ProjectCardProps) {
  return (
    <article className="surface clipped-panel group overflow-hidden rounded-[2rem]">
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={1600}
          height={1200}
          priority={priority}
          className="h-[320px] w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 sm:h-[420px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
        <div className="absolute left-6 top-6 h-1 w-20 bg-accent shadow-glow" />
      </div>
      <div className="p-7 sm:p-8">
        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent/80"
            >
              {item}
            </span>
          ))}
        </div>
        <h3 className="mt-6 text-3xl text-white sm:text-4xl">{title}</h3>
        <p className="mt-4 max-w-2xl text-sm text-white/[0.65] sm:text-base">
          {description}
        </p>
      </div>
    </article>
  );
}
