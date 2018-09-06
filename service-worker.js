
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
  //perform install steps
});
