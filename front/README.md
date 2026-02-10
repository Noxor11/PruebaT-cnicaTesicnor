# Movie List App

This is a simple movie listing web application built with **React**, **Redux**, **TypeScript**, and **Vite**. The app allows users to browse a list of movies, filter them by title and year, and view detailed information about each movie. All user-facing text is in Spanish.

## Features

- **Movie List:** View a table of movies with columns for ID, title, year, and synopsis.
- **Filtering:** Filter movies by title and by year range.
- **Movie Details:** Click on a movie to see its detailed information.
- **404 Page:** Friendly not-found page for invalid routes.
- **State Management:** Uses Redux for managing movie data and loading states.
- **Routing:** Uses React Router for navigation between the list and detail pages.

## Project Structure

```
front/
  ├── public/           # Static assets
  ├── src/
  │   ├── components/   # Reusable UI components (e.g., Spinner)
  │   ├── pages/        # Page components (MovieList, Movie, NotFound)
  │   ├── store/        # Redux slices and store setup
  │   ├── App.tsx       # App layout wrapper
  │   ├── main.tsx      # Entry point
  │   └── routes.tsx    # Route definitions
  ├── package.json
  ├── tsconfig.json
  ├── vite.config.ts
  └── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn if you prefer)

### Installation

1. **Install dependencies:**

   ```sh
   pnpm install
   # or
   npm install
   ```

### Starting a development server:**

   ```sh
   pnpm dev
   # or
   npm run dev
   ```

### Building for Production

To create an optimized production build:

```sh
pnpm build
# or
npm run build
```

The output will be in the `dist/` directory.

### Populating the database from OMDB
Click the "Obtener películas de OMDB" button.

## What the Program Does

- Fetches and displays a list of movies.
- Allows filtering by title and year.
- Lets users click a movie to see more details.
- Handles loading and error states gracefully.
- All interface text is in Spanish.

## Customization

You can modify the movie data source or extend the Redux store to fetch from an API or add more features as needed.

---

**Tech Stack:**  
React, Redux Toolkit, TypeScript, React Router, Vite
