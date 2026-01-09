
export interface AuthorizedPerson {
  id: string;
  name: string;
  role: 'Student' | 'Teacher' | 'Staff' | 'Admin';
  imageUrl?: string;
}

export interface SurveillanceLog {
  id: string;
  timestamp: string;
  event: string;
  status: 'Authorized' | 'Unauthorized' | 'Warning' | 'Info';
  detectedName: string;
}

export interface AnalysisResult {
  detected: boolean;
  name: string;
  status: 'Authorized' | 'Unauthorized' | 'None';
  reason: string;
}

export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  LOGS = 'LOGS',
  DATABASE = 'DATABASE',
  DOCS = 'DOCS',
  VIVA = 'VIVA'
}
