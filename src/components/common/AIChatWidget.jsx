import { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, X, Send, Trash2, Loader2, MessageSquare } from 'lucide-react';
import { useAI } from '../../context/AIContext';
import { chatStream } from '../../services/aiService';

const AIChatWidget = () => {
  const { chatHistory, historyRef, isChatOpen, addMessage, clearChat, toggleChat, closeChat } = useAI();
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, streamingText]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isChatOpen]);

  // Close on click outside
  useEffect(() => {
    if (!isChatOpen) return;

    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        closeChat();
      }
    };

    // Small delay so the toggle click doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen, closeChat]);

  // Close on Escape
  useEffect(() => {
    if (!isChatOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeChat();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isChatOpen, closeChat]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    setInput('');
    addMessage('user', text);
    setIsStreaming(true);
    setStreamingText('');

    try {
      // Use historyRef to get the latest history including the message we just added
      const currentHistory = historyRef.current;
      let full = '';
      for await (const chunk of chatStream(currentHistory, text)) {
        full += chunk;
        setStreamingText(full);
      }
      addMessage('model', full);
    } catch (err) {
      console.error('AI chat error:', err);
      const errorMsg = err?.message?.includes('API key')
        ? 'API key is missing or invalid. Please check your configuration.'
        : 'Sorry, something went wrong. Please try again.';
      addMessage('model', errorMsg);
    } finally {
      setIsStreaming(false);
      setStreamingText('');
    }
  }, [input, isStreaming, addMessage, historyRef]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Floating button (collapsed)
  if (!isChatOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 bg-[var(--primary-400)] dark:bg-[var(--primary)]"
        style={{ color: 'white' }}
        aria-label="Open AI study assistant"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    );
  }

  return (
    <>
      {/* Backdrop on mobile */}
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] sm:hidden" onClick={closeChat} />

      {/* Chat Panel */}
      <div
        ref={panelRef}
        className="fixed z-50 flex flex-col rounded-2xl shadow-2xl border overflow-hidden
          bottom-0 right-0 w-full h-[85vh] sm:bottom-6 sm:right-6 sm:w-[380px] sm:h-[520px]
          sm:rounded-2xl rounded-t-2xl rounded-b-none
          animate-in slide-in-from-bottom duration-200"
        style={{
          backgroundColor: 'var(--card-background, #ffffff)',
          borderColor: 'var(--border-color, #e5e7eb)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 bg-[var(--primary-400)] dark:bg-[var(--primary)]">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-sm block leading-tight">Storra AI</span>
              <span className="text-[10px] opacity-80 leading-tight">Study Assistant</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors text-white"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeChat}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors text-white"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
          {chatHistory.length === 0 && !isStreaming && (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[var(--primary-50)] dark:bg-[var(--primary-800)]/30">
                <MessageSquare className="w-8 h-8 text-[var(--primary-400)] dark:text-[var(--primary)]" />
              </div>
              <p className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] mb-1">
                Hi! I'm Storra AI
              </p>
              <p className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)] mb-4">
                Your personal study assistant. Ask me anything about your courses, lessons, or homework!
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Explain a topic', 'Help me study', 'Quiz me'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInput(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                      border-[var(--secondary-200)] dark:border-[var(--border-color)]
                      text-[var(--secondary-600)] dark:text-[var(--text-muted)]
                      hover:bg-[var(--primary-50)] dark:hover:bg-[var(--primary-800)]/20
                      hover:text-[var(--primary-500)] dark:hover:text-[var(--primary)]
                      hover:border-[var(--primary-200)] dark:hover:border-[var(--primary)]/30"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'rounded-2xl rounded-br-md bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white'
                    : 'rounded-2xl rounded-bl-md bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-800)] dark:text-[var(--text)]'
                }`}
              >
                {msg.parts[0].text}
              </div>
            </div>
          ))}

          {/* Streaming response */}
          {isStreaming && streamingText && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-bl-md text-sm leading-relaxed whitespace-pre-wrap bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-800)] dark:text-[var(--text)]">
                {streamingText}
                <span className="inline-block w-1.5 h-4 ml-0.5 bg-[var(--primary-400)] dark:bg-[var(--primary)] animate-pulse rounded-sm" />
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {isStreaming && !streamingText && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)]">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--secondary-400)] dark:bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[var(--secondary-400)] dark:bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[var(--secondary-400)] dark:bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div
          className="flex items-center gap-2 px-3 py-3 border-t flex-shrink-0"
          style={{ borderColor: 'var(--border-color, #e5e7eb)' }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            disabled={isStreaming}
            className="flex-1 px-3 py-2.5 rounded-xl text-sm border outline-none transition-all
              focus:ring-2 focus:ring-[var(--primary-400)] dark:focus:ring-[var(--primary)]
              bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)]
              border-[var(--secondary-200)] dark:border-[var(--border-color)]
              text-[var(--secondary-800)] dark:text-[var(--text)]
              placeholder:text-[var(--secondary-400)] dark:placeholder:text-[var(--text-muted)]
              disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="p-2.5 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed
              bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white
              hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)]
              active:scale-95"
          >
            {isStreaming ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AIChatWidget;
