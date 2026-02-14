import React, { createContext, useCallback, useRef, useState } from 'react';

const AIContext = createContext(null);

export const AIProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  // Keep a ref in sync so consumers can read the latest history without stale closures
  const historyRef = useRef(chatHistory);

  const addMessage = useCallback((role, text) => {
    const msg = { role, parts: [{ text }] };
    setChatHistory((prev) => {
      const next = [...prev, msg];
      historyRef.current = next;
      return next;
    });
  }, []);

  const clearChat = useCallback(() => {
    setChatHistory([]);
    historyRef.current = [];
  }, []);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  const value = {
    chatHistory,
    historyRef,
    isChatOpen,
    addMessage,
    clearChat,
    toggleChat,
    closeChat,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

export const useAI = () => {
  const context = React.useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within AIProvider');
  }
  return context;
};

export default AIContext;
