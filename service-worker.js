
/**
 * Service Worker JS
 */


const cacheName = 'restaurant-pages';
const urlsCache = [
  '/',
  '/css/styles.css',
  '/css/responsiveinside.css',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/index.html',
  '/restaurant.html',
]

 //service worker install
 //https://developers.google.com/web/fundamentals/primers/service-workers/
 //https://www.youtube.com/watch?v=BfL3pprhnms

 self.addEventListener('install', function(e){
   console.log("Service Worker Installed")
   e.waitUntil(
     caches.open(cacheName).then(function(cache) {
        console.log("Service Worker Caching urlsCache");
        return cache.addAll(urlsCache);
      })
   )
 })

self.addEventListener('activate', function(e){
  console.log("Service Worker Activated")

  e.waitUntil(

    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName){

          if (thisCacheName !== cacheName) {
              console.log("Service Worker removing cached files from ", thisCacheName);
              return caches.delete(thisCacheName);
          }

      }))
    })
  )
})

 self.addEventListener('fetch', function(e){
   console.log("Service Worker Fetching", e.request.url);

    e.respondWith(
     caches.match(e.request).then(function(response) {
        if (response) {
          console.log("Service Worker found in cache", e.request.url);
          return response;
        }

        var requestClone = e.request.clone();
        fetch(requestClone).then(function(response) {
          if (!response) {
            console.log ("Service Worker no response from fetch");
            return response;
          }
          var responseClone = response.clone();
          caches.open(cacheName).then(function(cache){
              cache.put(e.request, responseClone);
              return response;
          });
        })
        return fetch(e.request);

      })
   )
 })
