# todos-list

A simple todo list application built with MERN stack

## Getting Started

### Pre-requisites

- An existing online account created for [MongoDB](https://www.mongodb.com/) or MongoDB Atlas
- Alternatively, Mongo DB should be installed locally
- Create a collection with any name you want in MongoDB
- Node js should be installed

### Running the app locally

  In order to use the project locally, follow the below steps -

- Get your connection string for MongoDB
- Create a .env file in the root directory of project
- Provide the connection string as key-value pair in .env

  ```
    cd ~/todos-list

    Create new file named .env

    DB_HOST='your_db_connection_string_with_username_and_password'
  ```

- Start the node/express back end

  ```
    cd ~/todos-list/backend

    npm install .

    npm run dev
  ```

- Start the react front end

  ```
    cd ~/todos-list/

    npm install .

    npm run start
  ```
