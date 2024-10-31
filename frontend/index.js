"use strict";

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(async (swRegistered) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          swRegistered.scope
        );
        return swRegistered.pushManager
          .getSubscription()
          .then(async (subscription) => {
            if (subscription) {
              return subscription;
            }
            const response = await fetch(
              "http://localhost:3000/vapidPublicKey" // Récupérer la clé vapid pour créer la souscription
            );

            const vapidPublicKey = await response.text();
            // Convertir la clé vapid
            const convertedVapidKey = urlB64ToUint8Array(vapidPublicKey);

            // Souscription
            return swRegistered.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey,
            });
          });
      })
      .then(function (subscription) {
        // Pas nécessaire vu que dans ce cas d'usage on n'enregistre pas la souscription (sert à titre d'exemple)
        fetch("http://localhost:3000/register", {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            subscription: subscription,
          }),
        });
        console.log(subscription);
        document.getElementById("add-offer-btn").onclick = function () {
          fetch("http://localhost:3000/sendNotification", {
            method: "post",
            headers: {
              "Content-type": "application/json",
            },
          });
        };
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed: ", error);
      });
  });
}
