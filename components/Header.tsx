
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-emerald-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-white p-1 rounded-lg">
            <svg className="w-6 h-6 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">Fertile Map</span>
        </Link>

        <nav className="flex space-x-1">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/') ? 'bg-emerald-700' : 'hover:bg-emerald-700/50'
            }`}
          >
            New Analysis
          </Link>
          <Link 
            to="/history" 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/history') ? 'bg-emerald-700' : 'hover:bg-emerald-700/50'
            }`}
          >
            History
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
