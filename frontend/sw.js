const CACHE_NAME = "tailwind-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "./input.css",
  "./assets/css/output.css",
];

// Installation du service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log("Ouverture du cache");
      await cache.addAll(FILES_TO_CACHE);
    })()
  );
});

// Activation du service worker
self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      const keyList = await caches.keys();
      await Promise.all(
        keyList.map((key) => {
          console.log(key);
          if (key !== CACHE_NAME) {
            console.log("Suppression de l'ancien cache", CACHE_NAME);
            return caches.delete(key);
          }
        })
      );
    })()
  );
  e.waitUntil(self.clients.claim());
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retourne le fichier en cache s'il est trouvé
      if (response) {
        return response;
      }
      // Sinon, fais une requête réseau et met le fichier en cache
      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

// Notifications push
self.addEventListener("push", function (event) {
  const payload = event.data ? event.data.text() : "no payload";
  event.waitUntil(
    self.registration.showNotification("ServiceWorker Cookbook", {
      body: payload,
    })
  );
});
