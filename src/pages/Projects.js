import React, { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import personalData from "../config/personalData";

export default function Projects() {
  const { projects, theme } = personalData;
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projects.items.filter((project) => {
    if (activeFilter === "all") return true;
    return project.category === activeFilter;
  });

  const filterOptions = [
    { value: "all", label: "All Projects" },
    { value: "work", label: "Work Projects" },
    { value: "personal", label: "Personal Projects" },
  ];

  return (
    <main className="flex flex-col max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`${theme.fonts.heading} text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4`}>
          Projects
        </h1>
        <p className={`${theme.fonts.body} text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
          Explore my work across different domains, from enterprise solutions to personal projects.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === option.value
                  ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <section 
        className="flex flex-col gap-8 max-w-5xl mx-auto w-full"
        aria-label="Portfolio projects"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard {...project} key={project.id || index} index={index} />
        ))}
      </section>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-xl">
            No projects found in this category.
          </p>
        </div>
      )}
    </main>
  );
}