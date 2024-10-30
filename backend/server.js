// server.js
const express = require("express");
var cors = require("cors");
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
  // Enregistrer la souscription ici dans une vraie app
  res.sendStatus(201);
});

// Envoi de la notification push
app.post("/sendNotification", function (req, res) {
  const subscription = req.body.subscription;
  const payload = req.body.payload;
  const options = {
    TTL: req.body.ttl,
  };

  setTimeout(function () {
    webpush
      .sendNotification(subscription, payload, options)
      .then(function () {
        res.sendStatus(201);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  }, req.body.delay * 1000);
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
