import React, { useState, useEffect, useRef } from 'react';
import { Wind, CloudRain, Heart, Play, Pause, RotateCcw, Plus, Sparkles, Check } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

type RelaxationTab = 'breathing' | 'clouds' | 'hug';

interface CloudItem {
  id: string;
  text: string;
  color: string;
  xOffset: number; // slight stagger
  floatDuration: number;
}

const INITIAL_CLOUDS: CloudItem[] = [
  { id: '1', text: 'work', color: 'from-pink-400/20 to-purple-400/20', xOffset: -12, floatDuration: 5 },
  { id: '2', text: 'stress', color: 'from-rose-400/20 to-orange-400/20', xOffset: 8, floatDuration: 6.2 },
  { id: '3', text: 'overthinking', color: 'from-indigo-400/20 to-purple-400/20', xOffset: -6, floatDuration: 5.5 },
  { id: '4', text: 'exhaustion', color: 'from-purple-400/20 to-pink-400/20', xOffset: 14, floatDuration: 6.8 },
  { id: '5', text: 'deadlines', color: 'from-rose-400/20 to-pink-400/20', xOffset: -10, floatDuration: 5.8 },
  { id: '6', text: 'unspoken pressure', color: 'from-purple-400/20 to-indigo-400/20', xOffset: 10, floatDuration: 6.5 },
  { id: '7', text: 'tired eyes', color: 'from-pink-400/20 to-rose-400/20', xOffset: -4, floatDuration: 7 },
  { id: '8', text: 'heavy shoulders', color: 'from-rose-400/20 to-purple-400/20', xOffset: 12, floatDuration: 5.2 },
];

