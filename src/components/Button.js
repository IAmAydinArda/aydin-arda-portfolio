import React from 'react';

export default function Button({
  variant = 'primary', // primary, secondary, outline
  children,
  onClick,
  className = '',
  href,
  target,
  rel,
  type,
  disabled = false
}) {

  const baseStyles = 'px-4 py-2 rounded-md transition-all duration-300 hover:cursor-pointer justify-center align-middle text-center hover:scale-105 hover:shadow-md active:scale-95';

  const variants = {
    primary: `bg-yellow-400 text-gray-900 hover:bg-yellow-500 hover:text-white font-bold`,
    secondary: `bg-gray-800 dark:bg-gray-700 text-white hover:bg-yellow-500 hover:text-white font-medium`,
    outline: `border-2 border-gray-800 dark:border-gray-300 text-gray-800 dark:text-gray-300 font-medium hover:border-yellow-500 hover:text-yellow-500 dark:hover:border-yellow-400 dark:hover:text-yellow-400`
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}