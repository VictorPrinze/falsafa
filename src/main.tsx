import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
// import reportWebVitals from './reportWebVitals'; // Add this file to Falsafa
import { AuthProvider } from './contexts/AuthContext'; // Ensure this context exists in Falsafa

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

// Measure app performance (optional, based on the original code)
// reportWebVitals();
