import React from 'react'
import { Link, useLocation } from "react-router-dom";
import "../index.css"
import ReactGA from 'react-ga4';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  const location = useLocation();

  const handleClick = (event) => {
    ReactGA.event({
      category: 'header links',
      action: 'Click',
      label: event.target.href
    });
  };

  const isActivePath = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-3 left-0 w-full z-50">
      <div className="flex items-center justify-center py-3">
        <div className="flex flex-row gap-4 xxs:gap-8 items-center justify-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-full px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 max-w-full overflow-x-auto scrollbar-hide">
          <Link
            to="/"
            className={`px-1 xxs:px-2 md:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200 text-xs sm:text-sm font-medium whitespace-nowrap ${
              isActivePath('/')
                ? 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={handleClick}
          >
            Home
          </Link>
          <Link
            to="/now"
            className={`px-1 xs:px-3 md:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200 text-xs sm:text-sm font-medium whitespace-nowrap ${
              isActivePath('/now')
                ? 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={handleClick}
          >
            Now
          </Link>
          <Link
            to="/projects"
            className={`px-1 xs:px-3 md:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200 text-xs sm:text-sm font-medium whitespace-nowrap ${
              isActivePath('/projects')
                ? 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={handleClick}
          >
            Projects
          </Link>
          {/* <Link
            to="/writing"
            className={`px-1 xs:px-3 md:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200 text-xs sm:text-sm font-medium whitespace-nowrap ${
              isActivePath('/writing')
                ? 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={handleClick}
          >
            Writing
          </Link> */}
          {/* <Link
            to="/reading"
            className={`px-1 xs:px-3 md:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200 text-xs sm:text-sm font-medium whitespace-nowrap ${
              isActivePath('/reading')
                ? 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={handleClick}
          >
            Reading
          </Link> */}

          {/* Theme Selector - visually separated */}
          <div className="ml-1 sm:ml-2 pl-1 sm:pl-2 border-l border-gray-300 dark:border-gray-600">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
