
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, Settings, Bell, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CameraFeed from '@/components/CameraFeed';
import DetectionHistory from '@/components/DetectionHistory';
import { AlertsDialog } from '@/components/dashboard/AlertsDialog';
import { SettingsDialog } from '@/components/dashboard/SettingsDialog';
import CameraButton from '@/components/CameraButton';
import FallDetectionGraph from '@/components/FallDetectionGraph';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
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
            <Button variant="outline" className="glass-card">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
          </AlertsDialog>
          <SettingsDialog>
            <Button variant="outline" className="glass-card">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </SettingsDialog>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card col-span-1 lg:col-span-2 border-border/20">
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
        
        <Card className="glass-card border-border/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Detection Status
            </CardTitle>
            <CardDescription>
              Recent fall detection events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DetectionHistory />
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="glass-card grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="history">Detection History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-6">
            <FallDetectionGraph />
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="glass-card border-border/20">
              <CardHeader>
                <CardTitle>Detection History</CardTitle>
                <CardDescription>
                  Complete history of all fall detection events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 text-muted-foreground">
                  No falls detected in the past 7 days
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
