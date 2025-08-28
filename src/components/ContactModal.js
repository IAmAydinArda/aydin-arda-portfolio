import React, { useEffect, useRef } from 'react';
import personalData from '../config/personalData';

export default function ContactModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the first input when modal opens
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }

      // Trap focus within modal
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }

        if (e.key === 'Tab') {
          const modal = modalRef.current;
          if (!modal) return;

          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { formspreeEndpoint, title } = personalData.contactForm;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full m-4 relative animate-scale-in transform transition-all duration-300 hover:shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 hover:scale-110 hover:rotate-90"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">{title}</h2>

        <form
          action={formspreeEndpoint}
          method="POST"
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              ref={firstInputRef}
              type="text"
              name="name"
              id="name"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-200 focus:scale-105"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-200 focus:scale-105"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-200 focus:scale-105"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}