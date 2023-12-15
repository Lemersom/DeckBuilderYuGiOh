
# Deck Builder Yu-Gi-Oh

Final project executed as a duo for the 'Fullstack Web Programming' course. This project is a continuation of [THIS ONE](https://github.com/Lemersom/CardsSearchYuGiOh). Deck Builder Yu-Gi-Oh is a Full-Stack application that allows the user to add Yu-Gi-Oh cards and search for them, creating their deck.

## Technologies
- **Front-End:** React.js Single-Page Application
- **Back-End:** Node.js, Express.js, Redis, Websocket, and RabbitMQ
- **Database:** MySQL
- **Containerization:** Docker

## Project Features

- Node.js HTTP server following the REST API pattern
- WebSocket server capable of sending messages to users whenever a new item is added. 
- Caching server to speed up searches
- Messaging server for log generation
- React.js single page application

## Security Features
- Authentication using JWT tokens
- Self-Signed SSL Certificate (HTTPS)
- Sanitizers to prevent XSS
- Record of errors in the database

## Running Locally

**Prerequisites:** Make sure you have [Node.js](https://nodejs.org/) and [Docker](https://www.docker.com/get-started/) installed on your machine.

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

Install the dependencies

```bash
npm run install:all
```

Start the React app and the HTTP, Websocket, and Messaging servers

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
