import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import Skills from "../components/Skills";
import personalData from "../config/personalData";
import profileImage from "../assets/images/profile-image.png";
import { ReactComponent as LinkedinIcon } from "../assets/images/linkedin-icon.svg";
import { ReactComponent as GithubIcon } from "../assets/images/github-icon.svg";
import { ReactComponent as EmailIcon } from "../assets/images/email-icon.svg";
// import { ReactComponent as MediumIcon } from "../assets/images/medium-icon.svg";
// import { ReactComponent as XIcon } from "../assets/images/x-icon.svg";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Home() {
  const { name, title, email, location, bio, projects, socials } = personalData;
  const { theme } = personalData;
  const { isDarkMode } = useDarkMode();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [streakLoaded, setStreakLoaded] = useState(false);
  const projectsRef = useRef(null);

  useEffect(() => {
    // Fade in hero section on mount
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Set up intersection observer for projects section
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-8");
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <main className="flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-400 text-black px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        <div
          id="main-content"
          className={`flex flex-col w-full px-2 lg:w-1/2 mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex h-auto w-full mx-auto py-4 pt-8">
            <img
              className="bg-center mx-auto h-60 p-2 transition-transform duration-500 hover:scale-105"
              src={profileImage}
              alt="profile"
            />
          </div>
          <h1
            className={`${theme.fonts.heading} text-center font-medium text-6xl text-gray-900 dark:text-gray-100 mb-4`}
          >
            {name}
          </h1>
          <h2
            className={`${theme.fonts.body} text-2xl lg:w-3/4 mx-auto text-center text-gray-900 dark:text-gray-100 mb-2`}
          >
            {title}
          </h2>
          <div className="flex flex-col px-2 justify-left my-2 mx-auto">
            <div className={`${theme.fonts.body} text-lg text-gray-700 dark:text-gray-300`}>
              Based in {location} 
            </div>
          </div> 
          {/* <h2
            className={`${theme.fonts.body} text-2xl lg:w-3/4 mx-auto text-center text-gray-900 dark:text-gray-100 mb-2`}
          >
            {email}
          </h2> */}
          <div className="flex gap-4 justify-center my-4">
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-110"
            >
              <EmailIcon className="h-6 w-6 fill-current text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-110"
            >
              <LinkedinIcon className="h-6 w-6 fill-current text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200" />
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-110"
            >
              <GithubIcon className="h-6 w-6 fill-current text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200" />
            </a>
            {/* <a
              href={socials.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-110"
            >
              <MediumIcon className="h-6 w-6 fill-current text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200" />
            </a> */}
            {/* <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-110"
            >
              <XIcon className="h-6 w-6 fill-current text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200" />
            </a> */}
          </div>
          <div className="flex w-3/4 justify-center mb-8 mx-auto">
            <div
              className={`${theme.fonts.body} text-lg text-center text-gray-700 dark:text-gray-300 lg:w-4/5 leading-relaxed`}
              style={{ whiteSpace: 'pre-line' }}
            >
              {bio}
            </div>
          </div>
        </div>

        <div className="flex flex-col px-2 justify-left my-2 mx-auto">
          <h2 className={`${theme.fonts.body} text-3xl font-medium text-center text-gray-800 dark:text-gray-200 mb-4`}>
            GitHub Streak
          </h2>
          <div className="flex justify-center">
            {!streakLoaded && (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" style={{ width: '640px', height: '150px' }}>
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
                </div>
              </div>
            )}
            <a href="https://github.com/IAmAydinArda" className={streakLoaded ? '' : 'hidden'}>
              <img
                src={`https://github-readme-streak-stats-chi-amber.vercel.app/?user=IAmAydinArda&hide_border=true&${isDarkMode ? '&theme=ocean-dark&fire=EB5454&dates=FFFFFF&background=00000000' : ''}`}
                alt="GitHub Streak"
                onLoad={() => setStreakLoaded(true)}
                onError={() => setStreakLoaded(true)}
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col max-w-5xl mx-auto px-4 mt-10 pt-10">
          <h2
            className={`${theme.fonts.body} text-5xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8`}
          >
            {projects.title}
          </h2>

          {/* Filter Chips */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "All Projects" },
                { value: "work", label: "Work Projects" },
                { value: "personal", label: "Personal Projects" },
              ].map((option) => (
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
        </div>

        <section
          ref={projectsRef}
          className="flex flex-col gap-8 max-w-5xl mx-auto px-4 mt-6 mb-8 opacity-0 translate-y-8 transition-all duration-1000"
          aria-label="Portfolio projects"
        >
          {(() => {
            const filteredProjects = projects.items.filter((project) => {
              if (activeFilter === "all") return true;
              return project.category === activeFilter;
            });

            // Limit to 3 projects per category
            const limitedProjects = filteredProjects.slice(0, 3);

            return limitedProjects.map((project, index) => (
              <ProjectCard {...project} key={project.id || index} index={index} />
            ));
          })()}
        </section>

        {/* Show All Projects Button */}
        <div className="flex justify-center mb-20">
          <Link
            to="/projects"
            className="px-8 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition-colors duration-200 shadow-md"
          >
            View All Projects
          </Link>
        </div>

        <Skills />
      </main>
    </>
  );
}
