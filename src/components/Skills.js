import React from "react";
import personalData from "../config/personalData";
import {
  // Frontend
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiGatsby,
  // Backend  
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFlask,
  SiIcloud,
  SiPostgresql,
  SiGraphql,
  // Cloud & DevOps
  SiAmazonaws,
  SiAwslambda,
  SiAmazons3,
  SiCloudways,
  SiAmazondynamodb,
  SiDocker,
  SiGithubactions,
  SiGit,
  // Testing & Debugging
  SiJunit5,
  SiPostman,
  SiPytest,
  // Design & User Experience
  SiFigma,
  // Other Tools & Skills
  SiGoogleanalytics,
  SiWebpack,
} from "react-icons/si";

// Icon mapping for skills
const skillIcons = {
  // Frontend
  "React": <SiReact className="text-[#61DAFB]" />,
  "JavaScript": <SiJavascript className="text-[#F7DF1E]" />,
  "TypeScript": <SiTypescript className="text-[#3178C6]" />,
  "Next.js": <SiNextdotjs className="text-[#000000] dark:text-[#FFFFFF]" />,
  "Gatsby.js": <SiGatsby className="text-[#663399]" />,
  // Backend
  "Node.js": <SiNodedotjs className="text-[#339933]" />,
  "Express.js": <SiExpress className="text-[#000000] dark:text-[#FFFFFF]" />,
  "Python": <SiPython className="text-[#3776AB]" />,
  "Flask": <SiFlask className="text-[#000000] dark:text-[#FFFFFF]" />,
  "REST APIs": <SiIcloud className="text-[#007AFF]" />,
  "PostgreSQL": <SiPostgresql className="text-[#336791]" />,
  "GraphQL": <SiGraphql className="text-[#E14658]" />,

  // // Cloud & DevOps
  "AWS": <SiAmazonaws className="text-[#FF9900]" />,
  "AWS Lambda": <SiAwslambda className="text-[#FF9900]" />,
  "S3": <SiAmazons3 className="text-[#FF9900]" />,
  "CloudFront": <SiCloudways className="text-[#FF9900]" />,
  "DynamoDB": <SiAmazondynamodb className="text-[#007AFF]" />,
  "Docker": <SiDocker className="text-[#2496ED]" />,
  "CI/CD": <SiGithubactions className="text-[#24292E] dark:text-[#FFFFFF]" />,
  "GitHub Actions": <SiGithubactions className="text-[#24292E] dark:text-[#FFFFFF]" />,
  "Git": <SiGit className="text-[#F05032]" />,
  
  // Testing & Debugging
  "JUnit": <SiJunit5 className="text-[#FF0000]" />,
  "Integration Testing": <SiPostman className="text-[#FF9900]" />,
  "Unit Testing": <SiPytest className="text-[#000000] dark:text-[#FFFFFF]" />,  

  // // Design & User Experience
  "Figma": <SiFigma className="text-[#F24E1E]" />,

  // // Other Tools & Skills
  "Google Analytics": <SiGoogleanalytics className="text-[#FFCC00]" />,
  "Webpack": <SiWebpack className="text-[#8ED6FB]" />,
};

export default function Skills() {
  const { theme, skills } = personalData;

  return (
    <section className="flex flex-col w-full px-2 justify-center mt-12 mb-24">
      <div className="lg:w-4/5 mx-auto max-w-5xl">
        <h2
          className={`${theme.fonts.body} text-4xl font-bold text-center mx-auto text-gray-800 dark:text-gray-200 mb-4`}
        >
          {skills.title}
        </h2>
        <p
          className={`${theme.fonts.body} text-lg text-center text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto`}
        >
          Here are some of the languages, frameworks, and tools I use most
          often:
        </p>
        <div className="flex flex-col gap-8">
          {skills.categories.map((category) => (
            <div key={category.name}>
              <h3
                className={`${theme.fonts.body} text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3`}
              >
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <span className="text-lg">
                      {skillIcons[skill] || (
                        <span className="w-4 h-4 bg-gray-400 rounded-full inline-block"></span>
                      )}
                    </span>
                    <span
                      className={`${theme.fonts.body} text-sm font-medium text-gray-700 dark:text-gray-300`}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
