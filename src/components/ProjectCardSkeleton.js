import React from 'react';

export default function ProjectCardSkeleton() {
  return (
    <div className="mx-0 w-96 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 rounded-[16px] animate-pulse">
      <div className="flex flex-col w-full gap-8">
        <div className="h-72 bg-gray-300 dark:bg-gray-700 rounded-[12px]"></div>
        <div className="flex flex-col w-full justify-between">
          <div className="flex flex-col gap-3">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
            <div className="flex gap-3 mt-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
            </div>
          </div>
          <div className="flex flex-row gap-3 mt-4">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}