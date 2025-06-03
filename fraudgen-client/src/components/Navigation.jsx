import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Navigation({ isOpen, onToggle }) {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');
  
  // Update active section based on URL
  useEffect(() => {
    const path = location.pathname;
    setActiveSection(path);
  }, [location]);

  return (
    <>
      {/* Narrow collapsed sidebar when closed */}
      {!isOpen && (
        <div className="fixed top-0 left-0 w-12 h-screen bg-slate-900 shadow-lg z-30">
          <button 
            onClick={onToggle}
            className="w-full text-white hover:bg-slate-800 pt-24 pb-4 flex justify-center"
            aria-label="Expand sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Full sidebar when open */}
      <nav className={`fixed top-0 left-0 w-64 h-screen bg-slate-900 text-white shadow-lg overflow-hidden z-30 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full overflow-y-auto">
          {/* Collapse button at top of sidebar */}
          <div className="absolute top-4 right-4 z-40">
            <button 
              onClick={onToggle}
              className="p-2 text-white hover:bg-slate-800 rounded-md"
              aria-label="Collapse sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          {/* Main Navigation */}
          <div className="px-4 pt-20">
            <ul className="space-y-1">
              <li>
                <NavLink 
                  to="/" 
                  className={({isActive}) => 
                    isActive 
                      ? "flex items-center py-2.5 px-4 bg-blue-600/20 text-white border-l-4 border-blue-500 rounded-r-md" 
                      : "flex items-center py-2.5 px-4 text-white/80 hover:bg-slate-800 transition-all duration-300 rounded-r-md"
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/test-transaction" 
                  className={({isActive}) => 
                    isActive 
                      ? "flex items-center py-2.5 px-4 bg-blue-600/20 text-white border-l-4 border-blue-500 rounded-r-md" 
                      : "flex items-center py-2.5 px-4 text-white/80 hover:bg-slate-800 transition-all duration-300 rounded-r-md"
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Test Transaction
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/history" 
                  className={({isActive}) => 
                    isActive 
                      ? "flex items-center py-2.5 px-4 bg-blue-600/20 text-white border-l-4 border-blue-500 rounded-r-md" 
                      : "flex items-center py-2.5 px-4 text-white/80 hover:bg-slate-800 transition-all duration-300 rounded-r-md"
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Transaction History
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/location" 
                  className={({isActive}) => 
                    isActive 
                      ? "flex items-center py-2.5 px-4 bg-blue-600/20 text-white border-l-4 border-blue-500 rounded-r-md" 
                      : "flex items-center py-2.5 px-4 text-white/80 hover:bg-slate-800 transition-all duration-300 rounded-r-md"
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location Analysis
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/statistics" 
                  className={({isActive}) => 
                    isActive 
                      ? "flex items-center py-2.5 px-4 bg-blue-600/20 text-white border-l-4 border-blue-500 rounded-r-md" 
                      : "flex items-center py-2.5 px-4 text-white/80 hover:bg-slate-800 transition-all duration-300 rounded-r-md"
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Statistics
                </NavLink>
              </li>
            </ul>
            
            {/* Administration section */}
         
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;