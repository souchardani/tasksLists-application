# Full-Stack Task Management Application

This project is a comprehensive full-stack Task Management web application built with a Spring Boot backend and a React frontend. The purpose of this project is to demonstrate the implementation of a modern, decoupled, and robust software architecture, applying best practices in both backend and frontend development.

**[ Live Demo Link ]** - _(Optional: You can deploy the application and add the link here)_

---

## ✨ Key Features

- **Full CRUD for Task Lists:**
  - Create new task lists with a name and description.
  - View all existing task lists in a clean interface.
  - Edit the details of any task list.
  - Delete task lists.
- **Full CRUD for Tasks:**
  - Add tasks to any list.
  - Mark tasks as completed or pending.
  - Edit the content of tasks.
  - Delete tasks from a list.
- **Reactive UI:** A smooth and dynamic user experience built with React.
- **Data Persistence:** All information is securely stored in a PostgreSQL database.

---

## 🚀 Technology Stack

| Area             | Technology                          | Purpose                                                            |
| ---------------- | ----------------------------------- | ------------------------------------------------------------------ |
| **Backend**      | **Java 21** & **Spring Boot**       | Building a robust and secure RESTful API.                          |
|                  | **Spring Data JPA** & **Hibernate** | Object-Relational Mapping (ORM) for database interaction.          |
|                  | **Maven**                           | Dependency management and build lifecycle for the backend project. |
| **Frontend**     | **React 19** & **TypeScript**       | Building a modern, interactive, and type-safe user interface.      |
|                  | **Vite**                            | High-speed development server and build tool for the frontend.     |
|                  | **NPM**                             | Package and script management for the frontend.                    |
| **Database**     | **PostgreSQL**                      | Persistent and relational data storage for the application.        |
| **Architecture** | **REST API**                        | Decoupled communication between the frontend and backend.          |

---

## 🛠️ Technical Implementation & Skills Demonstrated

This project is not just a functional application, but a showcase of key technical skills in full-stack software development.

### Backend

- **Layered Architecture:** A clean separation of concerns was implemented:
  - **`Controller`:** Exposes the REST API endpoints and handles HTTP requests/responses.
  - **`Service`:** Contains the core business logic, orchestrating operations.
  - **`Repository`:** Abstracts data access using Spring Data JPA.
- **Dependency Injection (DI):** Used Spring's constructor-based dependency injection to manage and provide necessary instances (like services and mappers), promoting loose coupling and high testability. A `NullPointerException` caused by a missing injection was resolved.
- **DTO Pattern (Data Transfer Object):** DTOs were created to decouple the API data representation from the database entities. This ensures the API does not expose internal database details and allows tailoring data to the client's needs.
- **Entity Mapping:** A mapper pattern was used to efficiently convert between JPA Entities and DTOs.

### Frontend

- **Component-Based Architecture:** The UI was built using reusable React components, facilitating maintenance and scalability.
- **Strict Typing with TypeScript:** TypeScript was used throughout the frontend to ensure type safety, reduce runtime errors, and improve the developer experience with autocompletion and type inference.
- **State Management with Hooks:** Local state and component lifecycle logic were efficiently managed using React Hooks like `useState`, `useEffect`, and `useCallback`.
- **Asynchronous API Consumption:** Communication with the backend was implemented asynchronously using the browser's `fetch` API within an abstracted API service.

### Development Environment & Configuration

- **Vite Dev Proxy:** A proxy was configured in the Vite development server to redirect `/api` requests to the Spring Boot backend, effectively solving CORS issues during development.
- **Troubleshooting:** Real-world problems were diagnosed and resolved, such as the 404 error caused by the proxy path and the `NullPointerException` in the backend, demonstrating debugging skills in a full-stack environment.

---

## ⚙️ How to Set Up and Run the Project Locally

Follow these steps to get the application running on your machine.

### Prerequisites

- JDK 21 (or higher)
- Maven 3.x
- Node.js 18 (or higher) and npm
- A running PostgreSQL instance

### 1. Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <YOUR-REPOSITORY-URL>
    cd tasks-app
    ```
2.  **Configure the database:**
    - Navigate to `tasks/src/main/resources/application.properties`.
    - Modify the `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` properties to match your PostgreSQL setup.
3.  **Run the backend:**
    - Open a terminal in the `tasks/` directory.
    - Execute the following command:
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend will be available at `http://localhost:8080`.

### 2. Frontend Setup

1.  **Install dependencies:**
    - Open **a new terminal** in the `frontend/` directory.
    - Execute the following command:
    ```bash
    npm install
    ```
2.  **Run the frontend:**
    - In the same terminal, execute:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000` and will automatically connect to the backend via the configured proxy.
