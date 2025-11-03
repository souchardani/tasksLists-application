# Gemini Project Context: tasks-app

## Project Overview

This is a task tracking application built with Java and the Spring Boot framework. It uses Maven for dependency management and building. The application is designed to manage tasks and task lists, persisting data to a PostgreSQL database.

*   **Backend:** Java 21, Spring Boot 3.5.7
*   **Data Access:** Spring Data JPA
*   **API:** Spring Web (likely for RESTful services)
*   **Database:** PostgreSQL
*   **Build Tool:** Maven

The project follows a standard layered architecture, separating database entities from Data Transfer Objects (DTOs) using a mapper pattern. This is a common practice to create a decoupled and maintainable codebase.

## Building and Running

### Prerequisites

*   Java Development Kit (JDK) 21
*   A running PostgreSQL instance

### Configuration

Before running the application, you may need to configure the database connection.

1.  Open the `src/main/resources/application.properties` file.
2.  Update the following properties to match your PostgreSQL setup:
    *   `spring.datasource.url`
    *   `spring.datasource.username`
    *   `spring.datasource.password`

The application is configured to automatically update the database schema (`spring.jpa.hibernate.ddl-auto=update`).

### Commands

*   **Build the project:**
    ```bash
    ./mvnw clean install
    ```
*   **Run the application:**
    ```bash
    ./mvnw spring-boot:run
    ```
    Alternatively, you can run the packaged JAR file:
    ```bash
    java -jar target/tasks-0.0.1-SNAPSHOT.jar
    ```
*   **Run tests:**
    ```bash
    ./mvnw test
    ```

## Development Conventions

*   **Data Model:** Database entities are defined as JPA `@Entity` classes in the `src.main.java.com.souchar.tasks.domain.entities` package.
*   **API Data Transfer:** Data Transfer Objects (DTOs) are used to expose data through the API. These are located in the `src.test.java.com.souchar.tasks.domain.dto` package (Note: these seem to be incorrectly placed in `src/test` instead of `src/main`).
*   **Mapping:** The conversion between Entities and DTOs is handled by mappers located in the `src.test.java.com.souchar.tasks.mappers` package (Note: these also seem to be incorrectly placed in `src/test`).
