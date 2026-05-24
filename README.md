# English Quest

English Quest is a mobile-first, gamified English learning web app built with Vite, React, TypeScript, and Tailwind CSS.

Users choose a level, complete short daily missions, earn XP, keep a daily streak, and move through a simple story map set in an English-speaking city. This first version uses mock lesson data and stores progress in LocalStorage.

## Features

- Level selection: A1, A2, B1
- Daily mission dashboard with XP, quest level, streak, and completed lessons
- Story mode across 8 city missions
- Mission map with locked and unlocked lessons
- Each lesson includes:
  - 5 vocabulary cards
  - 5-question mini quiz
  - 1 dialogue completion task
  - 1 sentence writing task
- XP rewards for quiz answers and mission completion
- LocalStorage progress saving
- Reset progress button in settings
- Mobile-first responsive card UI
- PWA basics: manifest, app icon placeholder, and service worker

## Lessons

- At the Airport
- At a Café
- Meeting New People
- Shopping
- Hotel Check-in
- Job Interview
- Asking for Directions
- Doctor Visit

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- LocalStorage
- PWA manifest and service worker

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deploy

### Vercel

1. Push the project to a public GitHub repository.
2. Import the repository in Vercel.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

### Netlify

1. Push the project to a public GitHub repository.
2. Import the repository in Netlify.
3. Use:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

## Notes

- No backend is required.
- No real AI API is used.
- Lesson content is currently mock data in `src/data/lessons.ts`.
- Progress is saved only on the current device through LocalStorage.
