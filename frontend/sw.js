// Service Worker
const cacheName = "my-pwa-shell-v1.0";
const filesToCache = [
  "/",
  "/index.html",
  "./input.css",
  "./assets/css/output.css",
  "./assets/css/aos.css",
  "./assets/css/font-awesome-all.min.css",
  "./assets/css/style.css",
  "./assets/js/aos.js",
  "./assets/js/app.js",
  "./assets/js/jquery-3.6.0.min.js",
  "./assets/js/main.js",
  "./assets/images/logo/logo-short-white.svg",
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

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const resource = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);

      return resource || fetch(e.request);
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
      body: payload,
    })
  );
});
