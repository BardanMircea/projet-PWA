// server.js
const express = require("express");
var cors = require("cors");
const fs = require("fs");
const path = require("path");
const bp = require("body-parser");
const webpush = require("web-push");
const app = express();
const port = 3000;

// Configuration web-push
webpush.setVapidDetails(
  "mailto:juanda99@gmail.com",
  "BBF3a1EDz4MAgy9JbcsWoKvx3Ti08jQwWMnpaupyzYGOPhWk0Rsf1BvyQL4scp5XAw6Yo8rdXpOQ3Q3gOa9nHHY",
  "5igyVzUcp-sqFeA0UsP5tRqIBMt_A7DmsHjlrDLBrqo"
);

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors(corsOptions));
// Defining a route for handling client communication
app.get("/", (req, res) => {
  const message = "Je suis un vilain serveur express !";
  res.json({ message });
});

app.get("/vapidPublicKey", function (req, res) {
  // Retourner la clé vapid au client pour réaliser la souscription
  res.send(
    "BBF3a1EDz4MAgy9JbcsWoKvx3Ti08jQwWMnpaupyzYGOPhWk0Rsf1BvyQL4scp5XAw6Yo8rdXpOQ3Q3gOa9nHHY"
  );
});

app.post("/register", function (req, res) {
  const subscription = req.body.subscription; // Get subscription data from request body

  // Path to subscriptions.json file
  const filePath = path.join(__dirname, "subscriptions.json");

  // Read the current subscriptions file or initialize an empty array if it doesn't exist
  fs.readFile(filePath, "utf8", (err, data) => {
    let subscriptions = [];
    if (!err && data) {
      subscriptions = JSON.parse(data);
    }

    // Add the new subscription to the array
    subscriptions.push(subscription);

    // Write updated subscriptions back to the file
    fs.writeFile(filePath, JSON.stringify(subscriptions, null, 2), (err) => {
      if (err) {
        console.error("Error saving subscription:", err);
        return res.status(500).send("Failed to save subscription");
      }
      res.sendStatus(201); // Send response to client
    });
  });
  res.sendStatus(201);
});

// Envoi de la notification push
app.post("/sendNotification", function (req, res) {
  const filePath = path.join(__dirname, "subscriptions.json");
  // Read the subscriptions file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.error("Error reading subscriptions file:", err);
    }

    // Parse the JSON data
    const subscriptions = JSON.parse(data);

    // Loop through each subscription and send notification

    webpush
      .sendNotification(
        subscriptions[0],
        "Une nouvelle offre d'emploi est disponible !",
        {
          TTL: 0,
        }
      )
      .then(function () {
        res.sendStatus(201);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
