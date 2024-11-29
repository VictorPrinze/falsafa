export interface JobPost {
    id: number;
    title: string;
    type: string;
    postedDate: string;
    applications: number;
    skills: string[];
    status: 'active' | 'draft' | 'closed';
    salary?: {
      min: number;
      max: number;
      currency: string;
    };
    location: string;
    applicantProgress?: {
      shortlisted: number;
      interviewed: number;
      rejected: number;
    };
  }
  
  export interface DashboardStats {
    activeJobs: number;
    totalApplications: number;
    unreadMessages: number;
    applicantsToday: number;
    viewsToday: number;
  }