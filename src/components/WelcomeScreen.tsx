import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const handleEnterClick = () => {
    ambientAudio.playChime();
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#140b1c] via-[#1c0f26] to-[#0c0612] overflow-y-auto">
      {/* Soft Ambient Radiance */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-rose-500/15 blur-[120px] pointer-events-none -top-20 -left-20 animate-pulse-glow"
        aria-hidden="true"
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[130px] pointer-events-none -bottom-20 -right-20"
        aria-hidden="true"
      />

      <div className="relative max-w-xl w-full mx-auto my-auto text-center z-10 py-8 px-6 sm:px-10 rounded-3xl bg-[#1b1224]/80 backdrop-blur-2xl border border-rose-400/20 shadow-2xl shadow-rose-950/40">
        
        {/* Glowing Heart Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative group cursor-pointer" onClick={() => ambientAudio.playHeartbeat()}>
            <div className="absolute -inset-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full blur-xl opacity-60 group-hover:opacity-90 transition duration-1000 animate-pulse-glow" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500/20 via-pink-400/20 to-purple-500/30 border border-rose-300/40 flex items-center justify-center shadow-inner">
              <Heart className="w-10 h-10 text-rose-300 fill-rose-400/60 drop-shadow-[0_0_12px_rgba(244,114,182,0.8)] animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 text-sm bg-[#2b1836] border border-rose-400/30 rounded-full px-2 py-0.5 text-xs text-rose-200 shadow-sm flex items-center gap-1">
              <span>🧸</span>
              <span>💗</span>
            </div>
          </div>
        </div>

        {/* Greeting Heading */}
        <p className="text-xs uppercase tracking-[0.25em] text-rose-300/80 mb-2 font-medium">
          A Sanctuary Just For You
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-cormorant font-semibold text-rose-100 tracking-tight mb-6">
          Hey, my Darling Sneha ji. <span className="inline-block text-2xl sm:text-3xl ml-1">🧸💗</span>
        </h1>

        {/* Heartfelt Letter Content */}
        <div className="space-y-4 text-base sm:text-lg text-rose-100/85 leading-relaxed font-sans-body font-light">
          <p>
            I know life has been keeping you busy lately. I know you&apos;re working hard, handling things, and giving so much of yourself to the world.
          </p>
          <p className="text-rose-200 font-normal">
            So I made you a little place of your own.
          </p>
          <div className="py-2.5 px-4 my-2 rounded-2xl bg-rose-500/10 border border-rose-400/15 text-rose-200 text-sm sm:text-base font-light italic">
            No deadlines here. No responsibilities. No need to reply to anyone.
          </div>
          <p>
            Just breathe, get comfortable, and let me love you for a little while.
          </p>
          <p className="font-serif-cormorant text-xl sm:text-2xl text-rose-200/95 italic pt-1">
            &ldquo;Welcome to our little world, my love.&rdquo;
          </p>
        </div>

        {/* Enter Button */}
        <div className="mt-8 pt-2">
          <button
            onClick={handleEnterClick}
            type="button"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-medium text-rose-950 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-300 hover:from-white hover:to-rose-200 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-rose-600 transition-transform group-hover:rotate-12" />
            <span>Enter Our Little World ✨</span>
          </button>
          
          <p className="text-xs text-rose-300/60 mt-3 font-light">
            Take your time · Everything here is yours
          </p>
        </div>

      </div>
    </div>
  );
};
