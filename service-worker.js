
/**
 * Service Worker JS
 */

const cacheName = 'restaurant-pages';
const filesCache = [
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
            return cache.addAll(filesCache);
        })
    );
});

//listener for fetch event
self.addEventListener('fetch', function(e) {
    e.respondWith(
        //if file is in the cache, then
        caches.match(e.request)
        .then(function(response) {
            //is file is in the cache, return cached file
            if (response) {
                console.log(e.request, ' is in the cache');
                return response;
            } else {
                //if file is not in the cache, fetch file
                console.log(e.request, ' is not in the cache')
                return fetch(e.request)
                    .then(function(response) {
                        //cloning response because there can't be more than one request
                        const fetchRequest = response.clone();
                        caches.open(cacheName)
                            .then(function(cache) {
                                //https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put
                                //put file into cache
                                cache.put(e.request, fetchRequest);
                            })
                        return response;
                    })
            }

        })
    );
});
