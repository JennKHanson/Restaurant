
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
self.addEventListener('install', function(e) {
  //wait until installation
  e.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      console.log('Cache opened');
      //passing in array of urls
      return cache.addAll(urlsCache);
      //console.log('Service Worker Installed')
    })
  );
});

//listener for fetch event
self.addEventListener('fetch', function(e) {
  e.respondWith(
    //if url matches, then
    caches.match(e.request)
      .then(function(response) {
        //is url matches, return cached url
        if (response) {
          console.log(e.request, ' is in the cache');
          return response;
        }
        else {
          //if url is not in cache, return url
          console.log(e.request, ' is not in the cache')
          return fetch(e.request);
      }
        console.log('Service Worker Fetched');
      }
    )
  );
});
