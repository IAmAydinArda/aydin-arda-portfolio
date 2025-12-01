import React from "react";
import personalData from "../config/personalData";

export default function Now() {
  const { theme } = personalData;

  return (
    <main className="flex flex-col max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`${theme.fonts.heading} text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4`}>
          What I'm Working On
        </h1>
        <p className={`${theme.fonts.body} text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
          This is my{" "}
          <a 
            href="https://nownownow.com/" 
            target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-500 hover:text-purple-600 underline transition-colors duration-200"
          >
            now page
          </a>
          , a quick overview of my current focus and priorities.
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        {/* Location & Education */}
        <section>
          <h2 className={`${theme.fonts.heading} text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4`}>
            Location & Studies
          </h2>
          <p className={`${theme.fonts.body} text-lg text-gray-700 dark:text-gray-300 leading-relaxed`}>
            I’m a Computer Programming student at Georgian College in Ontario, Canada. 
            I recently completed my third academic semester in the four-semester program. 
            This upcoming fall (2025) will be my co-op semester, followed by my final academic term in winter 2026.
          </p>
        </section>

        {/* Current Priorities */}
        <section>
          <h2 className={`${theme.fonts.heading} text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4`}>
            Current Priorities
          </h2>
          <p className={`${theme.fonts.body} text-lg text-gray-700 dark:text-gray-300 leading-relaxed`}>
            My top priority right now is securing a co-op placement where I can apply my full-stack development 
            skills and contribute to impactful projects. At the same time, I’m polishing my backend expertise and 
            building new projects that challenge me to grow as a developer.
          </p>
        </section>

        {/* Projects */}
        <section>
          <h2 className={`${theme.fonts.heading} text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4`}>
            Projects
          </h2>
          <p className={`${theme.fonts.body} text-lg text-gray-700 dark:text-gray-300 leading-relaxed`}>
            I’m currently working on <strong>YouTube Persona AI</strong>, an application that fetches transcripts of YouTube 
            videos to model the unique persona of creators. With the approval and partnership of the YouTuber, the system 
            allows fans to interact with AI versions of their favorite creators via WhatsApp and Telegram, using ChatGPT 
            to generate natural, conversational responses in real time.
          </p>
        </section>

        {/* Personal Development */}
        <section>
          <h2 className={`${theme.fonts.heading} text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4`}>
            Personal Development
          </h2>
          <p className={`${theme.fonts.body} text-lg text-gray-700 dark:text-gray-300 leading-relaxed`}>
            Outside of academics and projects, I’m focused on maintaining balance through regular workouts and 
            reading. I’m especially interested in technology, software engineering practices, and how AI is shaping 
            the future of work and creativity.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className={`${theme.fonts.body} text-sm text-gray-500 dark:text-gray-400 text-center`}>
          Last updated: August 2025
        </p>
        <p className={`${theme.fonts.body} text-sm text-gray-500 dark:text-gray-400 text-center mt-2`}>
          This is a now page, inspired by{" "}
          <a 
            href="https://sivers.org/nowff" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-purple-600 underline transition-colors duration-200"
          >
            Derek Sivers
          </a>
          . Check out{" "}
          <a 
            href="https://nownownow.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-purple-600 underline transition-colors duration-200"
          >
            other now pages
          </a>
          .
        </p>
      </div>
    </main>
  );
}
