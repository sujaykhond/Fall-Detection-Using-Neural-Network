import React, { useState } from 'react';
import CameraFeed from '@/components/CameraFeed';
import DetectionHistory from '@/components/DetectionHistory';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, Users, Plus, FileCog, Shield, UserPlus, X, Calendar, Clock, History, Camera, CameraOff, SlidersHorizontal, Filter, Download, Eye, Trash2, RotateCcw, Sliders } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [filterOptions, setFilterOptions] = useState({
    showHigh: true,
    showMedium: true,
    showLow: true,
    dateRange: 'all',
  });
  
  // Camera settings state
  const [cameras, setCameras] = useState([
    { id: 'CAM_001', name: 'Living Room', status: 'online', sensitivity: 'high', notifications: true },
    { id: 'CAM_002', name: 'Kitchen', status: 'online', sensitivity: 'medium', notifications: true },
    { id: 'CAM_003', name: 'Bedroom', status: 'offline', sensitivity: 'low', notifications: false },
    { id: 'CAM_004', name: 'Backyard', status: 'online', sensitivity: 'medium', notifications: true },
  ]);
  
  const [editCameraId, setEditCameraId] = useState<string | null>(null);
  const [editCamera, setEditCamera] = useState({
    name: '',
    sensitivity: '',
    notifications: false
  });

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

  const handleDeleteDetection = (id: string) => {
    setDetections(detections.filter(detection => detection.id !== id));
    toast.success("Detection removed from history");
  };

  const filteredDetections = detections.filter(detection => {
    // Filter by severity
    if (detection.severity === 'high' && !filterOptions.showHigh) return false;
    if (detection.severity === 'medium' && !filterOptions.showMedium) return false;
    if (detection.severity === 'low' && !filterOptions.showLow) return false;
    
    // Future enhancement for date filtering
    return true;
  });
  
  const handleFilterChange = (key: string, value: any) => {
    setFilterOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleEditCamera = (camera: any) => {
    setEditCameraId(camera.id);
    setEditCamera({
      name: camera.name,
      sensitivity: camera.sensitivity,
      notifications: camera.notifications
    });
  };
  
  const handleSaveCameraSettings = () => {
    if (!editCameraId) return;
    
    setCameras(cameras.map(camera => 
      camera.id === editCameraId 
        ? { ...camera, ...editCamera }
        : camera
    ));
    
    setEditCameraId(null);
    toast.success("Camera settings updated");
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl flex items-center gap-2">
                <History className="text-amber-500" />
                Detection History
              </h3>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-detector-darker border-border/30">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="bg-detector-darker border-border/30">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="bg-detector-darker p-4 rounded-md mb-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">Severity:</label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Checkbox 
                      checked={filterOptions.showHigh} 
                      onCheckedChange={(checked) => handleFilterChange('showHigh', checked)} 
                      className="data-[state=checked]:bg-red-500 border-red-400"
                    />
                    <span className="text-sm">High</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Checkbox 
                      checked={filterOptions.showMedium} 
                      onCheckedChange={(checked) => handleFilterChange('showMedium', checked)} 
                      className="data-[state=checked]:bg-amber-500 border-amber-400"
                    />
                    <span className="text-sm">Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Checkbox 
                      checked={filterOptions.showLow} 
                      onCheckedChange={(checked) => handleFilterChange('showLow', checked)} 
                      className="data-[state=checked]:bg-blue-500 border-blue-400"
                    />
                    <span className="text-sm">Low</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">Time Range:</label>
                <select 
                  value={filterOptions.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="bg-detector-card border border-border/30 rounded p-1 text-sm"
                >
                  <option value="today">Today</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
            
            <div className="bg-detector-darker rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-detector-card hover:bg-detector-card">
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Person</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDetections.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                        No detection history found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDetections.map((detection) => (
                      <TableRow key={detection.id} className="hover:bg-detector-card">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            {detection.timestamp}
                          </div>
                        </TableCell>
                        <TableCell>{detection.location}</TableCell>
                        <TableCell>{detection.personName}</TableCell>
                        <TableCell>
                          <Badge className={`
                            ${detection.severity === 'high' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 
                            detection.severity === 'medium' ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 
                            'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'}
                            border-none`}
                          >
                            {detection.severity.charAt(0).toUpperCase() + detection.severity.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`
                            ${detection.status === 'new' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 
                            detection.status === 'acknowledged' ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 
                            'bg-green-500/20 text-green-400 hover:bg-green-500/30'}
                            border-none`}
                          >
                            {detection.status.charAt(0).toUpperCase() + detection.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-detector-darker">
                              <Eye size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-detector-darker"
                              onClick={() => handleDeleteDetection(detection.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
              <div>Showing {filteredDetections.length} of {detections.length} detections</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-detector-darker border-border/30">
                  <RotateCcw size={14} className="mr-1" /> 
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <div className="detector-card">
            <div className="flex items-center gap-2 mb-6">
              <Sliders className="text-blue-500" />
              <h3 className="text-xl">Camera Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {cameras.map((camera) => (
                <Card key={camera.id} className="bg-detector-darker border-border/30">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {camera.status === 'online' ? (
                          <Camera className="text-green-500" size={18} />
                        ) : (
                          <CameraOff className="text-red-500" size={18} />
                        )}
                        <CardTitle className="text-lg">{camera.name}</CardTitle>
                      </div>
                      <Badge className={camera.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                        {camera.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editCameraId === camera.id ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">Camera Name</label>
                          <input 
                            type="text" 
                            value={editCamera.name} 
                            onChange={(e) => setEditCamera({...editCamera, name: e.target.value})}
                            className="bg-detector-card border border-border/30 rounded w-full p-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">Detection Sensitivity</label>
                          <select 
                            value={editCamera.sensitivity} 
                            onChange={(e) => setEditCamera({...editCamera, sensitivity: e.target.value})}
                            className="bg-detector-card border border-border/30 rounded w-full p-2 text-white"
                          >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            checked={editCamera.notifications} 
                            onCheckedChange={(checked) => 
                              setEditCamera({...editCamera, notifications: checked === true})}
                          />
                          <label className="text-sm">Enable Notifications</label>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button 
                            onClick={handleSaveCameraSettings}
                            className="bg-detector-blue hover:bg-blue-600 w-full"
                          >
                            Save Changes
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setEditCameraId(null)}
                            className="border-border/30 w-full"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-400">Camera ID:</span>
                            <div className="font-medium">{camera.id}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Sensitivity:</span>
                            <div className="font-medium capitalize">{camera.sensitivity}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Notifications:</span>
                            <div className="font-medium">{camera.notifications ? 'Enabled' : 'Disabled'}</div>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleEditCamera(camera)} 
                          className="w-full bg-detector-darker border-border/30 hover:bg-detector-card mt-2"
                        >
                          <SlidersHorizontal size={16} className="mr-2" />
                          Configure Camera
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button className="bg-detector-blue hover:bg-blue-600">
              <Plus className="mr-1 h-4 w-4" />
              Add New Camera
            </Button>
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
                className="bg-detector-darker border border-border/30 rounded w-full p-2 text-white"
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
