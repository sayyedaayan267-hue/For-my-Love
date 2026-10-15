import React, { useState } from 'react';
import { Heart, Sparkles, Coffee, Smile, Compass } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

interface MoodOption {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  badge: string;
  message: string;
  careTip: string;
}

const MOODS: MoodOption[] = [
  {
    id: 'miss-you',
    emoji: '🥺',
    title: 'I Miss You',
    subtitle: 'When the distance or silence feels too loud',
    badge: 'No Distance Changes Us',
    message:
      'I miss you too, my little love. I miss our conversations, your presence, and those moments when everything else fades away because it\'s just us. I know life is busy right now, but you still have a place in my heart that no distance or silence can take away.',
    careTip: 'Close your eyes for 10 seconds and feel me thinking of you right now.',
  },
  {
    id: 'exhausted',
    emoji: '😮‍💨',
    title: "I'm Exhausted",
    subtitle: 'When work and demands drained your energy',
    badge: 'Permission To Rest',
    message:
      'Come here, sweetheart. You don\'t have to solve everything tonight. Put the weight down for a moment. Drink some water, relax your eyes, and give yourself permission to rest. The world can wait.',
    careTip: 'Take a long sip of warm water, stretch your neck, and let yourself be soft.',
  },
  {
    id: 'affection',
    emoji: '🫂',
    title: 'I Need Affection',
    subtitle: 'When you crave closeness, warmth, and sweetness',
    badge: 'Virtual Cuddle Session',
    message:
      'If I were there, I\'d pull you into the safest hug, hold your hand, play with your hair, and cover your face with tiny kisses until you couldn\'t stop smiling. Consider this your virtual cuddle session, my darling. 💋',
    careTip: 'Wrap yourself in your favorite blanket and pretend it’s my arms.',
  },
  {
    id: 'bad-day',
    emoji: '🌧️',
    title: "I'm Having a Bad Day",
    subtitle: 'When things went wrong or felt unfair',
    badge: 'Safe With Me',
    message:
      'One difficult day doesn\'t define your life, and one difficult moment doesn\'t diminish your worth. You don\'t have to pretend to be okay with me. Whatever you\'re feeling, you deserve patience, gentleness, and care.',
    careTip: 'You never have to perform happiness around me. All of you is welcome.',
  },
];

export const HeartNeedsSection: React.FC = () => {
  const [selectedMoodId, setSelectedMoodId] = useState<string>('miss-you');

  const selectedMood = MOODS.find((m) => m.id === selectedMoodId) || MOODS[0];

  const handleSelectMood = (id: string) => {
    ambientAudio.playChime();
    setSelectedMoodId(id);
  };

  return (
    <section id="heart-needs" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-rose-300/80 mb-3">
          <span>Emotional Sanctuary</span>
          <span aria-hidden="true">·</span>
          <span>Tell Me How You Feel</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-cormorant font-semibold text-rose-50 tracking-tight">
          Choose What Your Heart Needs Today 🌷
        </h2>
        <p className="mt-3 text-sm sm:text-base text-rose-200/75 font-sans-body">
          No matter how your day unfolded, there is always understanding and gentle love waiting for you.
        </p>
      </div>

      {/* 4 Interactive Mood Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {MOODS.map((mood) => {
          const isSelected = mood.id === selectedMoodId;
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => handleSelectMood(mood.id)}
              className={`group relative p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-[#381c42] to-[#24102e] border-2 border-rose-300/60 shadow-xl shadow-rose-950/40 scale-102'
                  : 'glass-card hover:bg-rose-950/30 border-rose-400/20 hover:border-rose-400/40'
              }`}
            >
              <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                {mood.emoji}
              </div>
              <div>
                <p className={`text-sm sm:text-base font-semibold leading-tight ${isSelected ? 'text-rose-100' : 'text-rose-200'}`}>
                  {mood.title}
                </p>
                <p className="text-[11px] text-rose-300/60 mt-1 line-clamp-1 font-light">
                  {mood.subtitle}
                </p>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,114,182,0.9)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Personalized Response Display Area */}
      <div className="relative rounded-3xl p-6 sm:p-10 glass-card border border-rose-300/25 shadow-2xl overflow-hidden">
        {/* Ambient background blur */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Tag & Emoji */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-rose-400/15">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">{selectedMood.emoji}</span>
              <div>
                <p className="text-xs uppercase tracking-widest text-rose-300/80 font-medium">
                  {selectedMood.badge}
                </p>
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-rose-100">
                  {selectedMood.title}
                </h3>
              </div>
            </div>

            <span className="text-xs text-rose-300/60 italic hidden sm:inline">
              Spoken straight from my heart
            </span>
          </div>

          {/* Exact Heartfelt Message */}
          <div className="py-2">
            <p className="font-serif-cormorant text-xl sm:text-2xl lg:text-3xl text-rose-50 font-normal leading-relaxed italic tracking-wide">
              &ldquo;{selectedMood.message}&rdquo;
            </p>
          </div>

          {/* Sweet Care Tip Box */}
          <div className="mt-8 pt-6 border-t border-rose-400/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-rose-200/80">
              <Sparkles className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong className="text-rose-300 font-medium">A little ritual for you: </strong>
                {selectedMood.careTip}
              </span>
            </div>

            <button
              type="button"
              onClick={() => ambientAudio.playHeartbeat()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/20 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
              <span>Feeling heard 💗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
