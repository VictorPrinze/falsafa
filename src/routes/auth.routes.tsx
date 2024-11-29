import { RouteObject } from 'react-router-dom';
import LoginPage from '../pages/auth/login'
import SignupPage from '../pages/auth/signup';

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
];