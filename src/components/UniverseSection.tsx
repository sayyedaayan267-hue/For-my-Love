import React, { useState, useEffect } from 'react';
import { Moon, Sparkles, Send, Star, Trash2 } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

interface StoredWish {
  id: string;
  text: string;
  date: string;
}

export const UniverseSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishInput, setWishInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [shootingStarActive, setShootingStarActive] = useState(false);
  const [savedWishes, setSavedWishes] = useState<StoredWish[]>([]);
  const [showWishesDrawer, setShowWishesDrawer] = useState(false);

  // Load saved wishes locally from device
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sneha_universe_wishes');
      if (stored) {
        setSavedWishes(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleOpenModal = () => {
    ambientAudio.playChime();
    setWishInput('');
    setSubmittedMessage(null);
    setIsModalOpen(true);
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.trim() || isSubmitting) return;

    setIsSubmitting(true);
    ambientAudio.playChime();

    // Trigger local shooting star animation
    setShootingStarActive(true);

    // Save wish locally on device (no server/backend fake delivery)
    const newWish: StoredWish = {
      id: Date.now().toString(),
      text: wishInput.trim(),
      date: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    const updated = [newWish, ...savedWishes];
    setSavedWishes(updated);
    try {
      localStorage.setItem('sneha_universe_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setShootingStarActive(false);
      setSubmittedMessage(
        'Wish sent to our little universe. Whatever tomorrow brings, I hope it brings you a little more peace, a little more happiness, and many reasons to smile.'
      );
    }, 1200);
  };

  const handleDeleteWish = (id: string) => {
    ambientAudio.playSoftPop();
    const updated = savedWishes.filter((w) => w.id !== id);
    setSavedWishes(updated);
    try {
      localStorage.setItem('sneha_universe_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <section id="universe" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Glowing Celestial Card */}
      <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#22102e]/85 via-[#180a22]/95 to-[#0e0614] border border-rose-400/25 shadow-2xl shadow-purple-950/50 text-center">
        
        {/* Shooting Star Flare Effect */}
        {shootingStarActive && (
          <div
            className="absolute top-8 right-12 w-48 h-0.5 bg-gradient-to-r from-transparent via-rose-200 to-white shadow-[0_0_15px_#fff] transform -rotate-45 animate-in fade-in duration-300 pointer-events-none"
            style={{
              animation: 'shootingStar 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
            }}
          />
        )}

        {/* Ambient Moon & Constellation Icon */}
        <div className="relative inline-flex items-center justify-center mb-8">
          {/* Moon Glow */}
          <div className="absolute -inset-6 bg-gradient-to-tr from-rose-500/20 via-pink-300/25 to-purple-500/20 rounded-full blur-2xl animate-pulse-glow" />
          
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#3b204c] to-[#1e0e29] border border-rose-300/40 flex items-center justify-center shadow-inner">
            <Moon className="w-12 h-12 text-rose-200 fill-rose-200/40 drop-shadow-[0_0_15px_rgba(251,207,232,0.8)]" />
          </div>

          {/* Orbiting Starlet */}
          <div className="absolute -top-1 -right-1 text-rose-300 animate-twinkle">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Section Heading & Subtitle */}
        <p className="text-xs uppercase tracking-[0.25em] text-rose-300/80 mb-3 font-medium">
          Section Five · Infinite & Quiet
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-cormorant font-semibold text-rose-50 tracking-tight mb-8">
          Our Little Universe 🌙
        </h2>

        {/* Exact Core Message */}
        <div className="max-w-2xl mx-auto space-y-4 text-lg sm:text-xl lg:text-2xl font-serif-cormorant font-normal text-rose-100/90 leading-relaxed italic">
          <p>
            &ldquo;Somewhere between all the busy days, unfinished conversations, and things life asks of us, there is still an us.
          </p>
          <p className="text-rose-200 font-medium">
            And I will always be grateful for that.&rdquo;
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleOpenModal}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold text-rose-950 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-300 hover:from-white hover:to-rose-200 shadow-xl shadow-rose-950/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-rose-600 transition-transform group-hover:rotate-12" />
            <span>Make a Wish With Me ✨</span>
          </button>

          {savedWishes.length > 0 && (
            <button
              type="button"
              onClick={() => {
                ambientAudio.playSoftPop();
                setShowWishesDrawer(!showWishesDrawer);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/20 transition-colors"
            >
              <Star className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
              <span>Your Saved Starlight Wishes ({savedWishes.length})</span>
            </button>
          )}
        </div>

        {/* Saved Wishes Panel */}
        {showWishesDrawer && savedWishes.length > 0 && (
          <div className="mt-8 pt-8 border-t border-rose-400/15 max-w-xl mx-auto text-left animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-rose-300/80 font-medium">
                Saved Privately On Your Device
              </span>
              <span className="text-xs text-rose-300/50">
                Only visible to you
              </span>
            </div>
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {savedWishes.map((w) => (
                <div
                  key={w.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl bg-purple-950/40 border border-rose-400/15 text-xs text-rose-100"
                >
                  <div className="space-y-1">
                    <p className="font-serif-cormorant text-base sm:text-lg italic text-rose-200">
                      &ldquo;{w.text}&rdquo;
                    </p>
                    <p className="text-[10px] text-rose-300/60 font-mono">
                      Wished on {w.date}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteWish(w.id)}
                    className="p-1 text-rose-300/40 hover:text-rose-200 transition-colors"
                    title="Remove wish"
                    aria-label="Remove wish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Make A Wish Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => {
            if (!isSubmitting) setIsModalOpen(false);
          }}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl p-6 sm:p-8 bg-[#23112c] border border-rose-300/30 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-300" />
                <h3 className="font-serif-cormorant text-2xl font-semibold text-rose-100">
                  A Wish For Our Little Universe
                </h3>
              </div>
              {!isSubmitting && (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-rose-300/60 hover:text-rose-200 text-sm p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {submittedMessage ? (
              <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-300 mx-auto flex items-center justify-center">
                  <Star className="w-7 h-7 fill-rose-300 animate-pulse" />
                </div>
                <p className="font-serif-cormorant text-xl sm:text-2xl text-rose-100 font-medium leading-relaxed italic">
                  &ldquo;{submittedMessage}&rdquo;
                </p>
                <p className="text-xs text-rose-300/60 font-light">
                  Safely tucked into the stars on your device.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-rose-950 bg-rose-200 hover:bg-white transition-colors"
                  >
                    Return to our world
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitWish} className="space-y-4">
                <p className="text-xs sm:text-sm text-rose-200/80">
                  Type a secret wish, a prayer for tomorrow, or a thought you want the night sky to hold for you:
                </p>

                <textarea
                  rows={4}
                  value={wishInput}
                  onChange={(e) => setWishInput(e.target.value)}
                  placeholder="e.g., I wish for a peaceful morning tomorrow, good energy, and time for us..."
                  maxLength={300}
                  className="w-full p-3.5 rounded-2xl bg-rose-950/40 border border-rose-400/30 text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-400/70 text-sm font-sans-body resize-none"
                  autoFocus
                />

                <div className="flex items-center justify-between text-xs text-rose-300/60">
                  <span>Kept private in your browser</span>
                  <span>{wishInput.length}/300</span>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl text-xs text-rose-300/80 hover:text-rose-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!wishInput.trim() || isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-rose-950 bg-rose-200 hover:bg-white disabled:opacity-40 transition-all cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        <span>Releasing into stars...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send to the Stars ✨</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
