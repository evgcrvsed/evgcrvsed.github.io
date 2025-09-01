const cacheName = "DefaultCompany-AlgoTesting-0.1.0";
const contentToCache = [
    "Build/f8a9e8869b0909965dc5bc2a23726093.loader.js",
    "Build/cb30ef9a04d3f61d0373c455e279eda3.framework.js.gz",
    "Build/20266c9a2d6e4d74505bfc10bd47a351.data.gz",
    "Build/fbc0cffed683d7867bfb73347ae302df.wasm.gz",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
