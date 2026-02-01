// Sound utility using Web Audio API for game-like sounds

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
    this.volume = 0.5;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioContext;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  // Play a tone with specific frequency and duration
  playTone(frequency, duration, type = 'sine', volumeMultiplier = 1) {
    if (!this.enabled) return;

    try {
      const ctx = this.init();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      const now = ctx.currentTime;
      gainNode.gain.setValueAtTime(this.volume * volumeMultiplier, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch (e) {
      console.warn('Sound playback failed:', e);
    }
  }

  // Correct answer sound - happy ascending tones
  correct() {
    this.playTone(523.25, 0.1, 'sine'); // C5
    setTimeout(() => this.playTone(659.25, 0.1, 'sine'), 100); // E5
    setTimeout(() => this.playTone(783.99, 0.15, 'sine'), 200); // G5
  }

  // Wrong answer sound - descending buzzer
  wrong() {
    this.playTone(311.13, 0.15, 'square', 0.3); // Eb4
    setTimeout(() => this.playTone(277.18, 0.2, 'square', 0.3), 150); // Db4
  }

  // Click/select sound
  click() {
    this.playTone(800, 0.05, 'sine', 0.3);
  }

  // Success fanfare for completing quiz
  success() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.2, 'sine'), i * 150);
    });
  }

  // Failure sound
  failure() {
    this.playTone(200, 0.3, 'sawtooth', 0.2);
    setTimeout(() => this.playTone(180, 0.4, 'sawtooth', 0.2), 300);
  }

  // Timer warning beep
  timerWarning() {
    this.playTone(880, 0.1, 'square', 0.4);
  }

  // Timer critical beep (last 10 seconds)
  timerCritical() {
    this.playTone(1000, 0.08, 'square', 0.5);
    setTimeout(() => this.playTone(1000, 0.08, 'square', 0.5), 150);
  }

  // Level up sound
  levelUp() {
    const notes = [392, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.15, 'sine'), i * 100);
    });
  }

  // Streak sound - gets higher with streak
  streak(count) {
    const baseFreq = 400 + (count * 50);
    this.playTone(baseFreq, 0.1, 'sine');
    setTimeout(() => this.playTone(baseFreq * 1.25, 0.1, 'sine'), 80);
  }

  // Combo break sound
  comboBreak() {
    this.playTone(200, 0.2, 'triangle', 0.3);
  }

  // Achievement unlock
  achievement() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.2, 'sine', 0.6), i * 120);
    });
  }

  // Coin/point earned
  coin() {
    this.playTone(1200, 0.05, 'sine', 0.4);
    setTimeout(() => this.playTone(1600, 0.08, 'sine', 0.4), 50);
  }

  // Hint used
  hint() {
    this.playTone(600, 0.1, 'triangle', 0.3);
    setTimeout(() => this.playTone(800, 0.1, 'triangle', 0.3), 100);
  }

  // Navigation sound
  navigate() {
    this.playTone(600, 0.03, 'sine', 0.2);
  }

  // Start quiz sound
  start() {
    this.playTone(440, 0.1, 'sine');
    setTimeout(() => this.playTone(554.37, 0.1, 'sine'), 100);
    setTimeout(() => this.playTone(659.25, 0.15, 'sine'), 200);
  }
}

export const soundManager = new SoundManager();
export default soundManager;
