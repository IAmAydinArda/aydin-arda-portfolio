import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function CollapsibleSection({
  title,
  children,
  level = 2, // 2 for h2, 3 for h3
  defaultExpanded = true,
  className = ''
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const headerSizes = {
    2: 'text-2xl font-semibold text-gray-900 dark:text-gray-100',
    3: 'text-xl text-blue-800 dark:text-blue-400'
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2 text-left ${headerSizes[level]} hover:opacity-80 transition-opacity`}
      >
        {isExpanded ? (
          <ChevronDownIcon className="w-5 h-5" />
        ) : (
          <ChevronRightIcon className="w-5 h-5" />
        )}
        {title}
      </button>

      <div
        className={`flex flex-col gap-4 transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}