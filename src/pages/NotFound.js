import React from "react";
import { Link } from "react-router-dom";
import notFound from "../assets/images/not-found.png";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700 select-none">
            404
          </h1>
        </div>

        {/* Main Message */}

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto mb-4">
            <img src={notFound} alt="404" className="w-full h-full" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            Go Home
          </Link>
          
          <div className="flex justify-center space-x-4">
            <Link
              to="/projects"
              className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium transition-colors duration-200"
            >
              View Projects
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/now"
              className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium transition-colors duration-200"
            >
              What I'm Doing
            </Link>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Maybe you're looking for something that's still in development? 🤔
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
