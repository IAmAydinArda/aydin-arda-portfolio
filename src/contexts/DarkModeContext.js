import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if it's nighttime based on local time (6 PM to 6 AM)
  const isNightTime = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  };

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedAutoMode = localStorage.getItem('autoMode');
      const savedDarkMode = localStorage.getItem('darkMode');
      
      if (savedAutoMode === 'false') {
        // User has manually set a preference
        setIsAutoMode(false);
        setIsDarkMode(JSON.parse(savedDarkMode || 'false'));
      } else {
        // Default: auto mode enabled
        setIsAutoMode(true);
        setIsDarkMode(isNightTime());
      }
      setIsInitialized(true);
    } catch (error) {
      // Fall back to auto mode if localStorage fails
      setIsAutoMode(true);
      setIsDarkMode(isNightTime());
      setIsInitialized(true);
    }
  }, []);

  // Auto-update dark mode based on time when in auto mode (only after initialization)
  useEffect(() => {
    if (!isInitialized || !isAutoMode) {
      return;
    }

    const updateBasedOnTime = () => {
      setIsDarkMode(isNightTime());
    };

    // Check every hour for time changes
    const interval = setInterval(updateBasedOnTime, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isInitialized, isAutoMode]);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    setIsAutoMode(false); // Disable auto mode when user manually toggles
    try {
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      localStorage.setItem('autoMode', 'false');
    } catch (error) {
      // Ignore localStorage errors - functionality will work without persistence
    }
  };


  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};