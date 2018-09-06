
/**
 * Service Worker JS
 */


const cacheName = 'restaurant-pages';
const urlsCache = [
  '/',
  '/css/responsive.css',
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

//listener for install event
self.addEventListener('install', function(event){
 console.log("Service Worker Installed")
 //promise -- install after urls are cached
 event.waitUntil(
   //open cache
   caches.open(cacheName).then(function(cache) {
      console.log("Service Worker Caching urlsCache");
    //fetches urls and adds them to cache
      return cache.addAll(urlsCache);
    })
 )
})

//listener for activate event
self.addEventListener('activate', function(event){
  console.log("Service Worker Activated")

  event.waitUntil(
    //promise -- wait until -- loop through cache names, remove items that don't match
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName){

          if (thisCacheName !== cacheName) {
              console.log("Removing cached files from ", thisCacheName);
              return caches.delete(thisCacheName);
          }

      }))
    })
  )
})

//listener for fetch event
 self.addEventListener('fetch', function(event){
   console.log("Service Worker Fetching", event.request.url);
    //responding with entry from cache, if it exists
    event.respondWith(
     caches.match(event.request).then(function(response) {
        if (response) {
          console.log("Service Worker found in cache");
          return response;
        }

      })
   )
 })
