
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, Settings, Bell, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CameraFeed from '@/components/CameraFeed';
import DetectionHistory from '@/components/DetectionHistory';
import AlertsDialog from '@/components/dashboard/AlertsDialog';
import SettingsDialog from '@/components/dashboard/SettingsDialog';
import CameraButton from '@/components/CameraButton';
import FallDetectionGraph from '@/components/FallDetectionGraph';
import MedicalProfileForm from '@/components/profile/MedicalProfileForm';
import MovementAnalysis from '@/components/detection/MovementAnalysis';

const sampleDetections = [
  {
    id: 'fall-1',
    timestamp: 'Today, 2:45 PM',
    location: 'Living Room',
    severity: 'high' as const,
    personName: 'Unknown',
    status: 'new' as const
  },
  {
    id: 'fall-2',
    timestamp: 'Today, 11:20 AM',
    location: 'Kitchen',
    severity: 'medium' as const,
    personName: 'Unknown',
    status: 'acknowledged' as const
  },
  {
    id: 'fall-3',
    timestamp: 'Yesterday, 8:15 PM',
    location: 'Bedroom',
    severity: 'low' as const,
    personName: 'Unknown',
    status: 'resolved' as const
  }
];

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 space-y-6 relative">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-detector-blue/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-detector-blue/5 rounded-full blur-3xl -z-10"></div>
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-detector-blue" /> Fall Detection Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and respond to potential fall incidents
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <CameraButton />
          <AlertsDialog>
            <Button variant="outline" className="glass-neuro">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
          </AlertsDialog>
          <SettingsDialog>
            <Button variant="outline" className="glass-neuro">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </SettingsDialog>
        </div>
      </header>
      
      <Tabs defaultValue="monitor" className="w-full">
        <TabsList className="glass-neuro grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="monitor" className="data-[state=active]:glass-neuro-inset data-[state=active]:text-detector-blue">Monitor</TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:glass-neuro-inset data-[state=active]:text-detector-blue">Analysis</TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:glass-neuro-inset data-[state=active]:text-detector-blue">Medical Profile</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:glass-neuro-inset data-[state=active]:text-detector-blue">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monitor">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass-neuro col-span-1 lg:col-span-2 border-border/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" /> Live Camera Feed
                </CardTitle>
                <CardDescription>
                  Real-time monitoring with AI fall detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CameraFeed />
              </CardContent>
            </Card>
            
            <Card className="glass-neuro border-border/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Detection Status
                </CardTitle>
                <CardDescription>
                  Recent fall detection events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="neuro-inset p-4">
                  <DetectionHistory detections={sampleDetections} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-neuro p-1">
              <div className="neuro-inset p-4">
                <MovementAnalysis />
              </div>
            </div>
            <div className="glass-neuro p-1">
              <FallDetectionGraph />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="profile">
          <div className="glass-neuro p-1">
            <div className="neuro-inset p-4">
              <MedicalProfileForm />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="glass-neuro p-1">
            <div className="neuro-inset p-4">
              <DetectionHistory detections={sampleDetections} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
