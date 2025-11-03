# Tasks Lists App

## Overview

This is a simple task management application built with React and TypeScript. It allows users to create and manage multiple task lists, add tasks to these lists, mark tasks as complete, and delete them. The application can be configured to use either local browser storage or a remote Spring Boot API for data persistence.

the goal of this project is to learn:

- React 19
- TypeScript
- Vite
- React Hooks
- Component-based architecture
- Service-oriented architecture
- API integration
- Local storage
- State management

## Project Structure

The project is organized into the following main directories:

- **`public/`**: Contains static assets like `index.html`.
- **`src/`**: Contains all the application source code.
  - **`assets/`**: Stores static assets such as images or icons.
  - **`components/`**: Reusable React components.
  - **`services/`**: Modules for data handling and API interactions. This includes `apiService.ts` for backend communication and `storageService.ts` for local storage.
  - **`types/`**: TypeScript type definitions for the application's data structures.
  - **`App.tsx`**: The main application component, responsible for routing and global state management.
  - **`main.tsx`**: The entry point of the React application.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
