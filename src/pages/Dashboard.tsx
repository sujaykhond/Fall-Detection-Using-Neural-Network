import React, { useState } from 'react';
import CameraFeed from '@/components/CameraFeed';
import DetectionHistory from '@/components/DetectionHistory';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, Users, Plus, FileCog, Shield, UserPlus, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

// Sample detection data
const sampleDetections = [
  {
    id: '1',
    timestamp: '2025-04-10 15:23:45',
    location: 'Living Room',
    severity: 'high' as const,
    personName: 'John Doe',
    status: 'new' as const,
  },
  {
    id: '2',
    timestamp: '2025-04-10 14:18:22',
    location: 'Kitchen',
    severity: 'medium' as const,
    personName: 'Jane Doe',
    status: 'acknowledged' as const,
  },
  {
    id: '3',
    timestamp: '2025-04-10 13:05:17',
    location: 'Bedroom',
    severity: 'low' as const,
    personName: 'Alice Smith',
    status: 'resolved' as const,
  }
];

// Sample emergency contacts
const initialEmergencyContacts = [
  {
    id: '1',
    name: 'Sujay Khond',
    phone: '+91 77410 15729',
    email: 'sujaykhond@gmail.com',
  },
  {
    id: '2',
    name: 'Parth Yendhe',
    phone: '+91 73978 93290',
    email: 'yendheparth63@gmail.com',
  },
  {
    id: '3',
    name: 'Rohit Shinde',
    phone: '+91 99604 37623',
    email: 'shinderohit1412@gmail.com',
  },
  {
    id: '4',
    name: 'Omkar Kadam',
    phone: '+91 98904 66174',
    email: 'omkarkadam12@gmail.com',
  },
];

const Dashboard = () => {
  const [detections, setDetections] = useState(sampleDetections);
  const [showDetections, setShowDetections] = useState(true);
  const [emergencyContacts, setEmergencyContacts] = useState(initialEmergencyContacts);
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });
  
  const handleAddContact = () => {
    // Basic validation
    if (!newContact.name || !newContact.phone || !newContact.email) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const contact = {
      id: Date.now().toString(),
      ...newContact
    };
    
    setEmergencyContacts([...emergencyContacts, contact]);
    setNewContact({ name: '', phone: '', email: '' });
    setIsAddContactDialogOpen(false);
    toast.success("Emergency contact added successfully");
  };
  
  const handleDeleteContact = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
    toast.success("Contact removed successfully");
  };

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-500/20">
            <Shield className="h-8 w-8 text-detector-blue" />
          </div>
          <h1 className="text-3xl font-bold text-white">Fall Detector Dashboard</h1>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="bg-detector-card text-muted-foreground border-border/30">
            <Bell className="mr-1 h-4 w-4" />
            Alerts
            <Badge className="ml-2 bg-red-500 text-white" variant="outline">3</Badge>
          </Button>
          <Button variant="outline" size="sm" className="bg-detector-card text-muted-foreground border-border/30">
            <Settings className="mr-1 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="monitoring" className="mb-8">
        <TabsList className="bg-detector-card border border-border/30">
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          <TabsTrigger value="history">Detection History</TabsTrigger>
          <TabsTrigger value="settings">Camera Settings</TabsTrigger>
          <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monitoring" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CameraFeed cameraId="CAM_001" title="Live Fall Detection" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="detector-card space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Users size={18} className="text-blue-500" />
                    Monitoring Status
                  </h3>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>Active Monitors</span>
                    <span className="text-blue-400 font-medium">3/4</span>
                  </div>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>People Detected</span>
                    <span className="text-blue-400 font-medium">2</span>
                  </div>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>Detection Sensitivity</span>
                    <span className="text-blue-400 font-medium">High</span>
                  </div>
                </div>
                
                <div className="detector-card space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <FileCog size={18} className="text-blue-500" /> 
                    System Statistics
                  </h3>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>Model Version</span>
                    <span className="text-blue-400 font-medium">v2.3.1</span>
                  </div>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>Uptime</span>
                    <span className="text-blue-400 font-medium">23h 45m</span>
                  </div>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>CPU Usage</span>
                    <span className="text-blue-400 font-medium">34%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <DetectionHistory detections={showDetections ? detections : []} />
              
              <div className="mt-6 flex gap-2 justify-end">
                <Button 
                  variant="outline"
                  className="border-border/30 text-muted-foreground"
                  onClick={() => setShowDetections(!showDetections)}
                >
                  {showDetections ? 'Hide Detections' : 'Show Detections'}
                </Button>
                <Button className="bg-detector-blue hover:bg-blue-600">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Camera
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <div className="detector-card">
            <h3 className="text-xl mb-4">Detection History - Coming Soon</h3>
            <p className="text-muted-foreground">
              This tab will display a full history of all fall detections,
              including filtering and search capabilities.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <div className="detector-card">
            <h3 className="text-xl mb-4">Camera Settings - Coming Soon</h3>
            <p className="text-muted-foreground">
              This tab will allow configuration of cameras, detection sensitivity,
              and other monitoring parameters.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="contacts" className="mt-6">
          <div className="detector-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl">Emergency Contacts</h3>
              <Button 
                onClick={() => setIsAddContactDialogOpen(true)}
                className="bg-detector-blue hover:bg-blue-600"
              >
                <UserPlus className="mr-1 h-4 w-4" />
                Add Contact
              </Button>
            </div>
            
            <div className="bg-detector-darker rounded-md p-2">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-detector-darker">
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emergencyContacts.map((contact) => (
                    <TableRow key={contact.id} className="hover:bg-detector-card">
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>
                        <ContextMenu>
                          <ContextMenuTrigger>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Settings size={16} className="text-blue-400" />
                            </Button>
                          </ContextMenuTrigger>
                          <ContextMenuContent className="bg-detector-card border-border/30">
                            <ContextMenuItem
                              onClick={() => handleDeleteContact(contact.id)}
                              className="text-red-400 cursor-pointer"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Remove Contact
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddContactDialogOpen} onOpenChange={setIsAddContactDialogOpen}>
        <DialogContent className="bg-detector-card border-border/30 text-white">
          <DialogHeader>
            <DialogTitle>Add Emergency Contact</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Add a new contact to be notified in case of emergency fall detections.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm">Name</label>
              <input
                id="name"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                className="bg-detector-darker border border-border/30 rounded p-2 text-white"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm">Phone Number</label>
              <input
                id="phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                className="bg-detector-darker border border-border/30 rounded p-2 text-white"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm">Email Address</label>
              <input
                id="email"
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                className="bg-detector-darker border border-border/30 rounded p-2 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddContactDialogOpen(false)}
              className="border-border/30"
            >
              Cancel
            </Button>
            <Button onClick={handleAddContact} className="bg-detector-blue hover:bg-blue-600">
              Add Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
