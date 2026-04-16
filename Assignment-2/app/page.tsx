"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { SkillCard } from "@/components/skill-card";
import { ProjectCard } from "@/components/project-card";
import { skills, socialLinks } from "@/components/site-data";
import Image from "next/image";

export default function Home() {
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sentStatus, setSentStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setDbProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSentStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setSentStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setSentStatus("error");
      }
    } catch (error) {
      setSentStatus("error");
    } finally {
      setSending(false);
    }
  };
  return (
    <main className="relative overflow-hidden">
      <Navbar />

      <section
        id="home"
        className="section-padding relative flex min-h-screen items-center"
      >
        <div className="absolute inset-0">
          <div className="absolute left-[8%] top-24 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute right-[10%] top-[20%] h-72 w-72 rounded-full bg-accentStrong/15 blur-[120px]" />
          <div className="absolute bottom-10 right-[18%] h-60 w-60 rotate-[-18deg] border border-accent/20" />
          <div className="absolute left-[-8%] top-[28%] h-8 w-[28rem] rotate-[-26deg] bg-accent/20 blur-2xl" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl items-end gap-14 lg:grid-cols-[1.4fr_0.8fr]">
          <Reveal className="max-w-4xl">
            <span className="eyebrow">Available for select projects</span>
            <h1 className="max-w-5xl text-6xl leading-[0.9] text-white sm:text-7xl lg:text-9xl">
              Hi, I&apos;m Atharva Desai
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/[0.72] sm:text-xl">
              Developer. Designer. Problem Solver.
            </p>
            <p className="mt-8 max-w-2xl text-base sm:text-lg">
              Computer Engineering student building modern interfaces, data
              products, and engineering tools with equal focus on usability,
              performance, and clean execution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-accent/80">
              <span className="rounded-full border border-accent/20 bg-accent/5 px-4 py-2">
                Next.js
              </span>
              <span className="rounded-full border border-accent/20 bg-accent/5 px-4 py-2">
                Machine Learning
              </span>
              <span className="rounded-full border border-accent/20 bg-accent/5 px-4 py-2">
                UI Engineering
              </span>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="#projects">View Work</Button>
              <Button href="#contact" variant="secondary">
                Let&apos;s Talk
              </Button>
            </div>
          </Reveal>

          <Reveal className="lg:justify-self-end">
            <div className="surface clipped-panel relative overflow-hidden rounded-[2rem] p-4 shadow-card">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-transparent" />
              <div className="relative rounded-[1.5rem] border border-accent/15 bg-black p-5">
                <div className="mb-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                  <span>Active Build</span>
                  <span>Portfolio</span>
                </div>
                <div className="relative overflow-hidden rounded-[1.25rem] bg-white/[0.04]">
                  <Image
                    src="/showcase-hero.svg"
                    alt="Abstract showcase preview"
                    width={760}
                    height={920}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-white/60">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-accent/70">
                      Focus
                    </p>
                    <p className="mt-2 text-white">UI engineering</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-accent/70">
                      Specialty
                    </p>
                    <p className="mt-2 text-white">Systems with impact</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Section
        id="about"
        eyebrow="About"
        title="Built for clarity, shaped by taste."
        description="I bring together frontend engineering, product-minded UI work, and applied machine learning to build systems that are practical, polished, and scalable."
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="surface clipped-panel rounded-[2rem] p-8 sm:p-10">
              <p className="max-w-2xl text-lg text-white/80">
                I&apos;m a B.Tech Computer Engineering student at Pimpri
                Chinchwad College of Engineering, Pune, graduating in August
                2027. I enjoy building products that sit at the intersection of
                software, design, and intelligent systems.
              </p>
              <p className="mt-6 max-w-2xl">
                Most recently, I worked as a Data Science Intern at L&amp;L
                Products, where I built modular Python pipelines, trained
                machine learning models on industrial datasets, and created
                Streamlit dashboards for operational insights and forecasting.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="clipped-panel rounded-[1.5rem] border border-accent/15 bg-accent/5 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-accent/70">
                    Education
                  </p>
                  <p className="mt-3 text-white">
                    B.Tech in Computer Engineering
                  </p>
                  <p className="mt-2 text-sm">
                    Pimpri Chinchwad College of Engineering, Pune
                  </p>
                </div>
                <div className="clipped-panel rounded-[1.5rem] border border-accent/15 bg-accent/5 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-accent/70">
                    Leadership
                  </p>
                  <p className="mt-3 text-white">UI/UX Lead, GDGC PCCOE</p>
                  <p className="mt-2 text-sm">
                    Core Team Member, Spectrum&apos;24
                  </p>
                </div>
              </div>
              <p className="mt-6 max-w-2xl">
                My work spans Next.js websites, UI systems, CAD generation
                tools, blockchain-based product concepts, and data-driven
                applications designed for real-world decision-making.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="surface clipped-panel group relative overflow-hidden rounded-[2rem] p-4">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Image
                src="/profile-minimal.svg"
                alt="Minimal profile illustration"
                width={900}
                height={900}
                className="h-auto w-full rounded-[1.5rem] border border-accent/15 object-cover grayscale transition duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        id="skills"
        eyebrow="Skills"
        title="Capabilities with range."
        description="A focused toolkit across software engineering, user interface design, machine learning, and technical problem-solving."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill, index) => (
            <Reveal key={skill.title} delay={index * 90}>
              <SkillCard {...skill} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="projects"
        eyebrow="Projects"
        title="Work that leads with impact."
        description="Selected work across CAD automation, blockchain systems, and frontend engineering, presented with strong product framing and clean visual hierarchy."
      >
        <div className="grid gap-6 xl:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-20 text-center text-white/40">
              Loading projects...
            </div>
          ) : dbProjects.length > 0 ? (
            dbProjects.map((project, index) => (
              <Reveal
                key={project._id || project.title}
                className={index === 0 ? "xl:col-span-2" : ""}
                delay={index * 120}
              >
                <ProjectCard {...project} priority={index === 0} />
              </Reveal>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-white/40">
              No projects found in database.
            </div>
          )}
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Let&apos;s build something that feels unforgettable."
        description="Open to freelance collaborations, product partnerships, and ambitious ideas that deserve a sharp digital presence."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <div className="surface clipped-panel rounded-[2rem] p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.32em] text-accent/70">
                Email
              </p>
              <a
                href="mailto:7atharvadesai@gmail.com"
                className="mt-4 inline-block text-3xl font-display uppercase tracking-[-0.04em] text-white transition hover:text-accent sm:text-4xl"
              >
                7atharvadesai@gmail.com
              </a>
              <div className="mt-10 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <Button
                    key={item.label}
                    href={item.href}
                    variant="secondary"
                    external
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="surface clipped-panel rounded-[2rem] p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.32em] text-accent/70">
                Quick Note
              </p>
              <p className="mt-4 max-w-md text-sm">
                Interested in internships, collaborations, and projects across
                frontend engineering, design systems, machine learning, and
                product-focused development.
              </p>
              <form className="mt-6 space-y-4" onSubmit={handleContactSubmit}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full rounded-full border border-accent/15 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  className="w-full rounded-full border border-accent/15 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent"
                />
                <textarea
                  rows={5}
                  placeholder="Tell me about your project"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  className="w-full rounded-[1.5rem] border border-accent/15 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent"
                />
                <Button as="button" type="submit" disabled={sending}>
                  {sending ? "Sending..." : "Start the Conversation"}
                </Button>
                {sentStatus === "success" && (
                  <p className="mt-2 text-xs text-green-400">Message sent successfully!</p>
                )}
                {sentStatus === "error" && (
                  <p className="mt-2 text-xs text-red-400">Failed to send message. Please check console.</p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
