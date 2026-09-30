// Import the Mongoose library, which is our Object Data Modeling (ODM) tool for MongoDB.
const mongoose = require("mongoose");
// Import the 'colors' package to add color to our console logs for better readability.
const colors = require("colors");

// Define an asynchronous function to connect to the database.
// We use async/await because database operations are asynchronous and return Promises.

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string (URI)
    // stored in our environment variables. Mongoose.connect() returns a promise.
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    // If an error occurs during the connection attempt, it will be caught here.

    console.error(`Error: ${error.message}`.red.bold);
    // Exit the Node.js process with a "failure" code (1).
    // This is crucial because if the app can't connect to its database,
    // it's fundamentally broken and should not continue to run.
    process.exit(1);
  }
};

module.exports = connectDB;
