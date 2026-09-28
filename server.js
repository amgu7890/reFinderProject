// Import the Express package
// 'require' is a built-in Node.js function to include modules.
// In this case, we are importing the Express.js framework.
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const colors = require("colors");

// --- DATABASE CONNECTION ---
connectDB();

// Initialize an Express application
// We call the express() function to create a new application instance.
// This 'app' object will be used to configure our server.
const app = express();

// MIDDLEWARE-----

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// --- ROUTES ---

app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  // The 'req' object contains information about the incoming request (e.g., headers, query parameters).
  // The 'res' object is used to send a response back to the client.
  // res.send() sends a response of various types; here, we send a simple string.
  res.send("API is running...");
});

// Start the server and make it listen on the specified port
// app.listen() binds the server to the specified port and starts listening for connections.
// The first argument is the port number.
// The second argument is an optional callback function that executes once the server starts successfully.
// It's a best practice to log a message to the console to confirm that the server is up and running.
app.listen(PORT, () => {
  console.log(`Server is UP and RUNNING running on port ${PORT}`.yellow.bold);
});
