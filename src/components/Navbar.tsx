import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="px-6 py-4 bg-card border-b border-border/20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <Shield className="h-8 w-8 text-detector-blue" />
        <span className="text-2xl font-bold">FallSense</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <Link 
          to="/login" 
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Register
        </Link>
        <Link 
          to="/dashboard" 
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Dashboard
        </Link>
        <Link 
          to="/contact-us" 
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Contact Us
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
