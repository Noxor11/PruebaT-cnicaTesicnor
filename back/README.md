# Interview Movie API

This project is a simple backend REST API for managing a collection of movies, built with Spring Boot. It demonstrates basic CRUD operations, integration with an external API (OMDb), and usage of standard Spring components such as controllers, repositories, and DTOs.

## Features

- **List Movies:** Retrieve all movies stored in the database.
- **Populate Movies:** Fetches a list of "Star Wars" movies from the OMDb API and saves them to the local database.
- **Movie Details:** (Extendable) Retrieve details for a specific movie by its ID.

## Endpoints

- `GET /movies`  
  Returns a list of all movies in the database.

- `GET /movies/populate`  
  Fetches "Star Wars" movies from OMDb and populates the database.  

## Technologies Used

- Java 25+
- Spring Boot
- Spring Data JPA
- PostgreSQL (or your configured database)
- OMDb API (for external movie data)

## Getting Started

1. **Clone the repository:**
   ```
   git clone <repo-url>
   cd back
   ```

2. **Configure the environment variables:**
   By default, the project uses PostgreSQL database. We need both
   the environment variables for the database "POSTGRES_USERNAME" and "POSTGRES_PASSWORD", as well as "OMDB_API_KEY" for the omdb api key.

3. **Build and run the application:**
   ```
   ./mvnw spring-boot:run
   ```

4. **Access the API:**
   - List movies: [http://localhost:8080/movies](http://localhost:8080/movies)
   - Populate movies: [http://localhost:8080/movies/populate](http://localhost:8080/movies/populate)


## Project Structure

- `controller/` — REST endpoints
- `model/` — JPA entities
- `repository/` — Spring Data repositories
- `dto/` — Data transfer objects
- `config/` — Spring configuration
