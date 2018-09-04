
/**
 * Service Worker JS
 */


/*self.addEventListener('fetch', function(){
  fetchRestaurants()
});*/

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

 self.addEventListener('install', function(event){
   console.log("[serviceworker] Installed")
   event.waitUntil(
     caches.open(cacheName).then(function(cache) {
        console.log("[serviceworker] Caching urlsCache");
        return cache.addAll(urlsCache);
      })
   )
 })

self.addEventListener('activate', function(event){
  console.log("[serviceworker] Activated")

  event.waitUntil(

    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName){

          if (thisCacheName !== cacheName) {
              console.log("[serviceworker] removing cached files from ", thisCacheName);
              return caches.delete(thisCacheName);
          }

      }))
    })
  )
})

 self.addEventListener('fetch', function(event){
   console.log("[serviceworker] Fetching", event.request.url);

    event.respondWith(
     caches.match(event.request).then(function(response) {
        if (response) {
          console.log("[Serviceworker] found in cache", event.request.url);
          return response;
        }
        return fetch(event.request);
      })
   )
 })
