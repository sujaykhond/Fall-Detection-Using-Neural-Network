
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-detector-blue">404</h1>
        <p className="text-2xl font-medium text-white">Page not found</p>
        <p className="text-muted-foreground max-w-md">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Button asChild className="bg-detector-blue hover:bg-blue-600">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} /> Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
