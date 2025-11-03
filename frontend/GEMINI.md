# Gemini Project Context: tasks-app-frontend

## Project Overview

This project is a frontend application for a task management system. It is built with React and TypeScript, using Vite for the build tooling. The application allows users to manage task lists and the tasks within them. It can be configured to work with two different data sources: local browser storage or a remote Spring Boot API backend.

*   **Framework:** React 19
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** The UI is clean and modern, likely using a utility-first CSS framework like Tailwind CSS, given the class names in the code.
*   **Architecture:** The application follows a component-based architecture with a clear separation of concerns. Services are used for data access, abstracting the data source (local or API) from the UI components.

## Building and Running

### Prerequisites

*   Node.js and a package manager like npm or pnpm.

### Configuration

The application can connect to a backend API. The API base URL is configured in `src/services/apiService.ts` to be `/api`, which suggests it expects to be served alongside the API or have a proxy set up.

### Commands

The following scripts are available in `package.json`:

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, typically on `http://localhost:3000`.
*   **Build for production:**
    ```bash
    npm run build
    ```
    This command bundles the application for production into the `dist` directory.
*   **Preview the production build:**
    ```bash
    npm run preview
    ```
    This command serves the production build locally to test it before deployment.

## Development Conventions

*   **Component-Based:** The UI is built using React components located in the `src/components` directory.
*   **Data Services:** Data fetching and persistence are handled by services found in the `src/services` directory. The `App` component dynamically chooses between `storageService.ts` (for local storage) and `apiService.ts` (for backend API) based on user selection.
*   **TypeScript:** The project uses TypeScript for static typing. Type definitions for the core data structures (`Task`, `TaskList`) are located in `src/types.ts`.
*   **API Interaction:** The `apiService.ts` file defines the contract for interacting with the backend REST API, which includes endpoints for managing task lists and tasks.
*   **State Management:** The main application state is managed within the top-level `App.tsx` component using React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`).
