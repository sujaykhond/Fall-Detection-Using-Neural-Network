
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, Heart, HeartPulse } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-detector-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
      
      <div className="glass-neuro p-1 max-w-md w-full relative z-10">
        <div className="neuro-inset p-8 text-center space-y-6">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <AlertTriangle size={80} className="text-red-500/80" />
              <HeartPulse size={32} className="absolute bottom-0 right-0 text-red-500 animate-pulse" />
            </div>
          </div>
          
          <div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">404</h1>
            <p className="text-2xl font-medium text-white mt-2">Patient Not Found</p>
          </div>
          
          <div className="glass p-4 rounded-lg text-left">
            <p className="text-sm font-mono leading-relaxed">
              <span className="text-red-400">ERROR:</span> The requested patient file could not be located in our system.
              <br />
              <span className="text-gray-400">DIAGNOSIS:</span> Lost in cyberspace
              <br />
              <span className="text-gray-400">TREATMENT:</span> Return to homepage
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="glow-blue">
              <Button asChild className="neuro-button bg-detector-blue/80 hover:bg-detector-blue/90">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft size={16} /> Return to Safety
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-gray-400 flex items-center justify-center gap-2 mt-6">
            <Heart size={12} /> 
            <span>Vital signs normal. System functioning.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
