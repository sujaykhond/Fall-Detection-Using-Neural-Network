
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
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = localStorage.getItem('openai_api_key');
      
      if (!apiKey) {
        toast({
          title: "API Key Required",
          description: "Please set your OpenAI API key in the settings",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant for a Fall Detection system. You help users understand how the fall detection works, provide safety tips, and answer questions about the system\'s features. Be concise but informative.',
            },
            {
              role: 'user',
              content: input,
            },
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const botReply = data.choices[0].message.content;

      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: botReply,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
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
              placeholder={isLoading ? "Getting response..." : "Type a message..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-detector-dark border-border/20"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage}
              className="ml-2 bg-detector-blue hover:bg-blue-600"
              disabled={isLoading}
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
