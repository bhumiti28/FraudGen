import React, { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';

const Header = forwardRef(({ isMenuOpen, toggleMenu, className, ...props }, ref) => {
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-dropdown') && 
          !event.target.closest('.notification-button')) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);
  
  return (
    <header 
      ref={ref}
      className={`${className} transition-all duration-300 ${
        scrolled ? 'bg-slate-900 shadow-lg' : 'bg-gradient-to-r from-blue-900 to-slate-800'
      }`}
      {...props}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and menu toggle */}
          <div className="flex items-center">
            <button 
              onClick={toggleMenu}
              className="mr-4 text-white hover:text-blue-300 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            
            <Link to="/" className="flex items-center">
              <div className="relative mr-3">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur opacity-60"></div>
                <div className="relative bg-slate-800 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-white text-2xl font-extrabold tracking-tighter">
                  <span className="text-blue-400">FRAUD</span>
                  <span className="text-cyan-300">GEN</span>
                </h1>
                <p className="text-white/60 text-xs -mt-1">Advanced Fraud Detection System</p>
              </div>
            </Link>
          </div>
          
          {/* Right side - Search, notifications, profile */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="bg-slate-700/50 border border-slate-600 rounded-lg py-1 px-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 lg:w-64"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="notification-button p-1 rounded-full bg-slate-700/50 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Notifications"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
              </button>
              
              {/* Notification dropdown */}
              {showNotifications && (
                <div className="notification-dropdown absolute right-0 mt-2 w-80 rounded-md bg-white shadow-lg z-50">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-800">High-risk transaction detected</p>
                      <p className="text-xs text-gray-500 mt-1">Amount: $24,500 - 10 minutes ago</p>
                    </div>
                    <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-800">New fraud pattern identified</p>
                      <p className="text-xs text-gray-500 mt-1">Multiple transactions from Nigeria - 2 hours ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-800">System update scheduled</p>
                      <p className="text-xs text-gray-500 mt-1">Maintenance planned for 11:00 PM - Today</p>
                    </div>
                  </div>
                  <div className="p-2 border-t border-gray-200">
                    <button className="w-full text-xs text-blue-600 hover:text-blue-800 font-medium p-1">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile */}
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 p-0.5">
                  <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                    <span className="text-white font-medium text-sm">TS</span>
                  </div>
                </div>
                <span className="hidden md:block text-sm text-white font-medium">Tom Sullivan</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:block h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status bar - For system messages/alerts */}
      <div className="bg-green-500 py-1 px-4 text-xs text-white flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        All fraud detection systems operating normally | Last updated: 5 minutes ago
      </div>
    </header>
  );
});

export default Header;