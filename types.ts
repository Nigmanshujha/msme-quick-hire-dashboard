
export interface Candidate {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  education: string;
  salaryExpectation: string;
  distance: string;
  status: 'available' | 'actively_looking' | 'recently_applied' | 'hired';
  lastActive: string;
  phone: string;
  imageUrl: string;
}

export interface RoleTemplate {
  id: string;
  title: string;
  suggestedSalary: string;
  hours: string;
  icon: string;
}

export type HireStatus = 'Not Available' | 'Salary Mismatch' | 'No Answer' | 'Hired' | 'Next Round';

export interface FilterState {
  role?: string;
  location?: string;
  education?: string;
  count?: number;
}
