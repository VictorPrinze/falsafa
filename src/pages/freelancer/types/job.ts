// src/pages/freelancer/types/index.ts
export interface Job {
  id: string;
  company: {
    name: string;
    logo: string;
  };
  title: string;
  description: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  appliedCount: number;
  postedDate: string;
  urgent?: boolean;
}
