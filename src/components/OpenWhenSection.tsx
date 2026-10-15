import React, { useState } from 'react';
import { Mail, Sparkles, X, Heart, Send } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

interface EnvelopeItem {
  id: number;
  label: string;
  sealText: string;
  envelopeColor: string;
  tagline: string;
  letterTitle: string;
  letterBody: string;
  signoff: string;
}

const ENVELOPES: EnvelopeItem[] = [
  {
    id: 1,
    label: 'Open When You Miss Me',
    sealText: '💌 Distance',
    envelopeColor: 'from-[#421d3b] to-[#291129]',
    tagline: 'When the longing grows heavy...',
    letterTitle: 'For The Quiet Hours When You Wish I Was There',
    letterBody:
      'My Sneha ji, if I could close the distance between us with a single wish, I would. Until then, let these words hold you for a little while. You are missed in the smallest moments, remembered in the quietest hours, and loved even when the day gets too busy for us to talk.',
    signoff: 'Always holding your hand in spirit',
  },
  {
    id: 2,
    label: 'Open After a Long Day',
    sealText: '🌙 Rest',
    envelopeColor: 'from-[#3a1b47] to-[#200e2b]',
    tagline: 'When your energy has run dry...',
    letterTitle: 'You Survived Today, My Love',
    letterBody:
      "Baby, I'm proud of you for making it through another day. You can take off your brave face now. You can be tired, quiet, emotional, or completely unproductive. You are still my favorite person. Now please rest, my darling.",
    signoff: 'Forever in your corner',
  },
  {
    id: 3,
    label: 'Open When You Doubt Yourself',
    sealText: '✨ Strength',
    envelopeColor: 'from-[#4a243a] to-[#2c1325]',
    tagline: 'When the world shakes your confidence...',
    letterTitle: 'Through My Eyes, You Are Wonder',
    letterBody:
      'I wish you could see yourself through my eyes for just a minute. You would understand why I admire you, why your happiness matters to me, and why I never need you to be perfect to love you.',
    signoff: 'Your biggest believer',
  },
  {
    id: 4,
    label: 'Open Just Because I Love You',
    sealText: '💗 Pure Love',
    envelopeColor: 'from-[#441a37] to-[#260f22]',
    tagline: 'No reason needed, no occasion required...',
    letterTitle: 'Simply Because My Heart Found Yours',
    letterBody:
      'There\'s no special occasion today. No anniversary, no birthday, no big reason. I just wanted to remind you that somewhere in this enormous world, there is a heart that is incredibly fond of yours. And that heart is mine. Always yours, my Darling Sneha ji. ❤️',
    signoff: 'Yours unconditionally, today and always',
  },
];

export const OpenWhenSection: React.FC = () => {
  const [openedEnvelope, setOpenedEnvelope] = useState<EnvelopeItem | null>(null);

  const handleOpenEnvelope = (envelope: EnvelopeItem) => {
    ambientAudio.playChime();
    setOpenedEnvelope(envelope);
  };

  const handleClose = () => {
    ambientAudio.playSoftPop();
    setOpenedEnvelope(null);
  };

  return (
    <section id="letters" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-rose-300/80 mb-3">
          <span>Sealed With Devotion</span>
          <span aria-hidden="true">·</span>
          <span>Open Anytime</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-cormorant font-semibold text-rose-50 tracking-tight">
          Open When You Need Me 💌
        </h2>
        <p className="mt-3 text-sm sm:text-base text-rose-200/75 font-sans-body">
          Four digital envelopes kept safe for you. Whenever a specific feeling comes over you, break the seal.
        </p>
      </div>

      {/* 4 Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ENVELOPES.map((env) => (
          <div
            key={env.id}
            onClick={() => handleOpenEnvelope(env)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenEnvelope(env);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Open envelope: ${env.label}`}
            className="group relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400/50 rounded-2xl transform hover:-translate-y-1.5 transition-all duration-300"
          >
            {/* Envelope Body */}
            <div
              className={`relative rounded-2xl p-6 sm:p-7 min-h-[260px] bg-gradient-to-b ${env.envelopeColor} border border-rose-300/30 shadow-xl shadow-rose-950/40 flex flex-col justify-between overflow-hidden group-hover:border-rose-300/60 transition-colors`}
            >
              {/* Envelope Flap Accent Top */}
              <div
                className="absolute top-0 left-0 right-0 h-14 bg-rose-400/10 border-b border-rose-300/20"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              />

              {/* Top Row: Stamp & Seal */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="text-[11px] font-medium tracking-wide text-rose-300/80 uppercase">
                  Letter No. 0{env.id}
                </span>

                {/* Postage Stamp */}
                <div className="w-9 h-11 rounded border border-dashed border-rose-300/50 bg-rose-950/40 flex flex-col items-center justify-center p-1 shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/40" />
                  <span className="text-[7px] text-rose-300/70 font-mono mt-0.5">SNEHA</span>
                </div>
              </div>

              {/* Center Seal & Label */}
              <div className="relative z-10 text-center my-4">
                {/* Wax Seal Button */}
                <div className="w-12 h-12 rounded-full mx-auto bg-gradient-to-tr from-rose-700 via-rose-600 to-pink-500 border border-rose-300/40 shadow-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5 text-white fill-white/80" />
                </div>

                <h3 className="font-serif-cormorant text-xl sm:text-2xl font-semibold text-rose-100 leading-snug">
                  {env.label}
                </h3>
                <p className="text-xs text-rose-300/65 mt-1 font-light italic">
                  {env.tagline}
                </p>
              </div>

              {/* Bottom Cue */}
              <div className="relative z-10 flex items-center justify-center gap-1.5 text-xs text-rose-300/80 group-hover:text-rose-100 transition-colors pt-2 border-t border-rose-400/15">
                <Mail className="w-3.5 h-3.5" />
                <span>Tap to break seal & read</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Letter Modal */}
      {openedEnvelope && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-300"
          onClick={handleClose}
        >
          <div
            className="relative max-w-xl w-full rounded-3xl p-6 sm:p-10 letter-paper shadow-2xl border border-amber-200/40 transform transition-all animate-in zoom-in-95 duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition-colors cursor-pointer"
              aria-label="Close letter"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="border-b border-stone-300/70 pb-4 mb-6">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="font-serif-display tracking-widest uppercase">
                  {openedEnvelope.label}
                </span>
                <span>To: My Darling Sneha Ji</span>
              </div>
              <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-stone-900">
                {openedEnvelope.letterTitle}
              </h3>
            </div>

            {/* Letter Body (Exact text) */}
            <div className="py-2">
              <p className="font-serif-cormorant text-xl sm:text-2xl text-stone-800 leading-relaxed font-normal italic">
                &ldquo;{openedEnvelope.letterBody}&rdquo;
              </p>
            </div>

            {/* Sign-off */}
            <div className="mt-8 pt-6 border-t border-stone-300/70 flex items-center justify-between">
              <div>
                <p className="font-handwriting text-2xl text-stone-800">
                  {openedEnvelope.signoff}
                </p>
                <p className="text-xs text-stone-500 uppercase tracking-widest mt-0.5">
                  Always with you
                </p>
              </div>

              {/* Wax Seal Detail */}
              <div className="w-10 h-10 rounded-full bg-rose-700 text-white flex items-center justify-center shadow-inner">
                <Heart className="w-4 h-4 fill-white" />
              </div>
            </div>

            {/* Close / Re-tuck button */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 rounded-full text-xs font-medium text-stone-700 bg-stone-200/70 hover:bg-stone-300 transition-colors cursor-pointer"
              >
                Re-seal & tuck away into envelope
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
