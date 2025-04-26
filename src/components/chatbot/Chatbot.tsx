
import React, { useState, useRef, useEffect } from 'react';
import ChatbotButton from './ChatbotButton';
import ChatMessage from './ChatMessage';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { MessageType } from './ChatMessage';

interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    text: 'Hello! I\'m your Fall Detector assistant. How can I help you today?',
    timestamp: new Date(),
  },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const toggleChatbot = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        'hello': 'Hi there! How can I help you with Fall Detector today?',
        'hi': 'Hello! Need information about our fall detection system?',
        'how does it work': 'Our Fall Detector uses advanced CNN-based AI to monitor for falls in real-time. When a fall is detected, it sends immediate alerts to designated contacts.',
        'features': 'Our key features include real-time monitoring, instant alerts, and detection history with timestamps and video clips.',
        'contact': 'You can reach our team via the Contact Us page, or call directly at the numbers listed there.',
        'price': 'For pricing information, please contact our sales team through the Contact Us page.',
        'help': 'I can answer questions about our fall detection system, its features, how it works, or connect you with our team. What would you like to know?',
      };

      let botReply = '';
      const lowercaseInput = input.toLowerCase();
      
      // Check for keyword matches
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (lowercaseInput.includes(keyword)) {
          botReply = response;
          break;
        }
      }
      
      // Default response if no keywords match
      if (!botReply) {
        botReply = "I'm not sure I understand. Could you rephrase that? Or you can ask about how our fall detection works, its features, or contact information.";
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: botReply,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <ChatbotButton isOpen={isOpen} onClick={toggleChatbot} />
      
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-96 bg-detector-card border border-border/20 rounded-lg shadow-lg flex flex-col z-50 overflow-hidden">
          {/* Chatbot header */}
          <div className="bg-detector-blue/10 p-4 flex items-center border-b border-border/20">
            <Shield className="h-5 w-5 text-detector-blue mr-2" />
            <h3 className="font-medium">Fall Detector Assistant</h3>
          </div>
          
          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto bg-detector-dark/30">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id}
                type={message.type}
                text={message.text}
                timestamp={message.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="p-3 border-t border-border/20 bg-detector-card flex">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-detector-dark border-border/20"
            />
            <Button 
              onClick={handleSendMessage}
              className="ml-2 bg-detector-blue hover:bg-blue-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
