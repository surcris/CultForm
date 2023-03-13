let count = 0;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/main.js',
        '/registerServiceWorker.js'
      ])
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      return fetch(event.request)
    })
  )
})

self.addEventListener('sync', event => {
  if (event.tag === 'increment') {
    event.waitUntil(
      fetch('https://example.com/api/increment').then(response => {
        count++
        console.log('Count incremented to', count)
      })
    )
  }
})

setInterval(() => {
  self.registration.sync.register('increment')
}, 1000)