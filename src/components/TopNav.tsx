import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart, Menu, X } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

interface TopNavProps {
  onReopenWelcome: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onReopenWelcome }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentMode, setCurrentMode] = useState<'lullaby' | 'starlight' | 'rain'>('lullaby');
  const [volume, setVolume] = useState(0.35);
  const [showAudioPopover, setShowAudioPopover] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsPlayingMusic(ambientAudio.getIsPlaying());
  }, []);

  const handleToggleAudio = () => {
    const newState = ambientAudio.toggle(currentMode);
    setIsPlayingMusic(newState);
  };

  const handleChangeMode = (mode: 'lullaby' | 'starlight' | 'rain') => {
    setCurrentMode(mode);
    ambientAudio.setMode(mode);
    setIsPlayingMusic(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ambientAudio.setVolume(val);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#120a1a]/85 backdrop-blur-md border-b border-rose-300/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Wordmark (Single text element) */}
        <a
          href="#root"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-base sm:text-lg font-serif-cormorant font-bold text-rose-100 hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>Sneha Ji&apos;s World</span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
        </a>

        {/* Zone 2: Navigation Links (single-line, whitespace-nowrap) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-rose-200/80">
          <a
            href="#reminders"
            className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0"
          >
            Reminders
          </a>
          <a
            href="#relax"
            className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0"
          >
            Relax Corner
          </a>
          <a
            href="#heart-needs"
            className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0"
          >
            Heart&apos;s Need
          </a>
          <a
            href="#letters"
            className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0"
          >
            Open Letters
          </a>
          <a
            href="#universe"
            className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0"
          >
            Our Universe
          </a>
          <a
            href="#final-letter"
            className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0"
          >
            My Letter
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action & Audio Control */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Ambient Music Toggle & Settings Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAudioPopover(!showAudioPopover)}
              className={`p-2 rounded-full border transition-all duration-200 flex items-center gap-1.5 text-xs ${
                isPlayingMusic
                  ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                  : 'bg-rose-950/40 border-rose-400/20 text-rose-300/70 hover:text-rose-100'
              }`}
              title="Ambient Music (Off by default)"
              aria-label="Ambient Music Settings"
            >
              {isPlayingMusic ? (
                <>
                  <Volume2 className="w-4 h-4 text-rose-300 animate-pulse" />
                  <span className="hidden sm:inline font-mono text-[11px]">Music Playing</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">Music Off</span>
                </>
              )}
            </button>

            {/* Audio Dropdown Popover */}
            {showAudioPopover && (
              <div className="absolute right-0 mt-2 w-64 p-4 rounded-2xl bg-[#23122c] border border-rose-400/30 shadow-2xl z-50 text-xs animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-rose-400/15">
                  <span className="font-semibold text-rose-100">Ambient Music</span>
                  <button
                    type="button"
                    onClick={() => setShowAudioPopover(false)}
                    className="text-rose-300/60 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={handleToggleAudio}
                    className="w-full py-2 rounded-xl text-xs font-semibold bg-rose-200 text-rose-950 hover:bg-white transition-colors cursor-pointer"
                  >
                    {isPlayingMusic ? 'Pause Music' : 'Play Soothing Music ✨'}
                  </button>
                </div>

                <p className="text-[11px] text-rose-300/70 mb-2 font-medium">Choose Ambient Sound:</p>
                <div className="space-y-1.5 mb-3">
                  <button
                    type="button"
                    onClick={() => handleChangeMode('lullaby')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      currentMode === 'lullaby'
                        ? 'bg-rose-500/25 text-rose-100 font-medium'
                        : 'text-rose-300/70 hover:bg-rose-500/10'
                    }`}
                  >
                    <span>🌸 Starry Lullaby (Soft Chords)</span>
                    {currentMode === 'lullaby' && isPlayingMusic && <span className="text-[10px]">Active</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChangeMode('starlight')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      currentMode === 'starlight'
                        ? 'bg-rose-500/25 text-rose-100 font-medium'
                        : 'text-rose-300/70 hover:bg-rose-500/10'
                    }`}
                  >
                    <span>✨ Celestial Chimes</span>
                    {currentMode === 'starlight' && isPlayingMusic && <span className="text-[10px]">Active</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChangeMode('rain')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      currentMode === 'rain'
                        ? 'bg-rose-500/25 text-rose-100 font-medium'
                        : 'text-rose-300/70 hover:bg-rose-500/10'
                    }`}
                  >
                    <span>🌧️ Gentle Night Rain</span>
                    {currentMode === 'rain' && isPlayingMusic && <span className="text-[10px]">Active</span>}
                  </button>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-rose-300/70 mb-1">
                    <span>Volume</span>
                    <span>{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-rose-400 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button: Revisit Welcome Screen */}
          <button
            type="button"
            onClick={onReopenWelcome}
            className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-medium text-rose-950 bg-rose-200 rounded-lg hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Welcome Note
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-rose-200 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-rose-400/15 bg-[#170c22]/95 px-4 py-4 space-y-2.5 animate-in slide-in-from-top-2 duration-200">
          <a
            href="#reminders"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-rose-200 py-1.5"
          >
            A Little Reminder, My Love
          </a>
          <a
            href="#relax"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-rose-200 py-1.5"
          >
            Relaxation Corner (Breathing, Clouds, Hug)
          </a>
          <a
            href="#heart-needs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-rose-200 py-1.5"
          >
            What Your Heart Needs Today
          </a>
          <a
            href="#letters"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-rose-200 py-1.5"
          >
            Open When You Need Me (4 Envelopes)
          </a>
          <a
            href="#universe"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-rose-200 py-1.5"
          >
            Our Little Universe (Make a Wish)
          </a>
          <a
            href="#final-letter"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-rose-200 py-1.5"
          >
            One Last Thing, My Darling (Love Letter)
          </a>
          <div className="pt-2 border-t border-rose-400/15 flex items-center">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onReopenWelcome();
              }}
              className="text-xs text-rose-300 font-medium"
            >
              Read Welcome Note Again
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
