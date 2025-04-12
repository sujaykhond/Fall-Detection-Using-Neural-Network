
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Settings, 
  Bell, 
  Lock, 
  Monitor, 
  Users, 
  Database, 
  HelpCircle, 
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface SettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ isOpen, onOpenChange }: SettingsDialogProps) => {
  const [settings, setSettings] = useState({
    notifications: {
      pushNotifications: true,
      emailAlerts: true,
      smsAlerts: false,
      soundAlerts: true
    },
    security: {
      twoFactorAuth: false,
      saveLoginHistory: true,
      autoLockTimeout: "5"
    },
    display: {
      darkMode: true,
      highContrast: false,
      reducedMotion: false,
      largeText: false
    }
  });

  const handleSettingChange = (category: string, setting: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const saveSettings = () => {
    // In a real app, you would save the settings to a database or localStorage
    toast.success("Settings saved successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-detector-card border-border/30 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-detector-blue" />
            System Settings
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Configure your fall detection system preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="notifications" className="mt-4">
          <TabsList className="bg-detector-darker border border-border/30 grid grid-cols-4">
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="display">
              <Monitor className="h-4 w-4 mr-2" />
              Display
            </TabsTrigger>
            <TabsTrigger value="about">
              <HelpCircle className="h-4 w-4 mr-2" />
              About
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications" className="py-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Alert Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-400">Receive notifications on your devices</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'pushNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Alerts</p>
                    <p className="text-sm text-gray-400">Receive alerts via email</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.emailAlerts}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'emailAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-gray-400">Receive text messages for critical alerts</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.smsAlerts}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'smsAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sound Alerts</p>
                    <p className="text-sm text-gray-400">Play sound when alerts are received</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.soundAlerts}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'soundAlerts', checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="py-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Security Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Add an additional layer of security</p>
                  </div>
                  <Switch 
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('security', 'twoFactorAuth', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Save Login History</p>
                    <p className="text-sm text-gray-400">Keep track of all login attempts</p>
                  </div>
                  <Switch 
                    checked={settings.security.saveLoginHistory}
                    onCheckedChange={(checked) => handleSettingChange('security', 'saveLoginHistory', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-Lock Timeout</p>
                    <p className="text-sm text-gray-400">Minutes before auto-locking the system</p>
                  </div>
                  <select 
                    value={settings.security.autoLockTimeout}
                    onChange={(e) => handleSettingChange('security', 'autoLockTimeout', e.target.value)}
                    className="bg-detector-darker border border-border/30 rounded p-1"
                  >
                    <option value="1">1 minute</option>
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="display" className="py-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Display Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-400">Use darker colors for the interface</p>
                  </div>
                  <Switch 
                    checked={settings.display.darkMode}
                    onCheckedChange={(checked) => handleSettingChange('display', 'darkMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">High Contrast</p>
                    <p className="text-sm text-gray-400">Increase color contrast for better visibility</p>
                  </div>
                  <Switch 
                    checked={settings.display.highContrast}
                    onCheckedChange={(checked) => handleSettingChange('display', 'highContrast', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Reduced Motion</p>
                    <p className="text-sm text-gray-400">Minimize animations throughout the interface</p>
                  </div>
                  <Switch 
                    checked={settings.display.reducedMotion}
                    onCheckedChange={(checked) => handleSettingChange('display', 'reducedMotion', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Larger Text</p>
                    <p className="text-sm text-gray-400">Increase text size for better readability</p>
                  </div>
                  <Switch 
                    checked={settings.display.largeText}
                    onCheckedChange={(checked) => handleSettingChange('display', 'largeText', checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="py-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">About Fall Detector</h3>
              <div className="bg-detector-darker p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Version</p>
                    <p className="font-medium">2.3.1 (Build 456)</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Released</p>
                    <p className="font-medium">April 5, 2025</p>
                  </div>
                  <div>
                    <p className="text-gray-400">License</p>
                    <p className="font-medium">Enterprise</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Support</p>
                    <p className="font-medium text-detector-blue">support@falldetector.com</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-gray-400 text-sm mb-2">Connected Services</p>
                  <div className="flex gap-2">
                    <div className="bg-detector-card p-2 rounded flex items-center gap-2 text-xs">
                      <Database size={14} className="text-green-400" />
                      <span>Cloud Storage</span>
                    </div>
                    <div className="bg-detector-card p-2 rounded flex items-center gap-2 text-xs">
                      <Users size={14} className="text-blue-400" />
                      <span>User Directory</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border/30 bg-detector-darker text-white hover:bg-detector-card"
          >
            Cancel
          </Button>
          <Button 
            onClick={saveSettings}
            className="bg-detector-blue hover:bg-blue-600"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
