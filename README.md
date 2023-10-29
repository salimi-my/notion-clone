# [Motion](https://motion.salimi.my) &middot; [![Author Salimi](https://img.shields.io/badge/Author-Salimi-%3C%3E)](https://www.linkedin.com/in/mohamad-salimi/)

This is a Notion clone app created using Next.js for educational purposes. Motion is a productivity and note-taking web application. It offers organizational tools including task management, project tracking, to-do lists, and bookmarking.

## Notion Clone

- Real time database
- Light / dark / system mode
- Authentication using Clerk
- Convex for database
- Edgestore for image upload
- Zustand for state management
- Notion like editor using BlockNote
- Hosted in Vercel

## Tech/framework used

- Next.js 13 App Dir
- Shadcn/ui
- Clerk
- Tailwind CSS
- TypeScript
- Convex
- Edgestore
- BlockNote
- Zustand
- Vercel

## Starting the project

Open the [.env.example](/.env.example) and fill in your Convex configuration, Edgestore configuration & Clerk Auth Configurations then save it as .env.local the run the following command:

```bash
npm install
npm run dev
npx convex dev
```

## Demo

The app is hosted on Vercel. [Click here](https://motion.salimi.my) to visit.
<br>
Direct link: `https://motion.salimi.my`

## Screenshots

#### Landing page

![Landing page](/screenshots/screenshot-1.png)

#### Sign in

![Sign in](/screenshots/screenshot-2.png)

#### Editor

![Editor](/screenshots/screenshot-3.png)
