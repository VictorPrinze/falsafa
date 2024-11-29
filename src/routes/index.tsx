// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { authRoutes } from './auth.routes';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      ...authRoutes,
      // Add other route groups here
    ],
  },
]);
