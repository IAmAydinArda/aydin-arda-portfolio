import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DarkModeProvider, useDarkMode } from '../DarkModeContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Test component that uses the dark mode context
const TestComponent = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div>
      <div data-testid="dark-mode-status">
        {isDarkMode ? 'dark' : 'light'}
      </div>
      <button data-testid="toggle-button" onClick={toggleDarkMode}>
        Toggle
      </button>
    </div>
  );
};

const renderWithProvider = () => {
  return render(
    <DarkModeProvider>
      <TestComponent />
    </DarkModeProvider>
  );
};

describe('DarkModeContext - Essential Tests', () => {
  let mockGetHours;

  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.classList.remove('dark');
    localStorageMock.getItem.mockReturnValue(null);
    mockGetHours = jest.spyOn(Date.prototype, 'getHours');
  });

  afterEach(() => {
    mockGetHours?.mockRestore();
  });

  it('should start in dark mode during nighttime', () => {
    mockGetHours.mockReturnValue(20); // 8 PM
    
    renderWithProvider();
    
    expect(screen.getByTestId('dark-mode-status')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should start in light mode during daytime', () => {
    mockGetHours.mockReturnValue(14); // 2 PM
    
    renderWithProvider();
    
    expect(screen.getByTestId('dark-mode-status')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should toggle between modes when button is clicked', () => {
    mockGetHours.mockReturnValue(14); // Start in light mode
    
    renderWithProvider();
    
    expect(screen.getByTestId('dark-mode-status')).toHaveTextContent('light');
    
    // Toggle to dark
    fireEvent.click(screen.getByTestId('toggle-button'));
    expect(screen.getByTestId('dark-mode-status')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    // Toggle back to light
    fireEvent.click(screen.getByTestId('toggle-button'));
    expect(screen.getByTestId('dark-mode-status')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should persist manual mode selection', () => {
    mockGetHours.mockReturnValue(14); // Daytime
    
    renderWithProvider();
    
    // Toggle to manual dark mode
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'true');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('autoMode', 'false');
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw errors
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage unavailable');
    });
    
    // Should still work and default to auto mode
    expect(() => renderWithProvider()).not.toThrow();
    
    // Should fall back to time-based mode
    expect(screen.getByTestId('dark-mode-status')).toHaveTextContent('light');
  });

  it('should persist manual preferences across component remounts', () => {
    mockGetHours.mockReturnValue(14); // Daytime
    
    const { unmount } = renderWithProvider();
    
    // Toggle to manual dark mode
    fireEvent.click(screen.getByTestId('toggle-button'));
    expect(screen.getByTestId('dark-mode-status')).toHaveTextContent('dark');
    
    unmount();
    
    // Set up localStorage to return manual preferences
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'autoMode') return 'false';
      if (key === 'darkMode') return 'true';
      return null;
    });
    
    // Remount component (simulating navigation)
    renderWithProvider();
    
    // Should maintain manual dark mode despite daytime
    expect(screen.getByTestId('dark-mode-status')).toHaveTextContent('dark');
  });
});