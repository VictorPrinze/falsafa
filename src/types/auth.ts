// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  role: 'employer' | 'freelancer';
  firstName?: string;
  lastName?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'employer' | 'freelancer';
}