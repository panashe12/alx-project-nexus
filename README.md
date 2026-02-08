# Movie Recommendation Website

## Overview

This project is a full‑stack movie recommendation and discovery website built with **Next.js**, **TypeScript**, and **React**. It integrates with an external movie API (via RapidAPI) to fetch real‑time movie data and provides users with a clean, professional interface for browsing, searching, and viewing detailed movie information.

The application follows modern frontend and backend best practices, with a strong focus on scalability, maintainability, and user experience.

---

## Key Features Implemented

### 1. Movie Discovery & Listings

* Fetches movies dynamically from an external API.
* Displays movie cards with poster images, titles, and release years.
* Handles missing or incomplete API data gracefully (e.g. fallback values for images and metadata).

### 2. Movie Overview Page

* Dynamic routing using `pages/movies/[id].tsx`.
* Detailed movie overview when a user clicks on a movie card.
* Displays:

  * Movie title and release year
  * Poster image
  * Overview/description
  * Genres (custom, non‑generic layout)
  * Key cast and contributors

### 3. Key Cast & Contributors UI

* Circular (rounded) cast images for a polished look.
* White cast names with orange secondary text (AKAs).
* Horizontal carousel layout with:

  * Hidden scrollbar
  * Left and right navigation arrows
  * Smooth, professional interaction design

### 4. Search Functionality

* Search input connected to an API endpoint.
* Clean separation of concerns between UI components and API logic.
* Scalable structure allowing search to be reused across pages.

### 5. Favorites System

* Dedicated Favorites page.
* Header navigation linked correctly to the Favorites route.
* Ability to manage and display user‑selected favorite movies.

### 6. API Architecture

* Custom Next.js API routes under `pages/api/`.
* Example:

  * `pages/api/fetchmovies/[id].ts` for fetching individual movie data.
* Environment‑based configuration using `.env.local` for API keys.
* Axios used for API requests with proper error handling.

### 7. TypeScript & Data Safety

* Strong typing with shared interfaces (`MovieProps`, component props, etc.).
* Fixed common runtime and TypeScript issues such as:

  * Rendering objects instead of primitives in JSX
  * Incorrect union types (`string | number` mismatches)
  * Undefined or missing API fields

### 8. Layout & Global Structure

* Reusable `Layout` component with:

  * Global Header
  * Main content area
  * Footer
* Consistent styling across all pages.
* Clean project structure following Next.js conventions.

### 9. UI/UX Improvements

* Removed unnecessary scrollbars.
* Improved visual hierarchy and spacing.
* Professional card layouts and responsive behavior.
* Clear separation between data, presentation, and logic.

### 10. Git & Workflow Setup

* Proper Git configuration (user name, email, branches).
* Guidance on creating branches and setting upstream remotes.
* Clean development workflow for ongoing feature additions.

---

## Tech Stack

* **Frontend:** Next.js, React, TypeScript
* **Backend:** Next.js API Routes
* **HTTP Client:** Axios
* **Styling:** CSS / utility‑based styling
* **Version Control:** Git & GitHub
* **External API:** RapidAPI (movie data provider)

---

## Project Structure (Simplified)

```
/pages
  /api
    /fetchmovies
      [id].ts
  /movies
    [id].tsx
  /favorites
    favorites.tsx

/components
  Layout
  Header
  Footer
  MovieCard
  CastCarousel

/interfaces
  index.ts

/styles
  globals.css
```

---

## Current State

The project is fully functional with:

* Working API integrations
* Dynamic routing
* A polished movie overview experience
* Search and favorites functionality
* A professional, production‑ready UI foundation

The codebase is structured to support future enhancements such as authentication, personalized recommendations, pagination, and advanced filtering.

---

## Next Steps (Optional Enhancements)

* User authentication and profiles
* Persistent favorites (database or local storage sync)
* Recommendation logic based on user behavior
* Performance optimizations and caching
* Unit and integration testing

---

## Author

Developed as part of a growing full‑stack movie recommendation platform using modern web technologies.

