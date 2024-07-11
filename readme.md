# Express TypeScript Backend with WebSocket and MongoDB

This project is a modular Express.js backend built with TypeScript, using esbuild for bundling, Mongoose for MongoDB interactions, and WebSocket support for real-time communication.

## Features

- Modular architecture
- TypeScript for type safety
- esbuild for fast builds
- JWT-based authentication
- Mongoose for MongoDB interaction
- WebSocket for real-time communication

## Project Structure

```
src
├── controllers
│ └── authController.ts
├── middlewares
│ └── authMiddleware.ts
├── models
│ └── userModel.ts
├── routes
│ └── authRoutes.ts
├── services
│ └── authService.ts
├── utils
│ └── db.ts
├── ws
│ └── websocket.ts
├── index.ts
└── types.ts
```


## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/omkar342/Ayna-Chat-Backned
    cd Ayna-Chat-Backned
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a .env file and add your MongoDB connection string and JWT secret:

    ```makefile
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=your_port
    ```

4. Build and run the project:

    ```bash
    # For production
    npm run build
    npm start
    ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

