// types/freelancer.ts
export interface Freelancer {
    id: number;
    name: string;
    title: string;
    profilePicture: string;
    skills: string[];
    ratePerHour: number;
    rating: number;
    totalReviews: number;
    bio: string;
    portfolio?: {
      id: number;
      title: string;
      thumbnail: string;
    }[];
    reviews?: {
      id: number;
      author: string;
      rating: number;
      comment: string;
    }[];


    location?: string;
    coverPhoto?: string;
    badges?: string[];
    languages?: string[];
    availability?: string;
    memberSince?: string;
    lastActive?: string;
    completedProjects?: number;
    responseTime?: string;
  }