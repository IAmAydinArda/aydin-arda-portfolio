import React from 'react'
import ProjectTemplate from '../ProjectTemplate';
import coverImage from "../../assets/images/youtubeanalyzer-logo.jpg"
import colorPalette from "../../assets/images/color_palette.png"
import extension from "../../assets/images/youtubeanalyzer-extension.png"
import logo from "../../assets/images/youtubeanalyzer-logo.jpg"
import website from "../../assets/images/youtubeanalyzer-landing.png"

export default function YoutubeAnalyzer() {
  const sectionsData = [
    {
      title: "The Project Details",
      content: "Beyond its self-explanatory name, this extension stands as a testament to innovation and user-centric design. It offers users a concise understanding of video content and the community's perspective, all within a user-friendly interface."
    },
    {
      title: "Contributions",
      subsections: [
        {
          title: "Website & Extension Design",
          content: "To educate potential users about the extension's benefits and its two pivotal features, I adopted a minimalist design strategy, ensuring that the interface was intuitive and the message clear.",
          images: [
            { src: extension, alt: 'extension interface' },
            { src: website, alt: 'full website' }
          ]
        },
        {
          title: "Branding",
          content: "To create a recognizable and relatable brand identity, drawing inspiration from YouTube's iconic color palette, I designed a logo that was both simple for instant recognition and unique in its style.",
          images: [
            { src: colorPalette, alt: 'color palette' },
            { src: logo, alt: 'youtube analyzer logo' }
          ]
        },
        {
          title: "Front-End Development",
          content: "To translate the design into a functional, responsive website, despite my reservations, I opted for MUI for its development efficiency. Throughout the process, I emphasized responsiveness to ensure optimal user experience across devices."
        }
      ]
    },
    {
      title: "Challenges Faced",
      subsections: [
        {
          title: "Project Management",
          content: "The absence of a structured task management system led to confusion and inefficiencies. Recognizing the need for organization, we soon realized that even small teams benefit from task management tools."
        },
        {
          title: "Scope Creep",
          content: "Our enthusiasm often led us to add features prematurely, resulting in time losses and moments of demotivation. A strategic step back allowed us to define our Minimum Viable Product (MVP) and refocus our efforts on essential features."
        },
        {
          title: "Procrastination",
          content: "Like many, we faced the universal challenge of procrastination. Implementing strict deadlines and holding weekly progress meetings instilled a sense of accountability. The potential embarrassment of not showcasing progress became a driving force."
        }
      ]
    },
    {
      title: "Takeaways",
      subsections: [
        {
          title: "Prioritize and Focus",
          content: "Regardless of team size, a structured task management system is invaluable."
        },
        {
          title: "Trust the Process",
          content: "Challenges are inevitable. Instead of succumbing to stress, it's crucial to believe in the journey, address issues head-on, and keep moving forward."
        }
      ]
    }
  ];

  return (
    <ProjectTemplate
      title="Youtube Analyzer"
      subtitle="Skip the fluff, get to the point."
      coverImage={coverImage}
      coverAlt="youtube analyzer cover"
      projectId="youtube-analyzer-project"
      actionButton={{
        text: "Go to Website",
        href: "https://youtubeanalyzer.tech",
        variant: "secondary"
      }}
      sections={sectionsData}
    />
  );
}