# Server
To deploy or push changes to the server application, follow these steps:

Go to the server directory:
cd server

Add and commit your changes:
git add .
git commit -m "Your commit message"

Push changes to Heroku:
git push heroku master

Make sure to replace "Your commit message" with an appropriate description of the changes you made in each commit.

# Migrations

Create a new migration file with npx knex migrate:make <migration_name>
Edit the migration file to define the changes to the schema
Run the migration with npx knex migrate:latest

# Running the tests
This project uses Mocha and Chai for automated testing. To run the tests, follow these steps:

Install the dependencies by running npm install in the project directory.

Start the server by running: 
node index.js or npm start.

In a separate terminal, run the tests using the command: 
npm test.

This will execute the test suite defined in test/endpointTests.js. The tests will make HTTP requests to your running server and assert that the responses meet certain criteria. If all tests pass, you should see output similar to the following: