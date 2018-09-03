
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
];

 //service worker install
 //https://developers.google.com/web/fundamentals/primers/service-workers/

 self.addEventListener('install', function(e){
   console.log("[serviceworker] Installed")
   e.waitUntil(
     caches.open(cacheName).then(function(cache) {
        console.log("[serviceworker] Caching urlsCache");
        //return cache.addAll(urlsCache);
      })
   )
 })

self.addEventListener('activate', function(e){
  console.log("[serviceworker] Activated")
})

 self.addEventListener('fetch', function(e){
   console.log("[serviceworker] Fetching", e.request.url);
   /*e.respondWith(
     caches.match(e.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(e.request);
      })
   );*/
 });
