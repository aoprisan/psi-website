/**
 * Non-visual cues for the breathing pacer: a soft generated tone and a
 * haptic tick. Both are optional, both fail silently, and both matter more
 * than they look — the point of the pacer is to let someone close their
 * eyes, and neither an audio file nor a native plugin is needed for that.
 */

type ToneShape = { frequency: number; durationMs: number; gain: number };

/** One warm, low tone per phase kind. Deliberately not "notification"-like. */
const TONES: Record<string, ToneShape> = {
  inhale: { frequency: 392, durationMs: 420, gain: 0.09 },
  hold: { frequency: 294, durationMs: 260, gain: 0.05 },
  exhale: { frequency: 262, durationMs: 620, gain: 0.09 },
  rest: { frequency: 220, durationMs: 240, gain: 0.04 },
  done: { frequency: 330, durationMs: 900, gain: 0.1 },
};

const VIBRATION: Record<string, number | number[]> = {
  inhale: 40,
  hold: 15,
  exhale: [30, 40, 30],
  rest: 15,
  done: [60, 80, 60],
};

export class CueEngine {
  #context: AudioContext | null = null;
  #master: GainNode | null = null;
  sound: boolean;
  haptics: boolean;

  constructor(sound: boolean, haptics: boolean) {
    this.sound = sound;
    this.haptics = haptics;
  }

  /**
   * Must be called from a user gesture — browsers refuse to start an
   * AudioContext otherwise, and a pacer that is silent for the first breath
   * is worse than one that is silent throughout.
   */
  async prime(): Promise<void> {
    if (!this.sound) return;
    try {
      if (!this.#context) {
        const Ctor: typeof AudioContext | undefined =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        this.#context = new Ctor();
        this.#master = this.#context.createGain();
        this.#master.gain.value = 1;
        this.#master.connect(this.#context.destination);
      }
      if (this.#context.state === "suspended") await this.#context.resume();
    } catch {
      this.#context = null;
    }
  }

  play(kind: string): void {
    if (this.haptics && typeof navigator.vibrate === "function") {
      try {
        navigator.vibrate(VIBRATION[kind] ?? 20);
      } catch {
        /* Vibration is a nicety; a refusal must never break the timer. */
      }
    }
    if (!this.sound || !this.#context || !this.#master) return;
    const tone = TONES[kind];
    if (!tone) return;
    try {
      const ctx = this.#context;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = tone.frequency;
      // Slow attack and exponential release — a bell, not a beep.
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(tone.gain, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.durationMs / 1000);
      osc.connect(gain);
      gain.connect(this.#master);
      osc.start(now);
      osc.stop(now + tone.durationMs / 1000 + 0.05);
    } catch {
      /* Ignore — audio is an enhancement. */
    }
  }

  dispose(): void {
    try {
      void this.#context?.close();
    } catch {
      /* Already closed. */
    }
    this.#context = null;
    this.#master = null;
  }
}

/** Keeps the screen awake during a practice. Returns a release function. */
export async function requestWakeLock(): Promise<() => void> {
  type WakeLockSentinel = { release: () => Promise<void> };
  const nav = navigator as Navigator & {
    wakeLock?: { request: (type: "screen") => Promise<WakeLockSentinel> };
  };
  if (!nav.wakeLock) return () => {};
  try {
    const sentinel = await nav.wakeLock.request("screen");
    return () => {
      void sentinel.release().catch(() => {});
    };
  } catch {
    return () => {};
  }
}
