# Minimal Portfolio

A modern, customizable portfolio website built with React and Tailwind CSS.

## Quick Start

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Customize your portfolio by editing `src/config/personalData.js`
4. Run the development server:
   ```bash
   npm start
   ```

## Customization Guide

### 1. Personal Information
Navigate to `src/config/personalData.js` and update the following sections:

#### Basic Information
- `name`: Your full name
- `title`: Your professional title
- `email`: Your contact email
- `location`: Your location
- `bio`: Your professional bio

#### Social Media
Update the `socials` object with your social media links. You can add or remove social media platforms as needed.

#### Projects
Add your projects to the `projects.items` array in `src/config/personalData.js`.

Each project supports the following fields:
- `id` (string): Unique identifier (kebab-case recommended)
- `url` (string): Internal route to the project detail page (e.g., `/projects/techfi`)
- `imgURL` (import/string): Thumbnail image shown on cards
- `alt` (string): Alt text for the thumbnail
- `title` (string): Project name
- `desc` (string): Short description shown on the card
- `subtitles` (string[]): Short tech/role labels shown as chips
- `category` ("work" | "personal"): Used for filtering
- `websiteLink` (string, optional): Public website/landing page
- `appLink` (string, optional): App/Store/Extension link
- `locked` (boolean, optional): If true, detail page is gated
- `lockedPassword` (string, optional): Password used when `locked` is true
- `details` (object): Extended content for the detail page
  - `contribution` (string[]): Your roles/responsibilities
  - `technologies` (string[]): Tech stack used
  - `timeline` (string): Time period
  - `challenges` (string[]): Key challenges tackled
  - `achievements` (string[]): Outcomes/impact/metrics
  - `images` ({ src, alt, caption }[]): Gallery images for the project

Minimal example:
```js
{
  id: "my-project",
  url: "/projects/my-project",
  imgURL: someImageImport,
  alt: "My project thumbnail",
  title: "My Project",
  desc: "What it is in one sentence.",
  subtitles: ["React", "Design"],
  category: "personal",
  details: {
    contribution: ["Frontend Development"],
    technologies: ["React", "Tailwind CSS"],
    timeline: "Jan 2024 – Mar 2024",
    challenges: ["Brief challenge"],
    achievements: ["Brief impact"],
    images: [
      { src: someScreenshot, alt: "Screenshot", caption: "Landing page" }
    ]
  }
}
```

Notes:
- Place image assets in `src/assets/images/` and import them at the top of `personalData.js`.
- Use consistent `id` and `url` slugs; create matching pages under `src/pages/projects/` if needed.
- Set `locked: true` only if you intend to gate the detail view with `lockedPassword`.


#### Skills
Update the `skills` object in `src/config/personalData.js`.

Structure:
- `title` (string): Section heading shown on the page
- `categories` (array): Group your skills by category
  - `name` (string): Category name (e.g., "Frontend")
  - `items` (string[]): Skill labels (must match icon keys to show icons)

Example:
```js
skills: {
  title: "Skills & Technologies",
  categories: [
    { name: "Frontend", items: ["React", "JavaScript", "TypeScript", "Next.js", "Gatsby.js"] },
    { name: "Backend", items: ["Node.js", "Express.js", "Python", "Flask", "REST APIs", "PostgreSQL", "GraphQL"] },
    { name: "Cloud & DevOps", items: ["AWS", "AWS Lambda", "S3", "CloudFront", "DynamoDB", "Docker", "CI/CD", "GitHub Actions", "Git"] },
    { name: "Testing & Debugging", items: ["JUnit", "Integration Testing", "Unit Testing"] },
    { name: "Design & User Experience", items: ["Figma"] },
    { name: "Other Tools & Skills", items: ["Google Analytics", "Webpack"] },
  ]
}
```

Notes:
- Icons are mapped in `src/components/Skills.js`. Use exact labels like "React", "TypeScript", "AWS" to show the correct icon; unknown labels render a neutral dot.
- You can freely rename categories or add/remove items; the UI adapts automatically.

#### Theme Customization
Customize the look and feel in the `theme` object:
- `colors`: Color scheme (using Tailwind CSS color classes)
- `fonts`: Typography settings

### 2. Images and Assets
1. Place your images in `src/assets/images/`
2. Update image paths in `personalData.js`

### 3. SEO
Short checklist (edit `public/index.html` and files in `public/`):

- Title: `<title>Your Website Title</title>` (≤ ~60 chars)
- Description: `<meta name="description" content="140–160 char summary" />`
- Theme color: `<meta name="theme-color" content="#000000" />`
- Open Graph: set `og:title`, `og:description`, `og:url`, `og:image (1200×630)`
- Twitter: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
- Canonical (optional): `<link rel="canonical" href="https://yourdomain.com" />`
- JSON‑LD Person: update `name`, `jobTitle`, `email`, `url`, `sameAs`
- Favicons: replace files in `public/favicon/`; update `public/manifest.json`
- robots.txt: allow indexing in prod; add `sitemap.xml` if you have one

Validate:
- Rich Results: `https://search.google.com/test/rich-results`
- Schema: `https://validator.schema.org/`
- Preview: share URL on LinkedIn/Twitter to confirm image/text

## Project Structure

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)