"use client";

import { createContext, useContext, useMemo, useState } from "react";

const ChatbotContext = createContext(null);

export function ChatbotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages] = useState([]);

  const value = useMemo(
    () => ({
      isOpen,
      messages,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
    }),
    [isOpen, messages],
  );

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const ctx = useContext(ChatbotContext);
  if (!ctx) {
    throw new Error("useChatbot must be used within ChatbotProvider");
  }
  return ctx;
}
