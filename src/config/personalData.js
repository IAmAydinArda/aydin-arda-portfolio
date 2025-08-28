// TechFi images
import techfiLogo from "../assets/images/techfi-logo.svg"
import techfiLanding from "../assets/images/techfi-landing.png"
import techfiDesign from "../assets/images/techfi-design.png"
import techfiPricing from "../assets/images/techfi-pricing.png"
import techfiServices from "../assets/images/techfi-services.png"

// Youtube Analyzer images
import youtubeAnalyzerThumbnail from "../assets/images/youtubeanalyzer-tumbnail.png"
import extension from "../assets/images/youtubeanalyzer-extension.png"
import website from "../assets/images/youtubeanalyzer-landing.png"
import colorPalette from "../assets/images/color_palette.png"
import logo from "../assets/images/youtubeanalyzer-logo.jpg"

const personalData = {
  // Basic Information
  name: "Aydin Arda Yalcin",
  title: "Software Developer",
  email: "aydinardayalcin@gmail.com",
  location: "Toronto",
  bio: "Passionate builder with a focus on full-stack development.\nCurious about scalable solutions, user experience, and continuous learning.",
  // resumeUrl: "/ArdaYalcinResume.pdf", // In public folder.
  // Social Media Links
  socials: {
    linkedin: "https://www.linkedin.com/in/aydinardayalcin",
    github: "https://github.com/IAmAydinArda",
    // medium: "https://medium.com/@",
    // twitter: "https://x.com/",
  },

  // Contact Form
  // contactForm: {
  //   formspreeEndpoint: "https://formsubmit.co/aydinardayalcin@gmail.com",
  //   title: "Get in Touch",
  // },

  // Theme Configuration
  theme: {
    colors: {
      primary: "gray-800",
      secondary: "yellow-400",
      accent: "yellow-500",
      background: "gray-50",
      text: "gray-900",
      button: "yellow-400",
      buttonText: "white",
      buttonHover: "yellow-500",
      buttonTextHover: "white",
    },
    fonts: {
      heading: "font-nyata",
      body: "font-sans",
    }
  },

  // Skills
  skills: {
    title: "Skills & Technologies",
    categories: [
      {
        name: "Frontend",
        items: ["React", "JavaScript", "TypeScript", "Next.js", "Gatsby.js"]
      },
      {
        name: "Backend",
        items: ["Node.js", "Express.js", "Python", "Flask", "REST APIs", "PostgreSQL", "GraphQL"]
      },
      {
        name: "Cloud & DevOps",
        items: ["AWS", "AWS Lambda", "S3", "CloudFront", "DynamoDB", "Docker", "CI/CD", "GitHub Actions", "Git"]
      },
      {
        name: "Testing & Debugging",
        items: ["JUnit", "Integration Testing", "Unit Testing"]
      },
      {
        name: "Design & User Experience",
        items: ["Figma"]
      },
      {
        name: "Other Tools & Skills",
        items: ["Google Analytics", "Webpack"]
      }
    ]
  },

  // Projects
  projects: {
    title: "Projects",
    description: "Here are some of the projects I've worked on.",
    items: [
      {
        id: "techfi-work-project",
        url: "/projects/techfi",
        imgURL: techfiLogo,
        alt: "Techfi logo",
        title: "Techfi",
        desc: "A subscription-based platform built with modern web technologies to deliver scalable, secure, and user-focused applications.",
        subtitles: ["React", "Tailwind CSS", "Gatsby", "AWS", "Node.js"],
        category: "work",
        websiteLink: "https://techfi.ca",
        locked: false,
        details: {
          contribution: [
            "Full-Stack Development",
            "Backend Development",
            "Frontend Development",
            "Cloud & DevOps"
          ],
          technologies: [
            "React",
            "Tailwind CSS",
            "Gatsby.js",
            "TypeScript",
            "Node.js / Express",
            "Python Flask",
            "PostgreSQL",
            "Stripe API",
            "Google SSO",
            "SendGrid",
            "AWS Lambda",
            "AWS S3",
            "CloudFront",
            "Docker",
            "GitHub Actions",
            "Figma"
          ],
          timeline: "Feb 2023 – Nov 2024",
          challenges: [
            "Designing scalable backend services with serverless architecture",
            "Implementing secure authentication and payment integrations",
            "Optimizing database queries and content delivery for performance",
            "Developing reusable UI components from Figma mockups"
          ],
          achievements: [
            "Boosted website traffic by 78% through SEO optimizations",
            "Reduced release times by 40% with Docker + GitHub Actions CI/CD pipelines",
            "Built responsive UIs and interactive 3D animations, enhancing user engagement",
            "Delivered fast global content delivery with AWS S3 + CloudFront"
          ],
          images: [
            { src: techfiLanding, alt: "Techfi landing page", caption: "Landing page with clear value proposition" },
            { src: techfiDesign, alt: "Techfi website design", caption: "Clean and intuitive design" },
            { src: techfiPricing, alt: "Techfi Pricing section", caption: "Subscription-based pricing page" },
            { src: techfiServices, alt: "Techfi Services page", caption: "Overview of Techfi services" }
          ]
        }
      },
      {
        id: "youtube-analyzer-project",
        url: "/projects/youtubeanalyzer",
        imgURL: youtubeAnalyzerThumbnail,
        alt: "Youtube Analyzer extension image",
        title: "Youtube Analyzer - Video Summarizer",
        desc: "Don't have time to watch the whole video, let Youtube Analyzer summarize it for you.",
        subtitles: ["React", "Typescript", "Product Design"],
        category: "personal",
        websiteLink: "https://youtubeanalyzer.tech",
        appLink: "https://chrome.google.com/webstore/detail/youtube-analyzer/oefncahpjhmbhahohenajofmeleahjen",
        locked: false,
        lockedPassword: "example",
        details: {
          contribution: [
            "Full-stack Development",
            "Browser Extension Development",
            "AI Integration",
            "UI/UX Design"
          ],
          technologies: [
            "React",
            "TypeScript",
            "Python",
            "OpenAI API",
            "Chrome Extension API",
            "Gatsby"
          ],
          timeline: "Aug 2022 - Aug 2023",
          challenges: [
            "Integrating AI summarization with YouTube's dynamic content",
            "Building cross-platform browser extension",
            "Handling video transcript processing at scale"
          ],
          achievements: [
            "Reached 400+ active users within a month",
            "Achieved 5 star rating on Chrome Web Store",
            "Processed 10K+ video summaries with 92% accuracy",
            "Featured in ProductHunt's top products of the day"
          ],
          images: [
            { src: extension, alt: 'Chrome extension interface', caption: 'Clean and intuitive extension design' },
            { src: website, alt: 'Project website', caption: 'Landing page with clear value proposition' },
            { src: colorPalette, alt: 'Brand color palette', caption: 'YouTube-inspired color scheme' },
            { src: logo, alt: 'YouTube Analyzer logo', caption: 'Brand identity and logo design' }
          ]
        }
      }
    ]
  },

  // Writing/Articles
  writing: {
    title: "Writing",
    description: "Thoughts on technology, career, and building things that matter.",
    articles: [
      {
        id: "about-me",
        title: "About Me",
        description: "Get to know me better as I share my thoughts on the future of technology.",
        platform: "LinkedIn",
        publishedDate: "2025-08-26",
        readTime: "1 min read",
        url: "https://www.linkedin.com/in/aydinardayalcin/",
        tags: ["About Me", "Career"]
      },
      {
        id: "about-me-2",
        title: "About Me 2",
        description: "Get to know me better as I share my thoughts on the future of technology.",
        platform: "LinkedIn",
        publishedDate: "2025-08-26",
        readTime: "1 min read",
        url: "https://www.linkedin.com/in/aydinardayalcin/",
        tags: ["About Me", "Career"]
      },
    ]
  },

};

export default personalData;