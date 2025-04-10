
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Brain, Shield, ArrowLeft, Cpu, Activity, BrainCircuit } from 'lucide-react';

const LearnMore = () => {
  return (
    <div className="min-h-screen">
      <div className="container max-w-6xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            className="mr-4"
            asChild
          >
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Learn More About Our Technology</h1>
        </div>

        {/* Introduction */}
        <section className="mb-16">
          <Card className="bg-detector-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-detector-blue" />
                AI-Powered Fall Detection
              </CardTitle>
              <CardDescription>
                Understanding how our technology works to protect vulnerable individuals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Our Fall Detector system uses advanced convolutional neural networks (CNNs) to 
                analyze video feeds in real-time, identifying patterns that indicate a fall event. 
                This technology is particularly valuable in healthcare settings, senior living facilities, 
                and for individuals aging in place.
              </p>
              <p className="text-gray-300">
                By leveraging machine learning and computer vision, we can provide a non-intrusive 
                monitoring solution that respects privacy while offering peace of mind and rapid 
                response capabilities.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-detector-card border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Cpu className="mr-2 h-5 w-5 text-detector-blue" />
                  Video Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Our system continuously analyzes video feeds from standard cameras. The footage is 
                  processed locally for privacy, with only alerts being transmitted to caregivers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-detector-card border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BrainCircuit className="mr-2 h-5 w-5 text-detector-blue" />
                  AI Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  The CNN model has been trained on thousands of fall scenarios, learning to 
                  distinguish between normal movements and actual falls with high accuracy.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-detector-card border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Activity className="mr-2 h-5 w-5 text-detector-blue" />
                  Instant Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  When a fall is detected, the system immediately sends notifications to designated 
                  contacts, ensuring prompt assistance and potentially life-saving response times.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
          
          <Card className="bg-detector-card border-border/20">
            <CardContent className="p-6">
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-detector-blue mr-2">•</span>
                  <span><strong>Model Architecture:</strong> Custom CNN based on ResNet, optimized for human motion detection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-detector-blue mr-2">•</span>
                  <span><strong>Detection Accuracy:</strong> 98.5% in controlled environments, 96.2% in real-world settings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-detector-blue mr-2">•</span>
                  <span><strong>Processing Requirements:</strong> Can run on standard computers or specialized edge devices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-detector-blue mr-2">•</span>
                  <span><strong>Response Time:</strong> Average alert time under 2 seconds from fall detection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-detector-blue mr-2">•</span>
                  <span><strong>Privacy Features:</strong> Video processing occurs locally; personally identifiable information is never stored</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <Card className="bg-detector-card border-border/20">
              <CardHeader>
                <CardTitle className="text-lg">Is my privacy protected when using this system?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Yes, privacy is a core concern in our design. Video processing happens locally, and 
                  only alert notifications are sent to designated contacts. No video is stored or 
                  transmitted unless an actual fall is detected.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-detector-card border-border/20">
              <CardHeader>
                <CardTitle className="text-lg">How many cameras do I need for effective monitoring?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  The number of cameras depends on the space being monitored. Typically, one camera 
                  per major living area (bedroom, living room, kitchen) provides adequate coverage.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-detector-card border-border/20">
              <CardHeader>
                <CardTitle className="text-lg">Can the system distinguish between a fall and simply lying down?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Yes, our AI model analyzes motion patterns, speed, and posture changes to differentiate 
                  between intentional movements (like lying down) and accidental falls. This reduces 
                  false alarms while maintaining high detection accuracy.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <Card className="bg-gradient-to-r from-detector-card to-detector-dark border-border/20">
            <CardContent className="py-8 px-6">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-detector-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Ready to learn more?</h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Contact our team for a personalized demonstration or to discuss how our fall 
                  detection technology can be implemented in your facility or home.
                </p>
                <Button className="bg-detector-blue hover:bg-blue-600">Contact Us</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default LearnMore;
