import React, { useState } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  speed: number;
}

export const FinalLetterSection: React.FC = () => {
  const [showFinalHugModal, setShowFinalHugModal] = useState(false);
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  const handleFinalHugClick = () => {
    ambientAudio.playHeartbeat();
    setShowFinalHugModal(true);

    // Generate floating hearts burst
    const newParticles: HeartParticle[] = [];
    const colors = ['#f472b6', '#fb7185', '#fda4af', '#f43f5e', '#e879f9'];
    for (let i = 0; i < 28; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 40 + 50,
        size: Math.random() * 24 + 16,
        rotation: Math.random() * 60 - 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
      });
    }
    setParticles(newParticles);
  };

  const handleCloseHugModal = () => {
    ambientAudio.playSoftPop();
    setShowFinalHugModal(false);
  };

  return (
    <section id="final-letter" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-rose-300/80 mb-3">
          <span>A Letter From My Soul</span>
          <span aria-hidden="true">·</span>
          <span>Read In The Quiet</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-cormorant font-semibold text-rose-50 tracking-tight">
          One Last Thing, My Darling ❤️
        </h2>
        <p className="mt-3 text-sm sm:text-base text-rose-200/75 font-sans-body">
          Before you close this tab and step back into the world, take this with you.
        </p>
      </div>

      {/* Parchment Love Letter Card */}
      <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 letter-paper shadow-2xl border border-amber-200/60 text-stone-900 overflow-hidden transform transition-all duration-300 hover:shadow-rose-900/20">
        
        {/* Decorative Top Stamp & Date */}
        <div className="flex items-center justify-between border-b border-stone-300/80 pb-6 mb-8 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="font-serif-display uppercase tracking-widest text-[11px] font-semibold text-stone-700">
              Personal & Confidential
            </span>
          </div>
          <span className="font-handwriting text-xl text-stone-700">
            For Sneha Ji &middot; Always
          </span>
        </div>

        {/* Salutation */}
        <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-stone-900 mb-6 italic">
          Dear Sneha ji,
        </h3>

        {/* Body Paragraphs */}
        <div className="space-y-5 text-base sm:text-lg lg:text-xl font-serif-cormorant text-stone-800 leading-relaxed font-normal">
          <p>
            I know I haven&apos;t had as much of you lately as my heart wishes for. I miss talking to you properly. I miss hearing about your day, sharing silly little things, and simply being present in each other&apos;s lives.
          </p>

          <p className="text-stone-900 font-medium italic">
            But I never want my missing you to become another weight on your shoulders.
          </p>

          <p>
            I know you&apos;re working hard, and I want you to grow, achieve everything you dream of, and become everything you&apos;ve ever wanted to be.
          </p>

          <p>
            I just hope that, somewhere between all the responsibilities and all the long days, you remember that you have someone who cares about you beyond words.
          </p>

          <div className="my-6 p-4 rounded-xl bg-rose-500/5 border border-rose-900/10 text-stone-900 italic font-medium">
            You don&apos;t owe me constant attention. You don&apos;t have to apologize for being busy. I just want you to be okay, to feel loved, and to remember that you matter so much.
          </div>

          <p>
            Until I can give you a real hug, let this little website be my way of holding your hand from afar.
          </p>

          <p className="font-medium text-stone-900">
            Take care of yourself for me, okay, my Darling Sneha ji?
          </p>

          <p className="text-stone-900 font-semibold italic text-xl sm:text-2xl pt-2">
            I miss you. I adore you. And I am always, always rooting for you.
          </p>
        </div>

        {/* Sign-off & Signature */}
        <div className="mt-10 pt-8 border-t border-stone-300/80 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">
              Devotedly,
            </p>
            <p className="font-handwriting text-3xl sm:text-4xl text-rose-900 font-bold">
              Yours, with all my love. ❤️
            </p>
          </div>

          {/* Golden Wax Seal */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-800 via-rose-700 to-pink-600 border-2 border-amber-200/60 shadow-lg flex items-center justify-center text-white shrink-0 self-end">
            <Heart className="w-6 h-6 fill-white" />
          </div>
        </div>

      </div>

      {/* Final Hug Button */}
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={handleFinalHugClick}
          className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-semibold text-rose-950 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-300 hover:from-white hover:to-rose-200 shadow-2xl shadow-rose-950/50 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200 cursor-pointer"
        >
          <Heart className="w-5 h-5 text-rose-600 fill-rose-500 animate-pulse" />
          <span>One More Hug Before You Go 🫂</span>
        </button>
        <p className="text-xs text-rose-300/60 mt-3 font-light">
          Whenever you need warmth, this hug is right here.
        </p>
      </div>

      {/* Full-Screen Gentle Burst of Hearts & Hug Modal */}
      {showFinalHugModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={handleCloseHugModal}
        >
          {/* Floating burst particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="fixed pointer-events-none transition-all duration-1000 ease-out"
              style={{
                left: `${p.x}%`,
                bottom: `${p.y}%`,
                transform: `rotate(${p.rotation}deg)`,
                animation: `floatGentle ${p.speed}s ease-in-out infinite`,
              }}
            >
              <Heart
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  color: p.color,
                  fill: p.color,
                  opacity: 0.75,
                }}
              />
            </div>
          ))}

          {/* Grand Affirmation Card */}
          <div
            className="relative max-w-xl w-full rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#2b1236] via-[#1f0b27] to-[#120519] border-2 border-rose-300/50 shadow-2xl text-center transform animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseHugModal}
              className="absolute top-4 right-4 p-2 text-rose-300/60 hover:text-white rounded-full"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-300 mx-auto flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 fill-rose-400 animate-pulse" />
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-rose-300 font-semibold mb-4">
              My Unshakeable Promise To You
            </p>

            <h3 className="font-serif-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold text-rose-100 leading-snug tracking-wide uppercase px-2 mb-6">
              YOU ARE LOVED. YOU ARE APPRECIATED. YOU DESERVE REST. AND YOU NEVER HAVE TO BE PERFECT TO BE MY FAVORITE PERSON. 💗
            </h3>

            <p className="text-sm sm:text-base text-rose-200/80 font-sans-body font-light mb-8 max-w-md mx-auto">
              Now rest your eyes, breathe gently, and know that you are wrapped in my love tonight and every night.
            </p>

            <button
              type="button"
              onClick={handleCloseHugModal}
              className="px-8 py-3 rounded-full text-xs sm:text-sm font-semibold text-rose-950 bg-rose-200 hover:bg-white shadow-lg transition-colors cursor-pointer"
            >
              I feel your hug, my love 🫂
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
