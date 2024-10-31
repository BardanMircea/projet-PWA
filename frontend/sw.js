// Service Worker
const cacheName = "my-pwa-shell-v1.0";
const OFFLINE_URL = "/index.html";
const filesToCache = [
  "/",
  "/index.html",
  "./input.css",
  "./index.js",
  "./assets/css/output.css",
  "./assets/css/aos.css",
  "./assets/css/font-awesome-all.min.css",
  "./assets/css/style.css",
  "./assets/js/aos.js",
  "./assets/js/app.js",
  "./assets/js/jquery-3.6.0.min.js",
  "./assets/js/main.js",
  "./assets/images/logo/logo-short-white.svg",
  "./assets/images/logo/logo-short.svg",
  "/404.html",
  "manifest.json",
];

self.addEventListener("install", (e) => {
  console.log("[ServiceWorker] - Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[ServiceWorker] - Caching app shell");
      await cache.addAll(filesToCache);
    })()
  );
});

// Fetch event: Serve from cache or network, fallback to offline page if necessary
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        console.log("[Service Worker] Serving from cache:", event.request.url);
        return cachedResponse;
      }

      try {
        console.log(
          "[Service Worker] Fetching from network:",
          event.request.url
        );
        return await fetch(event.request);
      } catch (error) {
        console.log(
          "[Service Worker] Network request failed, serving offline page"
        );
        return caches.match(OFFLINE_URL);
      }
    })()
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      const keyList = await caches.keys();
      await Promise.all(
        keyList.map((key) => {
          console.log(key);
          if (key !== cacheName) {
            console.log("[ServiceWorker] - Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })()
  );
  e.waitUntil(self.clients.claim());
});

self.addEventListener("push", function (event) {
  const payload = event.data ? event.data.text() : "no payload";
  event.waitUntil(
    self.registration.showNotification("JobHome M1 Dev", {
      icon: "/assets/images/logo/logoBlack.png", // Ajouter un chemin d'icône si nécessaire
      data: { url: "http://localhost:55182/ad-details.html" }, // On stocke l'URL cible pour le clic
      body: payload,
    })
  );
});

// click sur une push notification
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // Vérifier si une fenêtre est déjà ouverte avec l'URL cible
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url === event.notification.data.url && "focus" in client) {
          return client.focus();
        }
      }
      // Sinon, ouvrir une nouvelle fenêtre avec l'URL cible
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
