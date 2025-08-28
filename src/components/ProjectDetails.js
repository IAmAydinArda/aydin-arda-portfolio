import React from 'react';
import personalData from '../config/personalData';

export default function ProjectDetails({ projectId }) {
  const project = personalData.projects.items.find(p => p.id === projectId);

  if (!project || !project.details) return null;

  const { contribution, technologies, timeline } = project.details;

  return (
    <div className='flex flex-col mx-8 gap-8 justify-between sm:flex-row md:gap-4 lg:mx-0 border-2 border-gray-200 dark:border-gray-700 p-8 bg-gray-100 dark:bg-gray-800 rounded-xl'>
      <div className='flex flex-col w-full md:text-left md:mx-auto'>
        <h4 className='font-semibold text-xl text-gray-900 dark:text-gray-100'>Contribution</h4>
        <ul className='flex flex-col gap-1'>
          {contribution.map((item, index) => (
            <li key={index} className='text-lg font-light text-gray-700 dark:text-gray-300'>{item}</li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col w-full md:text-center md:ml-20'>
        <h4 className='font-semibold text-xl md:text-left text-gray-900 dark:text-gray-100'>Technologies</h4>
        <ul className='flex flex-col gap-1 md:text-left'>
          {technologies.map((tech, index) => (
            <li key={index} className='text-lg font-light text-gray-700 dark:text-gray-300'>{tech}</li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col w-full md:mx-auto'>
        <h4 className='font-semibold text-xl text-gray-900 dark:text-gray-100'>Timeline</h4>
        <p className='text-lg font-light text-gray-700 dark:text-gray-300'>{timeline}</p>
      </div>
    </div>
  );
}