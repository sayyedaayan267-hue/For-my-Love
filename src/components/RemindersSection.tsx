import React, { useState } from 'react';
import { Heart, Sparkles, RefreshCw, BookmarkCheck } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

interface LoveReminder {
  id: number;
  kicker: string;
  frontPreview: string;
  fullMessage: string;
  tag: string;
}

const PRIMARY_REMINDERS: LoveReminder[] = [
  {
    id: 1,
    kicker: "On Worth & Rest",
    frontPreview: "When the work never seems to stop...",
    fullMessage: "You don't have to be productive every second of your life to be worthy of love.",
    tag: "Rest Without Guilt",
  },
  {
    id: 2,
    kicker: "Across The Silence",
    frontPreview: "On days when time slips between our hands...",
    fullMessage: "Even when we don't get to talk properly, you never become any less important to me.",
    tag: "Always In My Heart",
  },
  {
    id: 3,
    kicker: "Who You Are",
    frontPreview: "Beyond all your achievements and titles...",
    fullMessage: "I'm proud of the woman you are, not just for what you achieve, but for the person you are.",
    tag: "Proud of You",
  },
  {
    id: 4,
    kicker: "Your Sacred Right",
    frontPreview: "A gentle truth I want you to remember...",
    fullMessage: "You deserve rest without guilt, happiness without reason, and love without having to ask for it.",
    tag: "Unconditional",
  },
  {
    id: 5,
    kicker: "My Favorite Place",
    frontPreview: "If geography were just a wish away...",
    fullMessage: "If I could be anywhere right now, I'd choose to be beside you, letting you rest your head on my shoulder.",
    tag: "Right Beside You",
  },
  {
    id: 6,
    kicker: "For My Darling Sneha Ji",
    frontPreview: "What the rest of the world misses...",
    fullMessage: "My Darling Sneha ji, the world gets to see your strength. I wish I could be there to take care of the tired parts of you, too.",
    tag: "Gentle Care",
  },
  {
    id: 7,
    kicker: "Zero Conditions",
    frontPreview: "Never worry about keeping up with messages...",
    fullMessage: "You never have to earn my affection by being available all the time. I love you even on your busiest days.",
    tag: "Always Here",
  },
];

const BONUS_LOVE_NOTES: string[] = [
  "You are the softest thought in the middle of all my chaotic days, Sneha ji.",
  "Drink a sip of water, drop your shoulders, and smile. Your boyfriend is sending you a big warm hug right now.",
  "Your laughter is my favorite sound in this entire world. Never let anyone dim it.",
  "You do so much with such grace. Give yourself credit for all the little battles you won today.",
  "I am falling in love with you all over again, every single day, without even trying.",
  "If today was tough, tonight is your sanctuary. Sleep peacefully knowing you are deeply cherished.",
];

export const RemindersSection: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [randomModalNote, setRandomModalNote] = useState<string | null>(null);

  const toggleCard = (id: number) => {
    ambientAudio.playSoftPop();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    ambientAudio.playHeartbeat();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGiveAnotherNote = () => {
    ambientAudio.playChime();
    const note = BONUS_LOVE_NOTES[Math.floor(Math.random() * BONUS_LOVE_NOTES.length)];
    setRandomModalNote(note);
  };

  return (
    <section id="reminders" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-rose-300/80 mb-3">
          <span>Tender Truths For You</span>
          <span aria-hidden="true">·</span>
          <span>Tap Any Card To Reveal</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-cormorant font-semibold text-rose-50 tracking-tight">
          A Little Reminder, My Love 💌
        </h2>
        <p className="mt-3 text-sm sm:text-base text-rose-200/75 font-sans-body">
          Gentle words for when work feels overwhelming, or when you just need to feel how deeply you are loved.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRIMARY_REMINDERS.map((item) => {
          const isRevealed = !!flippedCards[item.id];
          const isFaved = !!favorites[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleCard(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleCard(item.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Love reminder card: ${item.kicker}. Tap to toggle reading message.`}
              className={`group relative text-left rounded-2xl p-6 sm:p-7 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-rose-400/50 min-h-[220px] flex flex-col justify-between ${
                isRevealed
                  ? 'bg-gradient-to-br from-[#2f1938]/90 to-[#22102b]/95 border border-rose-300/40 shadow-xl shadow-rose-950/30'
                  : 'glass-card glass-card-hover'
              }`}
            >
              {/* Top Row: Tag & Heart Bookmark */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-rose-300/90 font-medium tracking-wide">
                  {item.kicker}
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(e, item.id)}
                  className="p-1 rounded-full text-rose-300/60 hover:text-rose-200 transition-colors focus:outline-none"
                  title="Save to heart"
                  aria-label="Save note to heart"
                >
                  <Heart
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isFaved ? 'fill-rose-400 text-rose-400' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="my-4">
                {isRevealed ? (
                  <p className="font-serif-cormorant text-xl sm:text-2xl text-rose-100 font-medium leading-relaxed italic animate-in fade-in zoom-in-95 duration-200">
                    &ldquo;{item.fullMessage}&rdquo;
                  </p>
                ) : (
                  <div>
                    <p className="text-sm sm:text-base text-rose-200/80 font-sans-body leading-relaxed mb-3">
                      {item.frontPreview}
                    </p>
                    <p className="text-xs text-rose-300/60 flex items-center gap-1.5 font-light">
                      <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                      <span>Tap to read my note</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between text-xs pt-3 border-t border-rose-400/10">
                <span className="text-rose-300/70 font-light text-[11px]">
                  {item.tag}
                </span>
                <span className="text-rose-400/80 group-hover:text-rose-300 transition-colors text-xs font-medium">
                  {isRevealed ? 'Tap to close' : 'Open card →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Give Me Another Note Action */}
      <div className="mt-12 text-center">
        <button
          onClick={handleGiveAnotherNote}
          type="button"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium text-rose-200 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 hover:border-rose-400/50 shadow-md shadow-rose-950/20 transition-all duration-200 transform hover:scale-102 cursor-pointer"
        >
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400/40" />
          <span>Give Me Another Little Love Note 💗</span>
        </button>
      </div>

      {/* Random Note Modal */}
      {randomModalNote && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setRandomModalNote(null)}
        >
          <div 
            className="relative max-w-md w-full p-8 rounded-3xl bg-[#23122b] border border-rose-400/30 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-300 mx-auto flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-rose-300 animate-spin-slow" />
            </div>
            <p className="text-xs uppercase tracking-widest text-rose-300/80 mb-2 font-medium">
              Whispered Just For You
            </p>
            <p className="font-serif-cormorant text-2xl text-rose-100 font-medium leading-relaxed italic my-4">
              &ldquo;{randomModalNote}&rdquo;
            </p>
            <p className="text-xs text-rose-300/70 mb-6 font-handwriting text-lg">
              — Your sweetheart who adores you
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleGiveAnotherNote}
                className="px-4 py-2 rounded-xl text-xs font-medium text-rose-200 bg-rose-500/20 hover:bg-rose-500/30 transition-colors inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Another one</span>
              </button>
              <button
                type="button"
                onClick={() => setRandomModalNote(null)}
                className="px-5 py-2 rounded-xl text-xs font-medium text-rose-950 bg-rose-200 hover:bg-white transition-colors"
              >
                Keep in my heart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
