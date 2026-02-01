import { useState } from 'react';
import {
  Settings,
  Volume2,
  VolumeX,
  Music,
  Type,
  Eye,
  Zap,
  Keyboard,
  RotateCcw,
  X,
  Gauge,
  Trophy,
  Clock,
} from 'lucide-react';
import { useGameSettings } from '../../contexts/GameSettingsContext';

const GameSettings = ({ isOpen, onClose }) => {
  const {
    soundEnabled,
    setSoundEnabled,
    musicEnabled,
    setMusicEnabled,
    volume,
    setVolume,
    speechRate,
    setSpeechRate,
    autoSpeak,
    setAutoSpeak,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,
    showStreaks,
    setShowStreaks,
    showTimer,
    setShowTimer,
    keyboardShortcuts,
    setKeyboardShortcuts,
    resetSettings,
  } = useGameSettings();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Settings Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-[var(--card-background)] z-50 overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[var(--card-background)] border-b border-[var(--secondary-100)] dark:border-[var(--border-color)] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-[var(--primary-400)] dark:text-[var(--primary)]" />
            <h2 className="text-xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)]">
              Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--secondary-100)] dark:hover:bg-[var(--secondary-800)] transition-colors"
          >
            <X className="w-5 h-5 text-[var(--secondary-600)] dark:text-[var(--text-muted)]" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Sound Settings */}
          <section>
            <h3 className="text-sm font-semibold text-[var(--secondary-500)] dark:text-[var(--text-muted)] uppercase tracking-wide mb-3">
              Sound & Audio
            </h3>
            <div className="space-y-3">
              {/* Sound Effects Toggle */}
              <div className="flex items-center justify-between p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl">
                <div className="flex items-center gap-3">
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-[var(--secondary-400)]" />
                  )}
                  <span className="text-[var(--secondary-700)] dark:text-[var(--text)]">Sound Effects</span>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    soundEnabled
                      ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)]'
                      : 'bg-[var(--secondary-300)] dark:bg-[var(--secondary-600)]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[var(--secondary-700)] dark:text-[var(--text)]">Volume</span>
                  <span className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[var(--secondary-200)] dark:bg-[var(--secondary-700)] rounded-lg appearance-none cursor-pointer accent-[var(--primary-400)]"
                />
              </div>

              {/* Background Music Toggle */}
              <div className="flex items-center justify-between p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl">
                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" />
                  <span className="text-[var(--secondary-700)] dark:text-[var(--text)]">Background Music</span>
                </div>
                <button
                  onClick={() => setMusicEnabled(!musicEnabled)}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    musicEnabled
                      ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)]'
                      : 'bg-[var(--secondary-300)] dark:bg-[var(--secondary-600)]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      musicEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Speech Settings */}
          <section>
            <h3 className="text-sm font-semibold text-[var(--secondary-500)] dark:text-[var(--text-muted)] uppercase tracking-wide mb-3">
              Text-to-Speech
            </h3>
            <div className="space-y-3">
              {/* Auto-speak Toggle */}
              <div className="flex items-center justify-between p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" />
                  <span className="text-[var(--secondary-700)] dark:text-[var(--text)]">Auto-read Questions</span>
                </div>
                <button
                  onClick={() => setAutoSpeak(!autoSpeak)}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    autoSpeak
                      ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)]'
                      : 'bg-[var(--secondary-300)] dark:bg-[var(--secondary-600)]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      autoSpeak ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Speech Rate */}
              <div className="p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Gauge className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" />
                    <span className="text-[var(--secondary-700)] dark:text-[var(--text)]">Speech Speed</span>
                  </div>
                  <span className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                    {speechRate}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.25"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[var(--secondary-200)] dark:bg-[var(--secondary-700)] rounded-lg appearance-none cursor-pointer accent-[var(--primary-400)]"
                />
                <div className="flex justify-between text-xs text-[var(--secondary-400)] mt-1">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section>
            <h3 className="text-sm font-semibold text-[var(--secondary-500)] dark:text-[var(--text-muted)] uppercase tracking-wide mb-3">
              Accessibility
            </h3>
            <div className="space-y-3">
              {/* Font Size */}
              <div className="p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Type className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" />
                  <span className="text-[var(--secondary-700)] dark:text-[var(--text)]">Font Size</span>
                </div>
                <div className="flex gap-2">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium capitalize transition-colors ${
                        fontSize === size
                          ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white'
                          : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] text-[var(--secondary-600)] dark:text-[var(--text-muted)]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" />
                  <span className="text-[var(--secondary-700)] dark:text-[var(--text)]">High Contrast</span>
                </div>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    highContrast
                      ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)]'
                      : 'bg-[var(--secondary-300)] dark:bg-[var(--secondary-600)]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Reduce Motion */}
              <div className="flex items-center justify-between p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" />
                  <span className="text-[var(--secondary-700)] dark:text-[var(--text)]">Reduce Motion</span>
                </div>
                <button
                  onClick={() => setReduceMotion(!reduceMotion)}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    reduceMotion
                      ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)]'
                      : 'bg-[var(--secondary-300)] dark:bg-[var(--secondary-600)]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      reduceMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Game Features */}
          <section>
            <h3 className="text-sm font-semibold text-[var(--secondary-500)] dark:text-[var(--text-muted)] uppercase tracking-wide mb-3">
              Game Features
            </h3>
            <div className="space-y-3">
              {/* Show Streaks */}
              <div className="flex items-center justify-between p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-[var(--attention-200)] dark:text-[var(--attention-color)]" />
                  <span className="text-[var(--secondary-700)] dark:text-[var(--text)]">Show Streaks</span>
                </div>
                <button
                  onClick={() => setShowStreaks(!showStreaks)}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    showStreaks
                      ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)]'
                      : 'bg-[var(--secondary-300)] dark:bg-[var(--secondary-600)]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      showStreaks ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Show Timer */}
              <div className="flex items-center justify-between p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" />
                  <span className="text-[var(--secondary-700)] dark:text-[var(--text)]">Show Timer</span>
                </div>
                <button
                  onClick={() => setShowTimer(!showTimer)}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    showTimer
                      ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)]'
                      : 'bg-[var(--secondary-300)] dark:bg-[var(--secondary-600)]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      showTimer ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="flex items-center justify-between p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl">
                <div className="flex items-center gap-3">
                  <Keyboard className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" />
                  <div>
                    <span className="text-[var(--secondary-700)] dark:text-[var(--text)]">Keyboard Shortcuts</span>
                    <p className="text-xs text-[var(--secondary-400)] dark:text-[var(--text-muted)]">
                      A/B/C/D to answer, arrows to navigate
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setKeyboardShortcuts(!keyboardShortcuts)}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    keyboardShortcuts
                      ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)]'
                      : 'bg-[var(--secondary-300)] dark:bg-[var(--secondary-600)]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      keyboardShortcuts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Reset Button */}
          <button
            onClick={resetSettings}
            className="w-full py-3 flex items-center justify-center gap-2 bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-600)] dark:text-[var(--text-muted)] rounded-xl font-medium hover:bg-[var(--secondary-200)] dark:hover:bg-[var(--secondary-700)] transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset to Defaults
          </button>
        </div>
      </div>
    </>
  );
};

export default GameSettings;
