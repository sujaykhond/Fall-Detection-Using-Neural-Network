
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Bell, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AlertsDialogProps {
  children: React.ReactNode;
}

const AlertsDialog = ({ children }: AlertsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Sample alerts data
  const alerts = [
    {
      id: 'alert-1',
      title: 'Fall Detected',
      description: 'Potential fall detected in Living Room',
      severity: 'high',
      time: '2 minutes ago',
      isRead: false
    },
    {
      id: 'alert-2',
      title: 'Motion Detected',
      description: 'Unusual activity in Kitchen',
      severity: 'medium',
      time: '15 minutes ago',
      isRead: false
    },
    {
      id: 'alert-3',
      title: 'Camera Offline',
      description: 'Bedroom camera disconnected',
      severity: 'low',
      time: '1 hour ago',
      isRead: true
    }
  ];

  const markAllAsRead = () => {
    // In a real app, you would update the alerts in state/database
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="glass-dialog border-border/30 text-white max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-detector-blue" />
            Alerts & Notifications
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            Recent alerts from your fall detection system
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 max-h-[60vh] overflow-y-auto space-y-3">
          {alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`p-3 rounded-md glass ${alert.isRead ? 'bg-detector-darker/70' : 'border-detector-blue/50 bg-detector-blue/5'} flex gap-3`}
            >
              <div className={`
                flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                ${alert.severity === 'high' ? 'bg-red-500/20 text-red-400' : 
                alert.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' : 
                'bg-blue-500/20 text-blue-400'}
              `}>
                <AlertTriangle size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{alert.title}</h4>
                  <Badge className={`
                    text-xs px-1.5 py-0 h-5
                    ${alert.severity === 'high' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 
                    alert.severity === 'medium' ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 
                    'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'}
                  `}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                <div className="text-xs text-gray-500 mt-2">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-border/30 bg-detector-darker text-white hover:bg-detector-card">
            Close
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={markAllAsRead}
            className="bg-detector-blue hover:bg-blue-600"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark All as Read
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertsDialog;
