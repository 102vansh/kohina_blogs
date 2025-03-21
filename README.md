# Kohina Blogs

A blogging platform with frontend and backend components.

## Docker Setup

This project uses Docker for containerization of both frontend and backend services.

### Prerequisites

- Docker and Docker Compose installed on your system
- Copy `.env.example` to `.env` and fill in your environment variables

### Running with Docker

1. Clone the repository
2. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file with your actual values.

3. Build and start the containers:
   ```
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:5000

### Development Mode

For development with hot-reloading:

```
docker-compose up
```

### Stopping the Containers

```
docker-compose down
```

## Project Structure

- `frontend/`: React application built with Vite
- `backend/`: Node.js Express API server

## Environment Variables

See `.env.example` for required environment variables.
