import React from 'react';
import ProjectDetails from '../components/ProjectDetails';
import CollapsibleSection from '../components/CollapsibleSection';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';

export default function ProjectTemplate({
  // Header props
  title,
  subtitle,
  coverImage,
  coverAlt,
  projectId,
  actionButton,

  // TL;DR section (optional)
  tldr,

  // Problem/Objective/Solution cubes (optional)
  cubesSection,

  // Main content sections
  sections = []
}) {

  const handleClickScroll = () => {
    const element = document.getElementById('visuals');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/#projects' },
    { label: title }
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex flex-col max-w-6xl mx-auto gap-12 pt-16 pb-24 px-4 sm:px-6 lg:px-8'>
        <Breadcrumb items={breadcrumbItems} />
        {/* Header Section */}
        <div className='flex flex-col gap-8'>
          <div className={`flex flex-col ${actionButton ? 'sm:flex-row' : ''} gap-4 mx-4 sm:mx-8 justify-between`}>
            <div className={`flex flex-col gap-1 mx-auto sm:mx-12 lg:mx-0 ${actionButton ? 'sm:w-3/5' : ''}`}>
              <h1 className='font-regular text-4xl text-gray-800 dark:text-gray-100 text-center sm:text-left'>{title}</h1>
              <h2 className='font-light text-2xl text-gray-600 dark:text-gray-400 text-center sm:text-left'>{subtitle}</h2>
            </div>
            {actionButton && (
              <div className='flex justify-center sm:justify-end mx-auto sm:mx-0 align-middle my-auto'>
                <Button
                  variant={actionButton.variant || 'secondary'}
                  href={actionButton.href}
                  target={actionButton.target}
                >
                  {actionButton.text}
                </Button>
              </div>
            )}
          </div>
          <div className='h-96 md:overflow-hidden lg:rounded-xl mx-4 sm:mx-0'>
            <img
              className={`w-full h-full bg-cover object-cover ${actionButton ? 'bg-top' : 'bg-top md:-mt-14'}`}
              src={coverImage}
              alt={coverAlt}
            />
          </div>
          <div className='mx-4 sm:mx-8 lg:mx-0'>
            <ProjectDetails projectId={projectId} />
          </div>
        </div>

        {/* TL;DR Section (Optional) */}
        {tldr && (
          <div className='flex flex-col p-8 border-2 mx-4 lg:mx-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded'>
            <h4 className='font-semibold text-xl mb-2 text-gray-900 dark:text-gray-100'>TL;DR</h4>
            <p className='text-lg font-light text-gray-700 dark:text-gray-300'>{tldr.content}</p>
            {tldr.showVisualsButton && (
              <div className='flex justify-end mt-4'>
                <button
                  onClick={handleClickScroll}
                  className='border border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200'
                >
                  I do not care, show me the visuals
                </button>
              </div>
            )}
          </div>
        )}

        {/* Problem/Objective/Solution Cubes Section (Optional) */}
        {cubesSection && (
          <div className='flex flex-col gap-12 lg:flex-row mx-4 lg:mx-0'>
            {cubesSection.map((cube, index) => (
              <div key={index} className='w-3/4 md:w-1/2 mx-auto flex flex-col sm:w-1/4'>
                <img className='w-28 mb-2 mx-auto sm:w-36 lg:w-24' src={cube.image} alt={cube.alt} />
                <h4 className='font-semibold text-xl text-blue-500 dark:text-blue-400 mb-3 text-center'>{cube.title}</h4>
                <p className='text-lg lg:text-md font-light text-center text-gray-700 dark:text-gray-300'>{cube.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Body Sections */}
        <div className='flex flex-col gap-12 mx-4 sm:mx-8 lg:mx-0 mb-16'>
          {sections.map((section, index) => (
            <CollapsibleSection key={index} title={section.title}>
              {section.content && <p className='text-lg font-light text-gray-700 dark:text-gray-300'>{section.content}</p>}

              {/* Render subsections if they exist */}
              {section.subsections && (
                <div className='flex flex-col gap-4'>
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className={subsection.id ? `relative` : ''} id={subsection.id || ''}>
                      <CollapsibleSection title={subsection.title} level={3}>
                        <p className='text-lg font-light text-gray-700 dark:text-gray-300'>{subsection.content}</p>

                        {/* Render images if they exist */}
                        {subsection.images && (
                          <div className={`flex ${subsection.images.length > 1 ? 'h-96 w-full overflow-hidden gap-8' : 'flex-col w-full gap-20'}`}>
                            {subsection.images.map((image, imgIndex) => (
                              <div key={imgIndex} className={subsection.images.length > 1 ? 'w-1/2 h-full' : 'w-full'}>
                                {image.preText && (
                                  <p className='text-lg font-light mt-4 -mb-10 text-gray-700 dark:text-gray-300'>{image.preText}</p>
                                )}
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className={`w-full ${subsection.images.length > 1 ? 'h-96 object-contain mx-auto' : ''} cursor-pointer hover:scale-105 transition-transform duration-300`}
                                />
                                {image.caption && (
                                  <p className='text-sm font-light text-center text-gray-400 dark:text-gray-500 mb-8 mt-2'>{image.caption}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </CollapsibleSection>
                    </div>
                  ))}
                </div>
              )}
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </div>
  );
}