import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import personalData from '../config/personalData';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiFigma,
  SiAngular,
  SiPython,
  SiAmazonaws,
  SiGraphql,
  SiGatsby,
  SiOpenai,
  SiGooglechrome,
  SiPostgresql,
  SiStripe,
  SiGoogle,
  SiSendinblue,
  SiDocker,
  SiGithubactions,
  SiFlask,
} from 'react-icons/si';

export default function ProjectModal({ project, isOpen, onClose }) {
  const { theme } = personalData;
  const [selectedImage, setSelectedImage] = useState(null);
  const techIcons = {
    'React': <SiReact className="text-[#61DAFB]" />,
    'Next.js': <SiNextdotjs className="text-[#000000] dark:text-[#FFFFFF]" />,
    'Tailwind CSS': <SiTailwindcss className="text-[#06B6D4]" />,
    'Javascript': <SiJavascript className="text-[#F7DF1E]" />,
    'Typescript': <SiTypescript className="text-[#3178C6]" />,
    'TypeScript': <SiTypescript className="text-[#3178C6]" />,
    'Node.js': <SiNodedotjs className="text-[#339933]" />,
    'Node.js / Express': (
      <span className="flex items-center gap-1">
        <SiNodedotjs className="text-[#339933]" />
        <SiExpress className="text-[#000000] dark:text-[#FFFFFF]" />
      </span>
    ),
    'Express': <SiExpress className="text-[#000000] dark:text-[#FFFFFF]" />,
    'Figma': <SiFigma className="text-[#F24E1E]" />,
    'Angular': <SiAngular className="text-[#DD0031]" />,
    'Python': <SiPython className="text-[#3776AB]" />,
    'Python Flask': <SiFlask className="text-[#000000] dark:text-[#FFFFFF]" />,
    'Amazon AWS': <SiAmazonaws className="text-[#232F3E]" />,
    'AWS Lambda': <SiAmazonaws className="text-[#FF9900]" />,
    'AWS S3': <SiAmazonaws className="text-[#569A31]" />,
    'CloudFront': <SiAmazonaws className="text-[#FF9900]" />,
    'GraphQL': <SiGraphql className="text-[#E10098]" />,
    'Gatsby': <SiGatsby className="text-[#639]" />,
    'Gatsby.js': <SiGatsby className="text-[#639]" />,
    'OpenAI API': <SiOpenai className="text-[#000000] dark:text-[#FFFFFF]" />,
    'Chrome Extension API': <SiGooglechrome className="text-[#4285F4]" />,
    'PostgreSQL': <SiPostgresql className="text-[#336791]" />,
    'Stripe API': <SiStripe className="text-[#635BFF]" />,
    'Google SSO': <SiGoogle className="text-[#4285F4]" />,
    'SendGrid': <SiSendinblue className="text-[#1A82E2]" />,
    'Docker': <SiDocker className="text-[#2496ED]" />,
    'GitHub Actions': <SiGithubactions className="text-[#2088FF]" />,
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1 mr-4">
            <h2 className={`${theme.fonts.heading} text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2`}>
              {project.title}
            </h2>
            <p className={`${theme.fonts.body} text-gray-600 dark:text-gray-400`}>
              {project.desc}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Project Image */}
          <div className="mb-8">
            <div className="bg-gray-400 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={project.imgURL} 
                alt={project.alt} 
                className="w-full h-64 object-contain"
              />
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className={`${theme.fonts.heading} text-lg font-medium text-gray-900 dark:text-gray-100 mb-3`}>
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.subtitles.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Details */}
          {project.details && (
            <div className="space-y-6">
              {/* Contribution */}
              {project.details.contribution && (
                <div>
                  <h3 className={`${theme.fonts.heading} text-lg font-medium text-gray-900 dark:text-gray-100 mb-3`}>
                    My Contribution
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {project.details.contribution.map((item, index) => (
                      <li key={index} className={`${theme.fonts.body} text-gray-700 dark:text-gray-300`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies Used */}
              {Array.isArray(project.details.technologies) && project.details.technologies.length > 0 && (
                <div>
                  <h3 className={`${theme.fonts.heading} text-lg font-medium text-gray-900 dark:text-gray-100 mb-3`}>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.details.technologies.map((techName, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                      >
                        <span className="text-base">
                          {techIcons[techName] || techIcons[techName?.replace(' / ', ' ')] || null}
                        </span>
                        <span className={theme.fonts.body}>
                          {techName}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              {project.details.timeline && (
                <div>
                  <h3 className={`${theme.fonts.heading} text-lg font-medium text-gray-900 dark:text-gray-100 mb-3`}>
                    Timeline
                  </h3>
                  <p className={`${theme.fonts.body} text-gray-700 dark:text-gray-300`}>
                    {project.details.timeline}
                  </p>
                </div>
              )}

              {/* Challenges */}
              {project.details.challenges && (
                <div>
                  <h3 className={`${theme.fonts.heading} text-lg font-medium text-gray-900 dark:text-gray-100 mb-3`}>
                    Challenges
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {project.details.challenges.map((challenge, index) => (
                      <li key={index} className={`${theme.fonts.body} text-gray-700 dark:text-gray-300`}>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project Images */}
              {project.details.images && (
                <div>
                  <h3 className={`${theme.fonts.heading} text-lg font-medium text-gray-900 dark:text-gray-100 mb-3`}>
                    Project Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.details.images.map((image, index) => (
                      <div key={index} className="cursor-pointer group">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            onClick={() => setSelectedImage(image)}
                          />
                        </div>
                        {image.caption && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                            {image.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {project.details.achievements && (
                <div>
                  <h3 className={`${theme.fonts.heading} text-lg font-medium text-gray-900 dark:text-gray-100 mb-3`}>
                    Key Achievements
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {project.details.achievements.map((achievement, index) => (
                      <li key={index} className={`${theme.fonts.body} text-gray-700 dark:text-gray-300`}>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            {project.websiteLink && (
              <Button
                variant="secondary"
                href={project.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </Button>
            )}
            {project.appLink && (
              <Button
                variant="outline"
                href={project.appLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Extension
              </Button>
            )}
            <Button
              variant="primary"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
      
      {/* Image Preview Modal */}
      {selectedImage && createPortal(
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close image preview"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            {selectedImage.caption && (
              <p className="text-white text-center mt-4 text-lg">
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>,
    document.body
  );
}