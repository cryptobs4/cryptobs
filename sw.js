const CACHE = "cryptobs-pwa-v1";

const ASSETS = [
  "https://cryptobs4.github.io/cryptobs/",
  "https://cryptobs4.github.io/cryptobs/index.html",

  "https://cryptobs4.github.io/cryptobs/manifest.json",
  "https://cryptobs4.github.io/cryptobs/icon-192.png",
  "https://cryptobs4.github.io/cryptobs/icon-512.png"
];

// Install: cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

// Activate: remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});

// Fetch: cache-first, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
