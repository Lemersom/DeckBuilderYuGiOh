
# Deck Builder Yu-Gi-Oh

This project is a continuation of [CardsSearchYuGiOh](https://github.com/Lemersom/CardsSearchYuGiOh), executed as a duo for the 'Fullstack Web Programming' course. Deck Builder Yu-Gi-Oh is a Full-Stack application that allows users to add Yu-Gi-Oh cards, search for them, and create their decks.

## Technologies
- **Front-End:** React.js Single-Page Application
- **Back-End:** Node.js, Express.js, Redis (Caching), Websocket, and RabbitMQ (Messaging)
- **Database:** MySQL
- **Containerization:** Docker

## Project Features

- Node.js HTTP server following the REST API pattern
- WebSocket server for real-time messaging on new item additions 
- Redis used as a caching server to optimize search speeds
- RabbitMQ for messaging and log generation
- React.js single page application for the user interface

## Security Features
- JWT token-based Authentication
- Self-Signed SSL Certificate for HTTPS
- Sanitization measures to prevent XSS attacks
- Error logging in the database

## Running Locally

**Prerequisites:** Ensure you have [Node.js](https://nodejs.org/) and [Docker](https://www.docker.com/get-started/) installed on your machine. Create a .env file following .env.example.

Clone the project

```bash
git clone https://github.com/Lemersom/DeckBuilderYuGiOh.git
```

Navigate to the project directory

```bash
cd DeckBuilderYuGiOh
```

Run Docker Compose with MySQL, Redis, and RabbitMQ images

```bash
docker-compose up -d
```

Install dependencies

```bash
npm run install:all
```

Start the React app, HTTP, WebSocket, and Messaging servers

```bash
npm run start:all
```

## Project Architecture

<figure>
  <img src="https://github.com/Lemersom/DeckBuilderYuGiOh/blob/main/screenshots/deckbuilderyugioh_architecture.jpg?raw=true" alt="Project Architecture">
</figure>  

## Developers

- [@Lemersom](https://github.com/Lemersom)
- [@luisfe0604](https://github.com/luisfe0604)
