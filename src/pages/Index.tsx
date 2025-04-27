import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, Monitor, Bell, Clock } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with updated branding */}
      <section className="py-16 md:py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-detector-blue/10 text-detector-blue text-sm font-medium">
                <img 
                  src="/lovable-uploads/c004be3d-3a52-4404-bebc-f51a3cbf729b.png" 
                  alt="FallSense Logo" 
                  className="w-4 h-4 mr-2" 
                />
                <span>Advanced CNN-Based Detection</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                AI-Powered Fall Detection System
              </h1>
              <p className="text-lg text-gray-300 max-w-lg">
                Real-time monitoring and instant alerts for elderly care, hospitals, 
                and assisted living facilities. Get peace of mind with our advanced fall detection technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-detector-blue hover:bg-blue-600 text-white">
                  <Link to="/dashboard" className="flex items-center">
                    View Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden border border-border/20 shadow-xl glass-card">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                  alt="Fall Detector Dashboard Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-detector-darker/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 glass-dialog px-3 py-2 rounded-md text-sm">
                  Live Monitoring Dashboard
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-detector-blue/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-detector-blue/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section with glassmorphism */}
      <section className="py-16 px-4 bg-detector-dark">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our fall detection system utilizes cutting-edge CNN technology to provide reliable 
              and accurate monitoring for individuals at risk.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6">
              <div className="rounded-full bg-blue-500/20 w-12 h-12 flex items-center justify-center mb-4">
                <Monitor className="text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Real-time Monitoring</h3>
              <p className="text-gray-400">
                24/7 continuous monitoring with advanced AI algorithms to detect falls and abnormal movements.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <div className="rounded-full bg-blue-500/20 w-12 h-12 flex items-center justify-center mb-4">
                <Bell className="text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Instant Alerts</h3>
              <p className="text-gray-400">
                Immediate notifications to caregivers and emergency contacts when a fall is detected.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <div className="rounded-full bg-blue-500/20 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Detection History</h3>
              <p className="text-gray-400">
                Complete history of all detected incidents with timestamps, video clips, and action logs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section with glassmorphism */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="glass-dialog bg-gradient-to-r from-detector-card to-detector-dark border-border/20">
            <div className="text-center max-w-2xl mx-auto py-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to enhance safety with AI-powered monitoring?
              </h2>
              <p className="text-gray-400 mb-6">
                Get started with our fall detection system today and provide peace of mind for families and care providers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-detector-blue hover:bg-blue-600">
                  <Link to="/dashboard">Try Demo</Link>
                </Button>
                <Button asChild variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                  <Link to="/learn-more">Learn More</Link>
                </Button>
                <Button asChild variant="secondary" className="bg-detector-dark border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                  <Link to="/contact-us">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer update */}
      <footer className="py-8 px-4 border-t border-border/20 glass-nav">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/c004be3d-3a52-4404-bebc-f51a3cbf729b.png" 
                alt="FallSense Logo" 
                className="h-5 w-5" 
              />
              <span className="font-bold">FallSense</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FallSense. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
