
import React from 'react';
import { User, Bot } from 'lucide-react';

export type MessageType = 'user' | 'bot';

interface ChatMessageProps {
  type: MessageType;
  text: string;
  timestamp: Date;
}

const ChatMessage = ({ type, text, timestamp }: ChatMessageProps) => {
  const isUser = type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`
          flex items-center justify-center 
          rounded-full h-8 w-8 
          ${isUser ? 'bg-detector-blue ml-2' : 'bg-muted mr-2'}
        `}>
          {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4" />}
        </div>
        
        <div className={`
          py-2 px-4 rounded-2xl 
          ${isUser ? 'bg-detector-blue text-white' : 'bg-muted text-foreground'}
        `}>
          <p className="text-sm">{text}</p>
          <p className="text-xs opacity-70 mt-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