export const RelaxationCorner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RelaxationTab>('breathing');

  // Option A: Breathing State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingSecondsLeft, setBreathingSecondsLeft] = useState(60);
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out' | 'relax'>('in');
  const [breathInstruction, setBreathInstruction] = useState('Breathe in.');
  const timerRef = useRef<number | null>(null);
  const phaseTimerRef = useRef<number | null>(null);

  // Option B: Clouds State
  const [clouds, setClouds] = useState<CloudItem[]>(INITIAL_CLOUDS);
  const [disappearingClouds, setDisappearingClouds] = useState<Record<string, boolean>>({});
  const [customStressInput, setCustomStressInput] = useState('');
  const [poppedCount, setPoppedCount] = useState(0);

  // Option C: Hug State
  const [hugGiven, setHugGiven] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  // Handle Breathing Timer
  useEffect(() => {
    if (isBreathingActive) {
      timerRef.current = window.setInterval(() => {
        setBreathingSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsBreathingActive(false);
            ambientAudio.playChime();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isBreathingActive]);

  // Breathing Cycle Phases: Inhale 4s -> Hold 4s -> Exhale 4s -> Relax 2s
  useEffect(() => {
    if (!isBreathingActive) {
      setBreathInstruction('Breathe in.');
      setBreathPhase('in');
      return;
    }

    let currentPhaseIdx = 0;
    const phases: Array<{ name: 'in' | 'hold' | 'out' | 'relax'; text: string; ms: number }> = [
      { name: 'in', text: 'Breathe in.', ms: 4000 },
      { name: 'hold', text: 'Relax your shoulders.', ms: 4000 },
      { name: 'out', text: 'Breathe out slowly.', ms: 4000 },
      { name: 'relax', text: 'Let your thoughts settle.', ms: 2500 },
    ];

    const advancePhase = () => {
      const p = phases[currentPhaseIdx];
      setBreathPhase(p.name);
      setBreathInstruction(p.text);
      phaseTimerRef.current = window.setTimeout(() => {
        currentPhaseIdx = (currentPhaseIdx + 1) % phases.length;
        advancePhase();
      }, p.ms);
    };

    advancePhase();

    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    };
  }, [isBreathingActive]);

  const toggleBreathing = () => {
    ambientAudio.playSoftPop();
    setIsBreathingActive(!isBreathingActive);
  };

  const resetBreathing = () => {
    ambientAudio.playSoftPop();
    setIsBreathingActive(false);
    setBreathingSecondsLeft(60);
    setBreathPhase('in');
    setBreathInstruction('Breathe in.');
  };

  // Cloud click handler
  const popCloud = (id: string) => {
    ambientAudio.playSoftPop();
    setDisappearingClouds((prev) => ({ ...prev, [id]: true }));
    setPoppedCount((prev) => prev + 1);

    setTimeout(() => {
      setClouds((prev) => prev.filter((c) => c.id !== id));
      setDisappearingClouds((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 600);
  };

  const handleAddCustomStress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStressInput.trim()) return;
    ambientAudio.playChime();
    const newCloud: CloudItem = {
      id: Date.now().toString(),
      text: customStressInput.trim().toLowerCase(),
      color: 'from-rose-500/25 to-pink-500/25',
      xOffset: Math.floor(Math.random() * 20 - 10),
      floatDuration: 5 + Math.random() * 2,
    };
    setClouds((prev) => [newCloud, ...prev]);
    setCustomStressInput('');
  };

  const resetClouds = () => {
    ambientAudio.playChime();
    setClouds(INITIAL_CLOUDS);
    setPoppedCount(0);
  };

  // Hug click handler
  const triggerHug = () => {
    ambientAudio.playHeartbeat();
    setHeartBurst(true);
    setHugGiven(true);
    setTimeout(() => {
      setHeartBurst(false);
    }, 1200);
  };

  return (
    <section id="relax" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-rose-300/80 mb-3">
          <span>Peaceful Moments</span>
          <span aria-hidden="true">·</span>
          <span>Designed For Sneha</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-cormorant font-semibold text-rose-50 tracking-tight">
          Your Little Relaxation Corner ☁️
        </h2>
        <p className="mt-3 text-sm sm:text-base text-rose-200/75 font-sans-body">
          Take a deep breath, release whatever feels heavy, and let me wrap you in love.
        </p>
      </div>

      {/* Tabs / Switcher */}
      <div className="flex items-center justify-center gap-2 p-1.5 max-w-md mx-auto mb-10 rounded-2xl bg-rose-950/40 border border-rose-400/20 backdrop-blur-md">
        <button
          type="button"
          onClick={() => {
            ambientAudio.playSoftPop();
            setActiveTab('breathing');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeTab === 'breathing'
              ? 'bg-rose-300 text-rose-950 shadow-md font-semibold'
              : 'text-rose-200/70 hover:text-rose-100 hover:bg-rose-500/10'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>60s Breathing</span>
        </button>

        <button
          type="button"
          onClick={() => {
            ambientAudio.playSoftPop();
            setActiveTab('clouds');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeTab === 'clouds'
              ? 'bg-rose-300 text-rose-950 shadow-md font-semibold'
              : 'text-rose-200/70 hover:text-rose-100 hover:bg-rose-500/10'
          }`}
        >
          <CloudRain className="w-4 h-4" />
          <span>Send Stress Away</span>
        </button>

        <button
          type="button"
          onClick={() => {
            ambientAudio.playSoftPop();
            setActiveTab('hug');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeTab === 'hug'
              ? 'bg-rose-300 text-rose-950 shadow-md font-semibold'
              : 'text-rose-200/70 hover:text-rose-100 hover:bg-rose-500/10'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>A Warm Hug</span>
        </button>
      </div>

      {/* Main Interactive Card */}
      <div className="relative rounded-3xl p-6 sm:p-10 glass-card border border-rose-300/20 shadow-2xl overflow-hidden min-h-[440px] flex items-center justify-center">
        
        {/* OPTION A: 60-Second Breathing Break */}
        {activeTab === 'breathing' && (
          <div className="text-center w-full max-w-md mx-auto py-4 animate-in fade-in zoom-in-95 duration-300">
            <p className="text-xs uppercase tracking-widest text-rose-300/80 mb-6 font-medium">
              Option A: 60-Second Calming Rhythm
            </p>

            {/* Breathing Visual Circle */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto flex items-center justify-center mb-8">
              {/* Outer Radiance */}
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/20 via-pink-400/20 to-purple-500/30 blur-2xl transition-all duration-1000 ${
                  breathPhase === 'in' || breathPhase === 'hold' ? 'scale-125 opacity-80' : 'scale-90 opacity-40'
                }`}
              />

              {/* Expanding / Contracting Breathing Ring */}
              <div
                className={`relative w-44 h-44 sm:w-48 sm:h-48 rounded-full border-2 border-rose-300/40 bg-gradient-to-b from-[#2d1838]/80 to-[#190c24]/90 flex flex-col items-center justify-center shadow-inner transition-transform ${
                  isBreathingActive
                    ? breathPhase === 'in'
                      ? 'scale-115 duration-[4000ms] ease-out'
                      : breathPhase === 'hold'
                      ? 'scale-115 duration-500'
                      : breathPhase === 'out'
                      ? 'scale-85 duration-[4000ms] ease-in-out'
                      : 'scale-95 duration-[2500ms]'
                    : 'scale-100'
                }`}
              >
                <Wind className="w-6 h-6 text-rose-300/80 mb-1" />
                <span className="font-serif-cormorant text-2xl sm:text-3xl text-rose-100 font-semibold italic text-center px-4 leading-tight">
                  {breathInstruction}
                </span>
                {isBreathingActive && (
                  <span className="text-xs text-rose-300/70 mt-2 font-mono tabular-nums">
                    {breathingSecondsLeft}s remaining
                  </span>
                )}
              </div>
            </div>

            {/* Instruction Bullet Points */}
            <div className="grid grid-cols-2 gap-2 text-xs text-rose-200/80 max-w-xs mx-auto mb-8 font-light">
              <span className="bg-rose-500/10 py-1 px-2 rounded-lg">· Breathe in</span>
              <span className="bg-rose-500/10 py-1 px-2 rounded-lg">· Breathe out slowly</span>
              <span className="bg-rose-500/10 py-1 px-2 rounded-lg">· Relax your shoulders</span>
              <span className="bg-rose-500/10 py-1 px-2 rounded-lg">· Let thoughts settle</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={toggleBreathing}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-rose-950 bg-rose-200 hover:bg-white shadow-md transition-all duration-200 cursor-pointer"
              >
                {isBreathingActive ? (
                  <>
                    <Pause className="w-4 h-4 fill-rose-950" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-rose-950" />
                    <span>{breathingSecondsLeft === 60 ? 'Start Breathing Break' : 'Resume'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetBreathing}
                className="p-2.5 rounded-full text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 border border-rose-400/20 transition-colors"
                title="Reset timer"
                aria-label="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* OPTION B: Send Your Stress Away 🎈 */}
        {activeTab === 'clouds' && (
          <div className="w-full text-center py-4 animate-in fade-in zoom-in-95 duration-300">
            <p className="text-xs uppercase tracking-widest text-rose-300/80 mb-2 font-medium">
              Option B: Send Your Stress Away 🎈
            </p>
            <p className="text-sm text-rose-200/80 max-w-md mx-auto mb-6">
              Click any stress cloud to watch it drift away into stardust. You don&apos;t have to carry it alone.
            </p>

            {/* Floating Clouds Playground */}
            <div className="relative min-h-[220px] max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 rounded-2xl bg-purple-950/20 border border-rose-400/10 mb-6">
              {clouds.length === 0 ? (
                <div className="py-8 text-center animate-in fade-in duration-300">
                  <Sparkles className="w-8 h-8 text-rose-300 mx-auto mb-2 animate-pulse" />
                  <p className="font-serif-cormorant text-2xl text-rose-100 italic">
                    The sky is clear now, Sneha ji.
                  </p>
                  <p className="text-xs text-rose-300/70 mt-1">
                    You have released {poppedCount} heavy thoughts tonight.
                  </p>
                  <button
                    type="button"
                    onClick={resetClouds}
                    className="mt-4 px-4 py-1.5 rounded-full text-xs font-medium text-rose-200 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 transition-colors"
                  >
                    Release more thoughts
                  </button>
                </div>
              ) : (
                clouds.map((cloud) => {
                  const isLeaving = disappearingClouds[cloud.id];
                  return (
                    <button
                      key={cloud.id}
                      type="button"
                      onClick={() => popCloud(cloud.id)}
                      style={{
                        animation: `floatGentle ${cloud.floatDuration}s ease-in-out infinite`,
                      }}
                      className={`group relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-rose-100 bg-gradient-to-r ${cloud.color} border border-rose-300/30 hover:border-rose-300/70 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md backdrop-blur-sm cursor-pointer ${
                        isLeaving ? 'scale-0 -translate-y-16 opacity-0 rotate-12 duration-500 ease-in' : ''
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="opacity-70 group-hover:opacity-100">☁️</span>
                        <span>{cloud.text}</span>
                        <span className="text-[10px] text-rose-300/50 group-hover:text-rose-200 ml-1">✕</span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Custom Stress Input Box */}
            <form onSubmit={handleAddCustomStress} className="max-w-md mx-auto flex gap-2">
              <input
                type="text"
                value={customStressInput}
                onChange={(e) => setCustomStressInput(e.target.value)}
                placeholder="Type another worry to send away..."
                className="flex-1 px-4 py-2 rounded-xl text-xs sm:text-sm bg-rose-950/40 border border-rose-400/30 text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-400/70"
                maxLength={40}
              />
              <button
                type="submit"
                disabled={!customStressInput.trim()}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-rose-300 text-rose-950 hover:bg-white disabled:opacity-40 transition-colors cursor-pointer"
              >
                Release
              </button>
            </form>
          </div>
        )}

        {/* OPTION C: A Hug From Me 🫂 */}
        {activeTab === 'hug' && (
          <div className="w-full text-center py-4 animate-in fade-in zoom-in-95 duration-300 max-w-lg mx-auto">
            <p className="text-xs uppercase tracking-widest text-rose-300/80 mb-2 font-medium">
              Option C: A Hug From Me 🫂
            </p>

            {/* Teddy / Embrace Illustration */}
            <div className="relative my-6 flex justify-center">
              <div className="relative group">
                {/* Gentle Pulsing Glow */}
                <div className="absolute -inset-4 bg-rose-500/20 rounded-full blur-xl group-hover:bg-rose-500/35 transition-all duration-700" />
                
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-[#341b3f] to-[#1c0e24] border-2 border-rose-300/40 flex flex-col items-center justify-center shadow-xl">
                  {/* Cute SVG Teddy Bear with Arms Open */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-20 h-20 text-rose-300 fill-current transition-transform duration-500 group-hover:scale-105"
                    aria-hidden="true"
                  >
                    {/* Ears */}
                    <circle cx="28" cy="28" r="14" fill="#c084fc" opacity="0.8" />
                    <circle cx="28" cy="28" r="8" fill="#f472b6" opacity="0.6" />
                    <circle cx="72" cy="28" r="14" fill="#c084fc" opacity="0.8" />
                    <circle cx="72" cy="28" r="8" fill="#f472b6" opacity="0.6" />
                    
                    {/* Head */}
                    <circle cx="50" cy="46" r="28" fill="#e879f9" opacity="0.9" />
                    {/* Eyes */}
                    <circle cx="41" cy="42" r="3.2" fill="#2e1065" />
                    <circle cx="59" cy="42" r="3.2" fill="#2e1065" />
                    {/* Blushing Cheeks */}
                    <ellipse cx="36" cy="48" rx="4" ry="2.5" fill="#f43f5e" opacity="0.5" />
                    <ellipse cx="64" cy="48" rx="4" ry="2.5" fill="#f43f5e" opacity="0.5" />
                    {/* Snout */}
                    <ellipse cx="50" cy="51" rx="8" ry="6" fill="#fdf4ff" opacity="0.9" />
                    <ellipse cx="50" cy="49" rx="3.5" ry="2.5" fill="#4a044e" />
                    <path d="M50 51.5 L50 54 M47 54 Q50 56 53 54" stroke="#4a044e" strokeWidth="1.2" fill="none" />

                    {/* Open Arms */}
                    <path
                      d="M26 62 Q12 55 16 46 Q22 42 30 54 Z"
                      fill="#d946ef"
                      opacity="0.9"
                      className="animate-pulse"
                    />
                    <path
                      d="M74 62 Q88 55 84 46 Q78 42 70 54 Z"
                      fill="#d946ef"
                      opacity="0.9"
                      className="animate-pulse"
                    />
                  </svg>

                  <span className="text-[10px] text-rose-200/90 font-medium tracking-wider mt-1">
                    Waiting for you
                  </span>
                </div>

                {/* Heart Burst Animation */}
                {heartBurst && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in-50 fade-out-0 duration-700">
                    <Heart className="w-24 h-24 text-rose-400 fill-rose-400 opacity-80" />
                  </div>
                )}
              </div>
            </div>

            {/* Hug Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={triggerHug}
                className="group inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-base font-semibold text-rose-950 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-300 hover:from-white hover:to-rose-200 shadow-xl shadow-rose-950/40 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Heart className="w-5 h-5 text-rose-600 fill-rose-500 animate-bounce" />
                <span>I Need My Hug</span>
              </button>
            </div>

            {/* Hug Reveal Message */}
            {hugGiven ? (
              <div className="p-6 rounded-2xl bg-rose-500/15 border border-rose-400/30 animate-in fade-in slide-in-from-bottom-2 duration-300 text-left sm:text-center">
                <p className="font-serif-cormorant text-xl sm:text-2xl text-rose-100 font-medium leading-relaxed italic">
                  &ldquo;Imagine me wrapping my arms around you, pulling you close, kissing your forehead, and whispering, &apos;You&apos;ve done enough for today, my love. Come rest with me.&apos; 🧸❤️&rdquo;
                </p>
                <p className="text-xs text-rose-300/70 mt-3 font-light text-center">
                  Arms wrapped around you · Safe in my embrace
                </p>
              </div>
            ) : (
              <p className="text-xs text-rose-300/60 font-light italic">
                Tap the button whenever your heart feels tired.
              </p>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
