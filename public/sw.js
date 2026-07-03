const CACHE_NAME = 'english-quest-v2';
const scopePath = new URL(self.registration.scope).pathname.replace(/\/$/, '');
const fromScope = (path) => `${scopePath}${path}` || path;
const APP_SHELL = [fromScope('/'), fromScope('/index.html'), fromScope('/manifest.webmanifest'), fromScope('/icons/icon.svg')];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Sayfa istekleri: önce ağ, çevrimdışıysa önbellek (güncellemeler hemen gelsin)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => cached ?? caches.match(fromScope('/index.html'))),
        ),
    );
    return;
  }

  // Diğer dosyalar: önce önbellek, yoksa ağdan al ve sakla
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    }),
  );
});
