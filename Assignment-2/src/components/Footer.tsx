import React from 'react';
import { Share2, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 w-full py-12">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6 gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-lg font-bold text-neutral-200 font-headline">CardStore</span>
          <p className="font-sans text-sm text-neutral-500">© 2024 CardStore. Artifacts of the Obsidian Gallery.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 font-sans text-sm">
          {['Terms', 'Privacy', 'Shipping', 'Returns'].map(link => (
            <a key={link} href="#" className="text-neutral-500 hover:text-violet-400 transition-colors">
              {link}
            </a>
          ))}
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center text-neutral-500 hover:text-violet-400 hover:border-violet-400 transition-all">
            <Share2 size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center text-neutral-500 hover:text-violet-400 hover:border-violet-400 transition-all">
            <Globe size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
