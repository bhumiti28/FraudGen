import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import LocationDashboard from './components/LocationDashboard';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';
import Statistics from './components/Statistics';

// Import CSS
import './index.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  
  // Calculate header height on mount and window resize
  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector('.app-header');
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      }
    };
    
    // Initial calculation
    updateHeaderHeight();
    
    // Update on resize
    window.addEventListener('resize', updateHeaderHeight);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <Router>
      <div className="app-container bg-gray-100">
        {/* Header */}
        <Header 
          isMenuOpen={isMenuOpen} 
          toggleMenu={toggleMenu} 
          className="app-header"
        />
        
        {/* Main content area with sidebar and routes */}
        <div className="content-wrapper">
          {/* Sidebar - fixed position with dynamic top position */}
          <Navigation 
            isOpen={isMenuOpen} 
            onToggle={toggleMenu} 
            style={{ top: `${headerHeight}px` }}
            className="app-sidebar"
          />
          
          {/* Main content - with appropriate padding and margin */}
          <main 
            className="main-content"
            style={{ 
              marginLeft: isMenuOpen ? '16rem' : '3rem',
              marginTop: `${headerHeight}px`,
            }}
          >
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/location" element={<LocationDashboard />} />
                <Route path="/test-transaction" element={<TransactionForm />} />
                <Route path="/history" element={<TransactionHistory />} />
                <Route path="/statistics" element={<Statistics />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;