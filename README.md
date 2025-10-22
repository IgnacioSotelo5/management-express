# Management Express

A backend API for a bakery management application, built with Node.js, Express, and TypeScript using the MVC architecture. This project is part of a fullstack solution, with a React Native mobile app as the frontend.

## Features

- User authentication and authorization
- Product and inventory management
- Order and sales tracking
- Customer management
- RESTful API design
- Modular MVC structure

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MongoDB
- JWT for authentication
- Zod for validation
- Helmet for security

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

```bash
git clone https://github.com/IgnacioSotelo5/management-express.git
cd management-express
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the root directory and set the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
npm run start
# or
yarn start
```

The API will be available at `http://localhost:3000`.

## Project Structure

```
src/
  config/
  modules/
  shared/
  index.ts
  types.d.ts
```

## Roadmap

- [ ] Add unit and integration tests
- [ ] Implement role-based access control
- [ ] Add analytics and reporting endpoints

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

ISC
