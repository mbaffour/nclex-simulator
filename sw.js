/**
 * Service worker for the NCLEX Pro Simulator.
 *
 * The whole point is offline study: the simulator is one self-contained HTML
 * file, so once it is cached the app works with no signal at all — on a
 * commute, in a hospital basement, on a plane. Progress still persists to
 * localStorage exactly as before.
 *
 * Strategy is stale-while-revalidate: always answer from cache immediately
 * (fast, and works offline), then refresh the cache in the background so the
 * next launch picks up any update. Nothing here ever blocks on the network.
 */
const CACHE = 'nclex-pro-v1';

// Cross-origin hosts worth caching. Google Fonts responses are opaque, which
// is fine for a cache hit — the page also declares a full fallback stack, so
// the app is legible even if the fonts never arrive.
const CACHEABLE_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  // The page precaches itself after registering, so there is nothing to fetch
  // here. Activate immediately rather than waiting for every tab to close.
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !CACHEABLE_HOSTS.includes(url.hostname)) return;

  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req).then(cached => {
        const network = fetch(req)
          .then(res => {
            // Opaque responses have status 0; they are still worth caching.
            if (res && (res.ok || res.type === 'opaque')) {
              cache.put(req, res.clone()).catch(() => {});
            }
            return res;
          })
          .catch(() => cached);        // offline: fall back to whatever we have

        // Serve from cache the instant we have it; let the network catch up.
        return cached || network;
      })
    )
  );
});
