# Admin App

Manager app for the IntekGlobal app ecosystem. This service exposes a simple REST API to manage users, roles, and UI “components” assignments. It is built with TypeScript, Express, and Mongoose (MongoDB).

---

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Installation](#installation)  
3. [Configuration](#configuration)  
4. [Running the Application](#running-the-application)  
5. [Project Structure](#project-structure)  
6. [Database Schemas](#database-schemas)  
7. [API Endpoints](#api-endpoints)  
   - [GET /components](#get-components)  
   - [GET /roles](#get-roles)  
   - [GET /users](#get-users)  
   - [GET /user](#get-user)  
   - [POST /role](#post-role)  
   - [POST /user](#post-user)  
8. [Scripts](#scripts)  
9. [Linting & Formatting](#linting--formatting)  
10. [License](#license)  

---

## Prerequisites

- **Node.js ≥ 14.x** and **npm ≥ 6.x**  
- **MongoDB running locally** (or a MongoDB Atlas URI)

---

## Installation

1. Clone the repository and navigate into the project folder:

   ```bash
   git clone https://github.com/RodrigoPJ/admin-app.git
   cd admin-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root (see [Configuration](#configuration) below).

---

## Configuration

Copy `.env.example` (if provided) or create a new `.env` at the root with the following variables:

``` bash
MONGO_URI=mongodb://127.0.0.1:27017/admin-app-db
PORT=3000
```

- **MONGO_URI**: MongoDB connection string (e.g. `mongodb://localhost:27017/mydatabase`).  
- **PORT**: Port on which the Express server will listen (defaults to `3000` if not set).

---

## Running the Application

- **Development** (auto‐reload on file changes via `nodemon` + `ts-node`):

```bash
npm run dev
```

This will compile and run `src/server.ts`, watch for changes in `src/**/*.ts`, and restart automatically.

- **Production / Build**:  
  1. Build the TypeScript files into JavaScript (output goes to `dist/`):

     ```bash
     npm run build
     ```

  2. Start the compiled server:

     ```bash
     npm start
     ```

  The server will listen on the port defined in `process.env.PORT` (default 3000 if not set).

Once the server is up, you can verify it’s running by visiting:

```bash
http://localhost:<PORT>/
```  

You should see a blank response (no root endpoint defined), but the console will say:

```text
Server running on port <PORT>
Mongoose connected to: <your MongoURI>
```

---

## Project Structure

```bash
admin-app/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── database/
│   │   ├── dbconfig.ts
│   │   └── schemas/
│   │       ├── Role.ts
│   │       └── User.ts
│   ├── content/
│   │   └── components.ts
│   ├── routes/
│   │   ├── routes.ts
│   │   └── handlers/
│   │       ├── createRole.ts
│   │       ├── createUser.ts
│   │       ├── getAllUsers.ts
│   │       ├── getComponents.ts
│   │       ├── getRoles.ts
│   │       └── getUser.ts
│   └── utils/
│       └── types.ts
├── .env
├── .eslintrc.js
├── .prettierrc
├── package.json
├── tsconfig.json
└── README.md
```

- **`src/app.ts`**: Creates and exports the Express app, sets up JSON parsing and registers the router.  
- **`src/server.ts`**: Imports `app`, connects to MongoDB, and starts listening on `PORT`.  
- **`src/database/dbconfig.ts`**: Reads `MONGO_URI` from `.env` and calls `mongoose.connect()`.  
- **`src/database/schemas/User.ts`**: Mongoose schema & model for `User`.  
- **`src/database/schemas/Role.ts`**: Mongoose schema & model for `Role`.  
- **`src/content/components.ts`**: Exports a hardcoded mapping of “roles” → “components” (strings).  
- **`src/routes/routes.ts`**: Central router that delegates to handler functions.  
- **`src/routes/handlers/*.ts`**: Individual request handlers for each endpoint.  
- **`src/utils/types.ts`**: TypeScript type definitions (e.g., an enum or union type of role names).

---

## Database Schemas

### `User` (Mongoose Model)

- **Collection name**: `users`  
- **Fields**:  
  - `firstName: string` (required)  
  - `lastName: string` (required)  
  - `email: string` (required, unique, lowercased)  
  - `password: string` (required)  
  - `roles: string[]` (an array of role names, required)  
  - `managedUsers?: string[]` (an optional array of user‐IDs this user manages)  
  - `createdAt: Date` (auto‐added by `timestamps: true`)  
  - `updatedAt: Date` (auto‐added by `timestamps: true`)

### `Role` (Mongoose Model)

- **Collection name**: `roles`  
- **Fields**:  
  - `name: string` (required, unique)  
  - `components: string[]` (required; e.g. `['read-users-sms-app', 'write-messages', ...]`)  
  - `createdAt: Date` (auto‐added)  
  - `updatedAt: Date` (auto‐added)

### `components` (in `src/content/components.ts`)

A hardcoded object mapping role names to arrays of component keys, for example:

```ts
export const components = {
  admin: [
    "read-users-sms-app",
    "write-users-admin-app",
    "read-messages",
    "write-users-analytics-app"
  ],
  viewer: ["read-messages", "read-users-sms-app"],
  editor: [
    "read-users-sms-app",
    "write-users-admin-app",
    "read-messages"
  ],
};
```

Handlers consult this to determine which UI components a given role is allowed to see or use.

---

## API Endpoints

All endpoints use **JSON** and assume the server is running at:

```text
http://localhost:<PORT>
```

### GET /components

- **Description**: Returns the master list of all role‐to‐component mappings.  
- **URL**:

  ```swagger
  GET /components?user=<email>
  ```  

- **Query Parameters**:  
  - `user` (_string_, **required**) – the email of the requesting user.  
- **Success Response**:  
  - **Code**: `200 OK`  
  - **Content**: A JSON array `[ requestedUserEmail, "comps", componentsObject ]`

    ```json
    [
      "alice@example.com",
      "comps",
      {
        "admin": [
          "read-users-sms-app",
          "write-users-admin-app",
          "read-messages",
          "write-users-analytics-app"
        ],
        "viewer": ["read-messages", "read-users-sms-app"],
        "editor": [
          "read-users-sms-app",
          "write-users-admin-app",
          "read-messages"
        ]
      }
    ]
    ```

- **Error Response**:  
  - **Code**: `400 Bad Request`  
  - **Reason**: Missing or invalid `user` query parameter.

---

### GET /roles

- **Description**: Returns a list of all role names defined in `components`.  
- **URL**:

  ```html
  GET /roles?user=<email>
  ```

- **Query Parameters**:  
  - `user` (_string_, **required**) – the email of the requesting user.  
- **Success Response**:  
  - **Code**: `200 OK`  
  - **Content**: A JSON array `[ requestedUserEmail, "comp2", rolesArray ]`

    ```jsonc
    [
      "alice@example.com",
      "comp2",
      ["admin", "viewer", "editor"]
    ]
    ```

- **Error Response**:  
  - **Code**: `400 Bad Request`  
  - **Reason**: Missing or invalid `user` query parameter.

---

### GET /users

- **Description**: Retrieves all users in the database.  
- **URL**:

  ```html
  GET /users?user=<email>
  ```

- **Query Parameters**:  
  - `user` (_string_, **required**) – the email of the requesting user.  
- **Success Response**:  
  - **Code**: `200 OK`  
  - **Content**: A JSON array `[ requestedUserEmail, "comp2", allUsers ]`  
    - `allUsers` is an array of user documents (each with fields `_id`, `firstName`, `lastName`, `email`, `roles`, `managedUsers`, `createdAt`, `updatedAt`).

    ```jsonc
    [
      "alice@example.com",
      "comp2",
      [
        {
          "_id": "64f8a1e5dcd8a8b570a4284b",
          "firstName": "Alice",
          "lastName": "Johnson",
          "email": "alice@example.com",
          "password": "$2b$10$...",
          "roles": ["admin"],
          "managedUsers": ["64f8a1e5dcd8a8b570a4284c"],
          "createdAt": "2023-10-03T12:34:45.000Z",
          "updatedAt": "2023-10-03T12:34:45.000Z",
          "__v": 0
        },
        {
          "_id": "64f8a1e5dcd8a8b570a4284c",
          "firstName": "Bob",
          "lastName": "Smith",
          "email": "bob@example.com",
          "password": "$2b$10$...",
          "roles": ["viewer"],
          "managedUsers": [],
          "createdAt": "2023-10-03T12:35:10.000Z",
          "updatedAt": "2023-10-03T12:35:10.000Z",
          "__v": 0
        }
      ]
    ]
    ```

- **Error Response**:  
  - **Code**: `400 Bad Request`  
  - **Reason**: Missing `user` query parameter.

---

### GET /user

- **Description**: Retrieves a single user’s profile along with computed “userComponents” array.  
- **URL**:

  ```html
  GET /user?user=<email>
  ```

- **Query Parameters**:  
  - `user` (_string_, **required**) – the email of the user to look up.  
- **Success Response**:  
  - **Code**: `200 OK`  
  - **Content**: An object merging the user document fields plus a `userComponents` array containing all component keys that user’s roles allow. Example response:

    ```jsonc
    {
      "_id": "64f8a1e5dcd8a8b570a4284b",
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice@example.com",
      "password": "$2b$10$...",
      "roles": ["editor"],
      "managedUsers": [],
      "createdAt": "2023-10-03T12:34:45.000Z",
      "updatedAt": "2023-10-03T12:34:45.000Z",
      "__v": 0,
      "userComponents": [
        "read-users-sms-app",
        "write-users-admin-app",
        "read-messages"
      ]
    }
    ```

    - Here, because `roles: ["editor"]`, the code looks up `components["editor"]` (which is `["read-users-sms-app", "write-users-admin-app", "read-messages"]`) and returns it as `userComponents`.
- **Error Responses**:  
  - **Code**: `400 Bad Request`  
    - Missing `user` query parameter  
    - Or if no user with that email is found: Response body is `"user not found"`.

---

### POST /role

- **Description**: Creates a new role in the database.  
- **URL**:

  ```html
  POST /role
  ```

- **Request Body** (JSON):

  ```jsonc
  {
    "name": "editor",
    "components": [
      "read-users-sms-app",
      "write-users-admin-app",
      "read-messages"
    ]
  }
  ```

  - `name` (_string_, required) – the role name (e.g. `"admin"`, `"viewer"`, `"editor"`).  
  - `components` (_string[]_, required) – array of allowed component keys.  
- **Success Response**:  
  - **Code**: `200 OK`  
  - **Content**: The saved `Role` document:

    ```jsonc
    {
      "_id": "64f8a2f8dcd8a8b570a4284d",
      "name": "editor",
      "components": [
        "read-users-sms-app",
        "write-users-admin-app",
        "read-messages"
      ],
      "createdAt": "2023-10-03T12:40:40.000Z",
      "updatedAt": "2023-10-03T12:40:40.000Z",
      "__v": 0
    }
    ```

- **Error Responses**:  
  - **Code**: `400 Bad Request`  
    - If `name` is missing or not a string, or `components` is not provided or not an array.  
    - Response body will contain the error object.

---

### POST /user

- **Description**: Creates a new user in the database.  
- **URL**:

  ```html
  POST /user
  ```  

- **Request Body** (JSON):

  ```jsonc
  {
    "firstName": "Carol",
    "lastName": "Lee",
    "email": "carol@example.com",
    "password": "s3cr3tP@ssw0rd",
    "roles": ["viewer", "editor"],
    "managedUsers": ["64f8a1e5dcd8a8b570a4284c"],   // optional
    "manager": "64f8a1e5dcd8a8b570a4284b"           // optional
  }
  ```

  - **Required fields**:  
    - `firstName` (_string_)  
    - `lastName` (_string_)  
    - `email` (_string_) – must be unique across all users  
    - `password` (_string_) – will be stored as plain text until you add hashing logic  
    - `roles` (_string[]_) – e.g. `["admin"]`, `["viewer", "editor"]`  
  - **Optional fields**:  
    - `managedUsers` (_string[]_) – array of user `_id`s that this user manages  
    - `manager` (_string_) – the `_id` of another user who is this user’s manager  
- **Success Response**:  
  - **Code**: `200 OK`  
  - **Content**: The saved `User` document (including `_id`, `createdAt`, `updatedAt`), for example:

    ```jsonc
    {
      "_id": "64f8a5b4dcd8a8b570a4284e",
      "firstName": "Carol",
      "lastName": "Lee",
      "email": "carol@example.com",
      "password": "s3cr3tP@ssw0rd",
      "roles": ["viewer", "editor"],
      "managedUsers": ["64f8a1e5dcd8a8b570a4284c"],
      "manager": "64f8a1e5dcd8a8b570a4284b",
      "createdAt": "2023-10-03T12:50:12.000Z",
      "updatedAt": "2023-10-03T12:50:12.000Z",
      "__v": 0
    }
    ```

- **Error Responses**:  
  - **Code**: `400 Bad Request`  
    - If any required field is missing or has the wrong type, or if a conflict (e.g. duplicate email) occurs.  
    - Response body will contain the error details.

---

## Scripts

```jsonc
"scripts": {
  "build": "tsc",
  "start": "node dist/server.js",
  "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/server.ts",
  "lint": "eslint 'src/**/*.ts'"
}
```

- **`npm run dev`**  
  Runs in “development” mode via `ts-node` + `nodemon`, watching for changes in `src/**/*.ts`.  
- **`npm run build`**  
  Compiles all TypeScript files into `dist/`.  
- **`npm start`**  
  Runs the compiled JavaScript at `dist/server.js`.  
- **`npm run lint`**  
  Runs ESLint over `src/**/*.ts`.

---

## Linting & Formatting

- **ESLint** is configured via `.eslintrc.js`.  
- **Prettier** is configured via `.prettierrc`.  
- Run `npm run lint` to check for linting errors, and configure your IDE to auto‐fix or highlight as needed.

---

## License

This project is licensed under the [ISC License](LICENSE). Feel free to view or modify as needed.

---
