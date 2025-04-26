
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("API Key cannot be empty");
      return;
    }

    // Basic API key validation (optional)
    if (!apiKey.startsWith('sk-')) {
      toast.error("Invalid API key format");
      return;
    }

    localStorage.setItem('openai_api_key', apiKey);
    toast.success("API Key saved successfully");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable the chatbot functionality.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <Input 
            type="password"
            placeholder="Enter your OpenAI API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
