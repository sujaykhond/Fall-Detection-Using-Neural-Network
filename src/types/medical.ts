
export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface MedicalProfile {
  allergies: string[];
  medicalConditions: string[];
  medications: string[];
  emergencyContacts: EmergencyContact[];
  bloodType?: string;
  notes?: string;
}

export interface MovementAnalysis {
  type: 'lying' | 'walking' | 'posture';
  status: 'normal' | 'warning' | 'alert';
  timestamp: string;
  duration?: number;
  details?: string;
}
