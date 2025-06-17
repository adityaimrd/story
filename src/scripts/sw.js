const CACHE_NAME = 'dicoding-story-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/scripts/bundle.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/manifest.json', 
  '/saved-stories.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch((error) => { 
        console.error('Service Worker installation failed:', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.filter((name) => name !== CACHE_NAME)
        .map((name) => caches.delete(name))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.url.startsWith('https://story-api.dicoding.dev/v1/stories')) { 
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const networkResponsePromise = fetch(request).then(async (networkResponse) => {
          if (networkResponse.ok && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }).catch((error) => {
            console.error('Fetch failed for API:', error);
            return new Response(JSON.stringify({ error: true, message: 'Network unavailable or API fetch failed' }), { status: 503, statusText: 'Service Unavailable', headers: new Headers({ 'Content-Type': 'application/json' }) });
        });

        return cachedResponse || networkResponsePromise;
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((response) => response || fetch(request).catch(() => {
      return caches.match('/index.html');
      }))
  );
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.title || 'Dicoding Story App';
  const options = {
    body: data.message || 'You have a new story!',
    icon: '/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});