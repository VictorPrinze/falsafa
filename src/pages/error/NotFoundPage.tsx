import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2">Page not found</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;