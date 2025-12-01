import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import PasswordPrompt from './PasswordPrompt'
import ProjectModal from './ProjectModal'
import ReactGA from 'react-ga4';
import personalData from '../config/personalData';
import Button from './Button';
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript, SiNodedotjs,
  SiExpress, SiFigma, SiAngular, SiPython, SiAmazonaws, SiGraphql, SiGatsby, SiOpenai
} from 'react-icons/si';

export default function ProjectCard({ url, imgURL, alt, title, desc, subtitles, websiteLink, appLink, locked, lockedPassword, category, details, index = 0, ...project }) {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const { theme } = personalData;

  // Technology icons mapping
  const techIcons = {
    'React': <SiReact className="text-[#61DAFB]" />,
    'Next.js': <SiNextdotjs className="text-[#000000] dark:text-[#FFFFFF]" />,
    'Tailwind CSS': <SiTailwindcss className="text-[#06B6D4]" />,
    'Javascript': <SiJavascript className="text-[#F7DF1E]" />,
    'Typescript': <SiTypescript className="text-[#3178C6]" />,
    'Node.js': <SiNodedotjs className="text-[#339933]" />,
    'Express.js': <SiExpress className="text-[#000000] dark:text-[#FFFFFF]" />,
    'Angular': <SiAngular className="text-[#DD0031]" />,
    'Python': <SiPython className="text-[#3776AB]" />,
    'AWS': <SiAmazonaws className="text-[#FF9900]" />,
    'GraphQL': <SiGraphql className="text-[#E10098]" />,
    'Gatsby': <SiGatsby className="text-[#663399]" />,
    'OpenAI API': <SiOpenai className="text-[#412991]" />,
    'Ag Grid': <span className="w-4 h-4 bg-blue-500 rounded-sm"></span>,
    'Component Library': <SiReact className="text-[#61DAFB]" />,
    'Product Design': <SiFigma className="text-[#F24E1E]" />
  };

  const handleClick = (event) => {
    event.preventDefault();
    ReactGA.event({
      category: 'Project Card',
      action: 'Click',
      label: title
    });
    if (locked) {
      setShowPasswordPrompt(true);
    } else {
      setShowProjectModal(true);
    }
  }

  const handlePasswordSuccess = () => {
    setShowPasswordPrompt(false);
    setShowProjectModal(true);
  }

  const handlePasswordClose = () => {
    setShowPasswordPrompt(false);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  }

  return (
    <>
      <article
        className={`mx-auto w-full max-w-sm sm:max-w-md min-[640px]:max-w-4xl group hover:shadow-xl hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 rounded-[16px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <button
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-label={`View project: ${title}`}
          className="w-full text-left"
        >
          <div className='flex flex-col min-[640px]:flex-row w-full gap-3 sm:gap-4 md:gap-6' >
            {/* Image Container with Aspect Ratio */}
            <div className='w-full min-[640px]:w-48 lg:w-56 xl:w-64 flex-shrink-0'>
              <div className='aspect-[664/576] bg-gray-500 dark:bg-gray-800 rounded-[8px] md:rounded-[12px] overflow-hidden group-hover:shadow-md transition-shadow duration-300'>
                <img 
                  src={imgURL} 
                  alt={alt} 
                  className='object-contain w-full h-full transition-transform duration-500' 
                />
              </div>
            </div>

            {/* Content Container */}
            <div className='flex flex-col flex-1 justify-between min-w-0'>
              <div className='flex flex-col gap-1 sm:gap-2 md:gap-3'>
                {/* Title - Below image on small screens, next to image on larger screens */}
                <h2 className={`${theme.fonts.heading} block text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-purple-500 transition-colors duration-300 line-clamp-2`}>
                  {title}
                </h2>
                
                {/* Description - Hidden until 640px */}
                <p className={`${theme.fonts.body} hidden min-[640px]:block text-xs sm:text-sm md:text-base font-normal text-gray-700 dark:text-gray-300 transition-colors duration-200 line-clamp-2 min-[640px]:line-clamp-3`}>
                  {desc}
                </p>
                
                {/* Technology Chips - Below image on small screens, next to image on larger screens */}
                <div className='flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4'>
                  {subtitles.map((subtitle, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 sm:gap-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2 sm:px-2.5 py-1 rounded-full shadow-sm"
                    >
                      <span className="text-xs">
                        {techIcons[subtitle] || <span className="w-3 h-3 bg-gray-400 rounded-full"></span>}
                      </span>
                      <span className={`${theme.fonts.body} text-xs font-medium text-gray-700 dark:text-gray-300`}>
                        {subtitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className='flex flex-col min-[320px]:flex-row gap-2 sm:gap-3 mt-2 sm:mt-4'>
                {appLink && (
                  <Button
                    variant="secondary"
                    href={appLink}
                    className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 flex-1 min-[320px]:flex-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Go to Extension
                  </Button>
                )}
                {websiteLink && (
                  <Button
                    variant="outline"
                    href={websiteLink}
                    className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 flex-1 min-[320px]:flex-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Go to Website
                  </Button>
                )}
              </div>
            </div>
          </div>
        </button>
      </article>

      {showPasswordPrompt && createPortal(
        <PasswordPrompt
          correctPassword={lockedPassword}
          onSuccess={handlePasswordSuccess}
          onClose={handlePasswordClose}
        />,
        document.body
      )}

      <ProjectModal
        project={{
          url,
          imgURL,
          alt,
          title,
          desc,
          subtitles,
          websiteLink,
          appLink,
          category,
          details,
          ...project
        }}
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
      />
    </>
  )
}
