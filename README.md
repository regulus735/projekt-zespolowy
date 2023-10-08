# Projekt Zespołowy

## Prerequisites
Before you begin, ensure you have [Docker Desktop](https://www.docker.com/get-started/) installed on your system.

## Running the Application

- Make sure Docker Desktop is running
- Run the following command in the root directory
     ```
     docker-compose up --build
     ```

## Access the Application

- Frontend: Open your browser and go to http://localhost:3000 to access the frontend application.
- Backend: The backend is accessible at http://localhost:8080.
- Database: The database server is available at localhost,1433 with the SA user credentials provided in the docker-compose.yml file.

## Stopping the Application

- Run the following command in the root directory
     ```
     docker-compose down
     ```