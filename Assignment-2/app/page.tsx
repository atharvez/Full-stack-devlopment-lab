"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { SkillCard } from "@/components/skill-card";
import { ProjectCard } from "@/components/project-card";
import { skills, socialLinks } from "@/components/site-data";
import { GitHubDashboard } from "@/components/github-dashboard";
import Image from "next/image";
import { User, Sparkles, Send, MousePointer2 } from "lucide-react";

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
    <main className="relative min-h-screen bg-background text-white selection:bg-accent selection:text-background">
      {/* Premium Overlays */}
      <div className="bg-noise" />
      <div className="aurora -left-1/4 -top-1/4 from-accent/20" />
      <div className="aurora -bottom-1/4 -right-1/4 from-accentStrong/20" />

      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center sm:px-10 lg:px-16">
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
            <Sparkles className="h-3 w-3" />
            <span>Open for collaboration</span>
          </div>
          
          <h1 className="max-w-6xl font-display text-7xl leading-[0.9] tracking-tight sm:text-8xl lg:text-[10rem]">
            Crafting Digital <br />
            <span className="text-white/20">Excellence.</span>
          </h1>
          
          <p className="mx-auto mt-12 max-w-2xl text-lg text-white/50 sm:text-xl">
            Computer Engineering student at PCCOE Pune. Bridging the gap between 
            complex backend systems and high-fidelity user experiences.
          </p>
          
          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#projects">Browse Portfolio</Button>
            <Button href="#contact" variant="secondary">Get In Touch</Button>
          </div>
        </Reveal>
        
        <Reveal delay={200} className="mt-20">
          <div className="flex flex-col items-center gap-4 text-white/20">
            <MousePointer2 className="h-5 w-5 animate-bounce" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Scroll to explore</span>
          </div>
        </Reveal>
      </section>

      {/* About Section - Bento Style */}
      <Section
        id="about"
        eyebrow="Profile"
        title="Experience meets taste."
        description="A blend of data science, cloud architecture, and UI engineering."
      >
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Bio Card */}
          <div className="surface flex flex-col justify-center rounded-[2.5rem] p-10 lg:col-span-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-accent ring-1 ring-white/10">
              <User className="h-6 w-6" />
            </div>
            <p className="mt-8 text-2xl leading-relaxed text-white/80">
              I enjoy building systems that are as practical as they are polished. 
              My journey spans from industrial data science at <span className="text-accent underline underline-offset-4">L&L Products</span> to 
              scaling community platforms for PCCOE students.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="border-l-2 border-accent/20 pl-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Education</p>
                <p className="mt-2 font-display text-lg text-white">B.Tech Computer Engineering</p>
                <p className="mt-1 text-sm text-white/40">PCCOE, Pune (2027)</p>
              </div>
              <div className="border-l-2 border-accent/20 pl-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Leadership</p>
                <p className="mt-2 font-display text-lg text-white">UI/UX Lead, GDGC PCCOE</p>
              </div>
            </div>
          </div>

          {/* Experience Graphic Card */}
          <div className="surface group relative col-span-12 flex h-[400px] flex-col overflow-hidden rounded-[2.5rem] lg:col-span-4 lg:h-auto">
            <Image
              src="/profile-minimal.svg"
              alt="Minimalist avatar"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">Availability</p>
              <h4 className="mt-2 font-display text-2xl text-white">Pune / Remote</h4>
            </div>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section
        id="skills"
        eyebrow="Capabilities"
        title="Tools of the trade."
        description="A specialized toolkit for modern engineering."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill, index) => (
            <Reveal key={skill.title} delay={index * 100}>
              <SkillCard {...skill} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Projects Section - Bento Grid */}
      <Section
        id="projects"
        eyebrow="Selected Work"
        title="Impact-driven builds."
        description="A gallery of experiments and focused production builds."
      >
        <div className="grid gap-6 lg:grid-cols-12">
          {loading ? (
            <div className="col-span-full py-20 text-center text-white/20">Building grid...</div>
          ) : dbProjects.map((project, index) => (
            <Reveal 
              key={project.title} 
              className={index === 0 ? "lg:col-span-8" : "lg:col-span-4"}
              delay={index * 150}
            >
              <ProjectCard {...project} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* New Activity Dashboard */}
      <Section
        id="activity"
        eyebrow="Live Stream"
        title="Developer Pulse."
        description="Real-time transparency into my coding activity and contributions."
      >
        <GitHubDashboard />
      </Section>

      {/* Contact Section */}
      <Section
        id="contact"
        eyebrow="Inquiry"
        title="Ready to build?"
        description="Reach out for collaborations, project inquiries, or just to say hi."
      >
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="surface h-full rounded-[2.5rem] p-10">
              <h3 className="text-4xl font-display leading-[1.1] text-white lg:text-5xl">
                Let&apos;s create something <span className="text-accent underline decoration-accent/30 underline-offset-8">meaningful.</span>
              </h3>
              
              <div className="mt-16 space-y-10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Direct Link</p>
                  <a href="mailto:7atharvadesai@gmail.com" className="mt-4 block text-2xl font-display text-white hover:text-accent transition-colors">
                    7atharvadesai@gmail.com
                  </a>
                </div>
                
                <div className="flex gap-4">
                  <a href="https://github.com/atharvez" target="_blank" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-accent hover:text-accent">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-accent hover:text-accent">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="surface rounded-[2.5rem] p-10">
              <form className="grid gap-6" onSubmit={handleContactSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 ml-2">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Atharva Desai"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm text-white outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 ml-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. user@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm text-white outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 ml-2">Message</label>
                  <textarea
                    rows={6}
                    placeholder="Briefly describe your project or inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    className="w-full rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 text-sm text-white outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>
                
                <Button as="button" type="submit" disabled={sending} className="mt-2 w-full sm:w-auto">
                  {sending ? "Transmitting..." : "Send Message"}
                  <Send className="ml-2 h-3.5 w-3.5" />
                </Button>
                
                {sentStatus === "success" && <p className="text-xs text-accent">Transmission successful! I'll reply shortly.</p>}
                {sentStatus === "error" && <p className="text-xs text-red-400">Error transmitting message. Please try again.</p>}
              </form>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Footer */}
      <footer className="px-6 py-12 pb-20 text-center sm:px-10 lg:px-16">
        <Reveal>
          <div className="mx-auto h-px w-20 bg-accent/20" />
          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
            &copy; {new Date().getFullYear()} Atharva Desai. Built with Taste.
          </p>
        </Reveal>
      </footer>
    </main>
  );
}
