"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { Reveal } from "./reveal";
import { Star, ExternalLink, GitBranch } from "lucide-react";

type Repo = {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
  updated_at: string;
};

export function GitHubDashboard() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          setRepos(data);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGithub();
  }, []);

  return (
    <div id="github-dashboard" className="grid gap-6 lg:grid-cols-[1fr_0.4fr]">
      {/* Contribution Calendar */}
      <Reveal>
        <div className="surface rounded-[2.5rem] p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-3xl font-display text-white">Coding Activity</h3>
              <p className="mt-2 text-sm text-white/40">Visualizing my consistency and focus over the past year.</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-accent ring-1 ring-white/10">
              <GitBranch className="h-5 w-5" />
            </div>
          </div>
          
          <div className="mt-12 flex justify-center overflow-x-auto pb-4 scrollbar-hide">
            <GitHubCalendar
              username="atharvez"
              blockSize={13}
              blockMargin={6}
              fontSize={12}
              theme={{
                dark: ["#0a0f1b", "#0ea5e922", "#0ea5e955", "#0ea5e9aa", "#22d3ee"],
              }}
            />
          </div>
        </div>
      </Reveal>

      {/* Featured Repos */}
      <div className="grid gap-6">
        <Reveal delay={100}>
          <div className="surface flex h-full flex-col justify-between rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Latest Work</span>
              <svg className="h-4 w-4 text-white/20 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </div>
            
            <div className="mt-8 space-y-6">
              {loading ? (
                <p className="text-xs text-white/20">Loading activity...</p>
              ) : repos.slice(0, 3).map((repo) => (
                <a 
                  key={repo.name} 
                  href={repo.url} 
                  target="_blank" 
                  className="group block border-b border-white/5 pb-6 last:border-0 last:pb-0"
                >
                  <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors">{repo.name}</p>
                  <div className="mt-2 flex items-center gap-4 text-[10px] text-white/30">
                    <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {repo.stars}</span>
                    <span>{repo.language}</span>
                  </div>
                </a>
              ))}
            </div>
            
            <a 
              href="https://github.com/atharvez" 
              target="_blank" 
              className="mt-10 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-accent hover:text-white transition-colors"
            >
              Full Profile <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
