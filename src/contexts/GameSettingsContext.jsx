import { createContext, useContext, useState, useEffect } from 'react';
import { soundManager } from '../utils/sounds';

const GameSettingsContext = createContext();

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  if (!context) {
    throw new Error('useGameSettings must be used within a GameSettingsProvider');
  }
  return context;
};

export const GameSettingsProvider = ({ children }) => {
  // Load settings from localStorage
  const loadSetting = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(`gameSettings_${key}`);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [soundEnabled, setSoundEnabled] = useState(() => loadSetting('soundEnabled', true));
  const [musicEnabled, setMusicEnabled] = useState(() => loadSetting('musicEnabled', false));
  const [volume, setVolume] = useState(() => loadSetting('volume', 0.5));
  const [speechRate, setSpeechRate] = useState(() => loadSetting('speechRate', 1));
  const [autoSpeak, setAutoSpeak] = useState(() => loadSetting('autoSpeak', true));
  const [fontSize, setFontSize] = useState(() => loadSetting('fontSize', 'medium')); // small, medium, large
  const [highContrast, setHighContrast] = useState(() => loadSetting('highContrast', false));
  const [reduceMotion, setReduceMotion] = useState(() => loadSetting('reduceMotion', false));
  const [showStreaks, setShowStreaks] = useState(() => loadSetting('showStreaks', true));
  const [showTimer, setShowTimer] = useState(() => loadSetting('showTimer', true));
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(() => loadSetting('keyboardShortcuts', true));

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem('gameSettings_soundEnabled', JSON.stringify(soundEnabled));
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('gameSettings_musicEnabled', JSON.stringify(musicEnabled));
  }, [musicEnabled]);

  useEffect(() => {
    localStorage.setItem('gameSettings_volume', JSON.stringify(volume));
    soundManager.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('gameSettings_speechRate', JSON.stringify(speechRate));
  }, [speechRate]);

  useEffect(() => {
    localStorage.setItem('gameSettings_autoSpeak', JSON.stringify(autoSpeak));
  }, [autoSpeak]);

  useEffect(() => {
    localStorage.setItem('gameSettings_fontSize', JSON.stringify(fontSize));
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('gameSettings_highContrast', JSON.stringify(highContrast));
    document.documentElement.setAttribute('data-high-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('gameSettings_reduceMotion', JSON.stringify(reduceMotion));
    document.documentElement.setAttribute('data-reduce-motion', reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    localStorage.setItem('gameSettings_showStreaks', JSON.stringify(showStreaks));
  }, [showStreaks]);

  useEffect(() => {
    localStorage.setItem('gameSettings_showTimer', JSON.stringify(showTimer));
  }, [showTimer]);

  useEffect(() => {
    localStorage.setItem('gameSettings_keyboardShortcuts', JSON.stringify(keyboardShortcuts));
  }, [keyboardShortcuts]);

  const value = {
    // Sound
    soundEnabled,
    setSoundEnabled,
    musicEnabled,
    setMusicEnabled,
    volume,
    setVolume,

    // Speech
    speechRate,
    setSpeechRate,
    autoSpeak,
    setAutoSpeak,

    // Accessibility
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,

    // Game features
    showStreaks,
    setShowStreaks,
    showTimer,
    setShowTimer,
    keyboardShortcuts,
    setKeyboardShortcuts,

    // Reset all settings
    resetSettings: () => {
      setSoundEnabled(true);
      setMusicEnabled(false);
      setVolume(0.5);
      setSpeechRate(1);
      setAutoSpeak(true);
      setFontSize('medium');
      setHighContrast(false);
      setReduceMotion(false);
      setShowStreaks(true);
      setShowTimer(true);
      setKeyboardShortcuts(true);
    },
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};

export default GameSettingsContext;
