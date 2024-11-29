// src/types/job.ts
export interface Salary {
    min: number;
    max: number;
    currency: string;
  }
  
  export interface ApplicantProgress {
    shortlisted: number;
    interviewed: number;
    rejected: number;
  }
  
  export interface Applicant {
    id: string;
    name: string;
    status: string;
    appliedDate: string;
  }
  
  export interface Job {
    id: string;
    title: string;
    status?: string;
    salary?: Salary;
    type: string;
    location: string;
    postedDate: string;
    applications: number;
    skills: string[];
    description?: string;
    applicantProgress?: ApplicantProgress;
    applicants?: Applicant[];
  }