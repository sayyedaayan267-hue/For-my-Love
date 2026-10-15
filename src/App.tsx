/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StarryBackground } from './components/StarryBackground';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TopNav } from './components/TopNav';
import { RemindersSection } from './components/RemindersSection';
import { RelaxationCorner } from './components/RelaxationCorner';
import { HeartNeedsSection } from './components/HeartNeedsSection';
import { OpenWhenSection } from './components/OpenWhenSection';
import { UniverseSection } from './components/UniverseSection';
import { FinalLetterSection } from './components/FinalLetterSection';
import { Footer } from './components/Footer';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f0a15] text-[#fdf2f4] relative selection:bg-rose-500/25 selection:text-rose-100">
      {/* Dynamic Starry Canvas in the background */}
      <StarryBackground />

      {/* Initial Landing Welcome Screen */}
      {!hasEntered && (
        <WelcomeScreen onEnter={() => setHasEntered(true)} />
      )}

      {/* Main Website Container */}
      <div className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navigation Bar */}
        <TopNav
          onReopenWelcome={() => setHasEntered(false)}
        />

        {/* Hero Banner Intro Ribbon */}
        <div className="relative pt-12 pb-6 px-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs mb-4">
            <span>🧸 Sneha&apos;s Private Sanctuary</span>
            <span aria-hidden="true">&middot;</span>
            <span>No rush &middot; Just love</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-cormorant font-bold text-rose-100 tracking-tight leading-tight">
            For My Darling Sneha Ji
          </h1>
          <p className="font-serif-cormorant text-xl sm:text-2xl text-rose-200/80 italic mt-2">
            A little world built to remind you that you are deeply, unconditionally loved.
          </p>
        </div>

        {/* Main Content Sections */}
        <main className="relative z-10 space-y-12 sm:space-y-20 pb-16">
          {/* Section One: Love Reminders */}
          <RemindersSection />

          {/* Section Two: Relaxation Corner (Breathing, Clouds, Hug) */}
          <RelaxationCorner />

          {/* Section Three: Choose What Your Heart Needs Today */}
          <HeartNeedsSection />

          {/* Section Four: Open When You Need Me (4 Envelopes) */}
          <OpenWhenSection />

          {/* Section Five: Our Little Universe (Make a Wish) */}
          <UniverseSection />

          {/* Section Six: One Last Thing, My Darling (Final Letter & Big Hug Burst) */}
          <FinalLetterSection />
        </main>

        {/* Quiet Heartfelt Footer */}
        <Footer />
      </div>
    </div>
  );
}
