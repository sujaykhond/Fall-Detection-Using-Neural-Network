
import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatbotButtonProps {
  isOpen: boolean;
  onClick: () => void;
  onSettingsClick?: () => void;
}

const ChatbotButton = ({ isOpen, onClick, onSettingsClick }: ChatbotButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg bg-detector-blue hover:bg-blue-600 transition-all z-50"
      aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <MessageCircle className="h-6 w-6" />
      )}
    </Button>
  );
};

export default ChatbotButton;
