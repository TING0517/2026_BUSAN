const CACHE_NAME = 'busan-travel-v1';
const ASSETS = [
  'index.html',
  'guide.html',
  'wallet.html',
  'weather.html',
  'style.css',
  'script.js',
  'icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
