
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

const MedicalProfileForm = () => {
  const [allergies, setAllergies] = React.useState<string[]>([]);
  const [conditions, setConditions] = React.useState<string[]>([]);
  const [medications, setMedications] = React.useState<string[]>([]);
  const [contacts, setContacts] = React.useState<{ name: string; relationship: string; phone: string; }[]>([]);
  const [newAllergy, setNewAllergy] = React.useState('');
  const [newCondition, setNewCondition] = React.useState('');
  const [newMedication, setNewMedication] = React.useState('');

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy('');
    }
  };

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      setConditions([...conditions, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const handleAddMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication.trim()]);
      setNewMedication('');
    }
  };

  const handleAddContact = () => {
    setContacts([...contacts, { name: '', relationship: '', phone: '' }]);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Medical Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Allergies Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Allergies</h3>
            <div className="flex gap-2">
              <Input 
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="Add allergy"
              />
              <Button onClick={handleAddAllergy} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy, index) => (
                <div 
                  key={index}
                  className="bg-secondary px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {allergy}
                  <button
                    onClick={() => setAllergies(allergies.filter((_, i) => i !== index))}
                    className="hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Conditions Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Medical Conditions</h3>
            <div className="flex gap-2">
              <Input 
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="Add medical condition"
              />
              <Button onClick={handleAddCondition} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition, index) => (
                <div 
                  key={index}
                  className="bg-secondary px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {condition}
                  <button
                    onClick={() => setConditions(conditions.filter((_, i) => i !== index))}
                    className="hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Medications Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Medications</h3>
            <div className="flex gap-2">
              <Input 
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                placeholder="Add medication"
              />
              <Button onClick={handleAddMedication} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {medications.map((medication, index) => (
                <div 
                  key={index}
                  className="bg-secondary px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {medication}
                  <button
                    onClick={() => setMedications(medications.filter((_, i) => i !== index))}
                    className="hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Emergency Contacts</h3>
            <Button onClick={handleAddContact} variant="outline" className="w-full">
              Add Emergency Contact
            </Button>
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <Input 
                      value={contact.name}
                      onChange={(e) => {
                        const newContacts = [...contacts];
                        newContacts[index].name = e.target.value;
                        setContacts(newContacts);
                      }}
                      placeholder="Name"
                    />
                    <Input 
                      value={contact.relationship}
                      onChange={(e) => {
                        const newContacts = [...contacts];
                        newContacts[index].relationship = e.target.value;
                        setContacts(newContacts);
                      }}
                      placeholder="Relationship"
                    />
                    <Input 
                      value={contact.phone}
                      onChange={(e) => {
                        const newContacts = [...contacts];
                        newContacts[index].phone = e.target.value;
                        setContacts(newContacts);
                      }}
                      placeholder="Phone"
                    />
                  </div>
                  <Button 
                    variant="destructive"
                    size="icon"
                    onClick={() => setContacts(contacts.filter((_, i) => i !== index))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Additional Notes</h3>
            <Textarea placeholder="Add any additional medical information or notes..." />
          </div>

          <Button className="w-full">Save Medical Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalProfileForm;
