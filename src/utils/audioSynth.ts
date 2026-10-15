/**
 * Web Audio Ambient Synthesizer
 * Pure client-side generative ambient sound generator.
 * Zero external audio files or network requests required.
 * Complies with strict no-autoplay rules (starts only when user clicks).
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private volume = 0.35;
  private currentMode: 'lullaby' | 'starlight' | 'rain' = 'lullaby';

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume() {
    return this.volume;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getMode() {
    return this.currentMode;
  }

  public setMode(mode: 'lullaby' | 'starlight' | 'rain') {
    this.currentMode = mode;
    if (this.isPlaying) {
      this.stop();
      this.play(mode);
    }
  }

  public play(mode?: 'lullaby' | 'starlight' | 'rain') {
    if (mode) this.currentMode = mode;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.scheduleNotes();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(mode?: 'lullaby' | 'starlight' | 'rain') {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play(mode);
      return true;
    }
  }

  // Play a soft peaceful chord or sequence
  private scheduleNotes() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    if (this.currentMode === 'lullaby') {
      // Warm pentatonic / maj7 lullaby notes (F3, A3, C4, E4, G4, A4, C5)
      const chordGroups = [
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [130.81, 196.0, 246.94, 329.63], // Cmaj7
        [146.83, 220.0, 261.63, 349.23], // Dm7
        [110.0, 164.81, 220.0, 261.63, 329.63], // Am9
      ];
      const chord = chordGroups[Math.floor(Math.random() * chordGroups.length)];
      chord.forEach((freq, idx) => {
        const delay = idx * 0.12 + Math.random() * 0.08;
        this.playSoftTone(freq, 3.8 + Math.random() * 1.5, delay);
      });

      this.timerId = window.setTimeout(() => {
        this.scheduleNotes();
      }, 3500 + Math.random() * 1000);
    } else if (this.currentMode === 'starlight') {
      // Celestial celesta chime notes (C5, D5, E5, G5, A5, C6)
      const starScale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
      const count = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const freq = starScale[Math.floor(Math.random() * starScale.length)];
        this.playBellTone(freq, 2.8, i * 0.35);
      }

      this.timerId = window.setTimeout(() => {
        this.scheduleNotes();
      }, 2400 + Math.random() * 1200);
    } else {
      // Rain / gentle whisper breeze
      this.playPinkNoisePuff();
      this.timerId = window.setTimeout(() => {
        this.scheduleNotes();
      }, 1800);
    }
  }

  private playSoftTone(freq: number, duration: number, startDelay = 0) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + startDelay;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm low-pass
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + duration);

    // Envelope: slow smooth attack, warm long release
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  private playBellTone(freq: number, duration: number, startDelay = 0) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + startDelay;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Light shimmering overtone
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.005, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq, now);
    filter.Q.value = 3.5;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.04, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  private playPinkNoisePuff() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 0.8);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 2.0);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
  }

  // Interactive UI sound effects
  public playChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.25);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.65);
  }

  public playSoftPop() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.15);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  public playHeartbeat() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    [0, 0.22].forEach((offset) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(75, now + offset);
      osc.frequency.exponentialRampToValueAtTime(45, now + offset + 0.14);

      gain.gain.setValueAtTime(0.09, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.16);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + offset);
      osc.stop(now + offset + 0.18);
    });
  }
}

export const ambientAudio = new AmbientAudioEngine();
