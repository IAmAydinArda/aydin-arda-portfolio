import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          )}
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}