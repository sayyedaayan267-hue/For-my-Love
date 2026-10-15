import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    ambientAudio.playSoftPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-rose-400/15 py-12 px-4 sm:px-6 lg:px-8 text-center text-xs text-rose-300/70">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Tender note */}
        <div className="flex items-center gap-2">
          <span>Made for my Darling Sneha ji</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
          <span>&middot; A place that will always be yours</span>
        </div>

        {/* Center: Back to top action */}
        <div className="flex items-center gap-4 text-rose-300/80">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-rose-100 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      <p className="mt-6 text-[11px] text-rose-300/40 font-light">
        No cookies, no data collected &middot; Your sanctuary, forever safe &middot; 2026
      </p>
    </footer>
  );
};
