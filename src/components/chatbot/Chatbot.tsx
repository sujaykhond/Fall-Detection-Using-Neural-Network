
import React, { useState, useRef, useEffect } from 'react';
import ChatbotButton from './ChatbotButton';
import ChatMessage from './ChatMessage';
import { Send, Key } from 'lucide-react';
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
    text: 'Hello! I\'m your Fall Detector assistant. Please set up your API key to enable advanced features.',
    timestamp: new Date(),
  },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isSettingKey, setIsSettingKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const toggleChatbot = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Try to get API key from localStorage
    const savedApiKey = localStorage.getItem('chatbot_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const saveApiKey = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('chatbot_api_key', input.trim());
    setApiKey(input.trim());
    setInput('');
    setIsSettingKey(false);
    toast({
      title: "Success",
      description: "API key saved successfully",
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set up your API key first",
        variant: "destructive",
      });
      setIsSettingKey(true);
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Here you would make your API call
      // This is a placeholder for the API integration
      const response = await fetch('https://api.your-ai-service.com/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: data.response || "I apologize, but I couldn't process that request.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat API Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from AI service",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isSettingKey) {
        saveApiKey();
      } else {
        handleSendMessage();
      }
    }
  };

  return (
    <>
      <ChatbotButton isOpen={isOpen} onClick={toggleChatbot} />
      
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-96 bg-detector-card border border-border/20 rounded-lg shadow-lg flex flex-col z-50 overflow-hidden">
          {/* Chatbot header */}
          <div className="bg-detector-blue/10 p-4 flex items-center justify-between border-b border-border/20">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-detector-blue mr-2" />
              <h3 className="font-medium">Fall Detector Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingKey(!isSettingKey)}
              className="h-8 w-8"
            >
              <Key className={`h-4 w-4 ${apiKey ? 'text-green-400' : 'text-yellow-400'}`} />
            </Button>
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
              type={isSettingKey ? "password" : "text"}
              placeholder={isSettingKey ? "Enter API Key..." : "Type a message..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-detector-dark border-border/20"
            />
            <Button 
              onClick={isSettingKey ? saveApiKey : handleSendMessage}
              className="ml-2 bg-detector-blue hover:bg-blue-600"
            >
              {isSettingKey ? (
                <Key className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
