import React, { useState } from "react";
import personalData from "../config/personalData";

// Platform icons
const PlatformIcon = ({ platform }) => {
  const iconClass = "w-5 h-5";
  
  switch (platform.toLowerCase()) {
    case 'medium':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      );
  }
};

const ArticleCard = ({ article }) => {
  const { theme } = personalData;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getPlatformColor = (platform) => {
    switch (platform.toLowerCase()) {
      case 'medium':
        return 'text-gray-700 dark:text-gray-300';
      case 'linkedin':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <article className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
      <a 
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center gap-2 ${getPlatformColor(article.platform)}`}>
            <PlatformIcon platform={article.platform} />
            <span className={`${theme.fonts.body} text-sm font-medium`}>
              {article.platform}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{formatDate(article.publishedDate)}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className={`${theme.fonts.heading} text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-yellow-500 transition-colors duration-200`}>
            {article.title}
          </h3>
          <p className={`${theme.fonts.body} text-gray-700 dark:text-gray-300 leading-relaxed`}>
            {article.description}
          </p>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </a>
    </article>
  );
};

export default function Writing() {
  const { writing, theme } = personalData;
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  // Get unique platforms
  const platforms = ["all", ...new Set(writing.articles.map(article => article.platform.toLowerCase()))];

  // Filter articles by platform
  const filteredArticles = writing.articles.filter(article => 
    selectedPlatform === "all" || article.platform.toLowerCase() === selectedPlatform
  );

  return (
    <main className="flex flex-col max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`${theme.fonts.heading} text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4`}>
          {writing.title}
        </h1>
        <p className={`${theme.fonts.body} text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
          {writing.description}
        </p>
      </div>

      {/* Platform Filter */}
      {platforms.length > 2 && (
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedPlatform === platform
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {platform === "all" ? "All" : platform.charAt(0).toUpperCase() + platform.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className={`${theme.fonts.heading} text-xl font-medium text-gray-900 dark:text-gray-100 mb-2`}>
            No articles yet
          </h3>
          <p className={`${theme.fonts.body} text-gray-600 dark:text-gray-400`}>
            {/* Articles will appear here once they're added to the configuration. */}
          </p>
        </div>
      )}

    </main>
  );
}