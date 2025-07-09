/* global clients */
const CACHE_VERSION = 'v1.0.2'
const STATIC_CACHE = `static-${CACHE_VERSION}`
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/main.css',
  '/images/hero/hero-image.avif',
  '/images/hero/hero-image-mobile.avif',
  '/bundle.js',
]

// Cache static assets during installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Attempting to cache static assets...')
        return Promise.all(
          STATIC_ASSETS.map((url) => {
            return fetch(url)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Failed to fetch ${url}: ${response.status} ${response.statusText}`
                  )
                }
                return cache.put(url, response)
              })
              .catch((error) => {
                console.error(`Failed to cache ${url}:`, error)
                return Promise.resolve() // Continue with other assets
              })
          })
        )
      }),
      self.skipWaiting(),
    ])
  )
})

// Clean up old caches during activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (![STATIC_CACHE, DYNAMIC_CACHE].includes(cacheName)) {
              return caches.delete(cacheName)
            }
          })
        )
      }),
      clients.claim(),
    ])
  )
})

// Implement stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  const request = event.request

  // Skip non-GET requests and non-http(s) requests
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return
  }

  // Handle static assets
  if (STATIC_ASSETS.some((asset) => request.url.endsWith(asset))) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request)
      })
    )
    return
  }

  // For other requests, use stale-while-revalidate
  event.respondWith(
    caches.match(request).then((response) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok && request.url.startsWith('http')) {
          const cacheCopy = networkResponse.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, cacheCopy)
          })
        }
        return networkResponse
      })

      return response || fetchPromise
    })
  )
})
