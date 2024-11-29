import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './index.css';

// Auth Pages
import LoginPage from './pages/auth/login';
import SignupPage from './pages/auth/signup';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import NotFoundPage from './pages/error/NotFoundPage';

// Protected Pages
import FreelancerHomePage from './pages/freelancer/FreelancerHomePage';
import EmployerHomePage from './pages/employer/EmployerHomePage';

// Freelancer Components
import MessagesPage from './pages/freelancer/components/MessagesDropdown';
import NotificationsPage from './pages/freelancer/components/NotificationDropdown';
import Profile from './pages/freelancer/components/Profile';
import Settings from './pages/freelancer/components/Setting';
import Payment from './pages/freelancer/components/Payment';
import SavedJobs from './pages/freelancer/components/SavedJobsDropdown';
import ApplicationDetails from './pages/freelancer/components/ApplicationDetails';

// Employer Components
import EmployerProfile from './pages/employer/components/EmployerProfile';
import EmployerSettings from './pages/employer/components/EmployerSettings';
import EmployerBilling from './pages/employer/components/EmployerBilling';
import DiscoverFreelancersPage from './pages/employer/components/ DiscoverFreelancersPage';
import FreelancerProfilePage from './pages/employer/components/FreelancerProfilePage';
import PostJobForm from './pages/employer/components/PostJobForm';
import JobDetailPage from './pages/employer/components/JobDetailPage';

// Auth & Role-based Routing
import ProtectedRoute from './pages/auth/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

// Layout Components
const FreelancerLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const EmployerLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

// Role-based redirect component
const RoleBasedRedirect: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Navigate to={`/${user.role}/home`} replace />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* Freelancer Protected Routes */}
        <Route path="/freelancer" element={<FreelancerLayout />}>
          <Route
            path="home"
            element={
              <ProtectedRoute allowedRole="freelancer">
                <FreelancerHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRole="freelancer">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRole="freelancer">
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="payment"
            element={
              <ProtectedRoute allowedRole="freelancer">
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="messages"
            element={
              <ProtectedRoute allowedRole="freelancer">
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute allowedRole="freelancer">
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
         <Route
    path="/freelancer/saved-jobs"  // Updated to match navigation path
    element={
      <ProtectedRoute allowedRole="freelancer">
        <SavedJobs />
      </ProtectedRoute>
    }
  />
          <Route
            path="apply/:jobId"
            element={
              <ProtectedRoute allowedRole="freelancer">
                <ApplicationDetails />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Employer Protected Routes */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route
            path="home"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="billing"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerBilling />
              </ProtectedRoute>
            }
          />
          <Route
            path="discover-freelancers"
            element={
              <ProtectedRoute allowedRole="employer">
                <DiscoverFreelancersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="freelancer/:freelancerId"
            element={
              <ProtectedRoute allowedRole="employer">
                <FreelancerProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="job/:jobId"
            element={
              <ProtectedRoute allowedRole="employer">
                <JobDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="post-job"
            element={
              <ProtectedRoute allowedRole="employer">
                <PostJobForm />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Role-based redirect for /home */}
        <Route path="/home" element={<RoleBasedRedirect />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;