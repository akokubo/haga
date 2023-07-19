var cacheName = 'haga';

var filesToCache = [
  'css/bootstrap.min.css',
  'css/bootstrap.min.css.map',
  'css/custom.css',
  'images/group.png',
  'js/bootstrap.bundle.min.js',
  'js/bootstrap.bundle.min.js.map',
  'js/chart.js',
  'js/jquery-3.7.0.min.js',
  'js/number.js',
  'js/radio.js',
  'js/result.js',
  'js/session-storage-clear.js',
  'js/text.js',
  'android-chrome-256×256.png',
  'apple-touch-icon.png',
  'favicon.ico',
  'age.html',
  'favorite.html',
  'gender.html',
  'index.html',
  'name.html',
  'p01.html',
  'p02.html',
  'p03.html',
  'p04.html',
  'p05.html',
  'p06.html',
  'p07.html',
  'p08.html',
  'p09.html',
  'q001.html',
  'q002.html',
  'q003.html',
  'q004.html',
  'q005.html',
  'q006.html',
  'q007.html',
  'q008.html',
  'q009.html',
  'q010.html',
  'q011.html',
  'q012.html',
  'q013.html',
  'q014.html',
  'q015.html',
  'q016.html',
  'q017.html',
  'q018.html',
  'q019.html',
  'q020.html',
  'q021.html',
  'q022.html',
  'q023.html',
  'q024.html',
  'q025.html',
  'q026.html',
  'q027.html',
  'q028.html',
  'q029.html',
  'q030.html',
  'q031.html',
  'q032.html',
  'q033.html',
  'q034.html',
  'q035.html',
  'q036.html',
  'q037.html',
  'q038.html',
  'q039.html',
  'q040.html',
  'q041.html',
  'q042.html',
  'q043.html',
  'q044.html',
  'q045.html',
  'q046.html',
  'q047.html',
  'q048.html',
  'q049.html',
  'q050.html',
  'q051.html',
  'q052.html',
  'q053.html',
  'q054.html',
  'q055.html',
  'q056.html',
  'q057.html',
  'q058.html',
  'q059.html',
  'q060.html',
  'q061.html',
  'q062.html',
  'q063.html',
  'q064.html',
  'q065.html',
  'q066.html',
  'q067.html',
  'q068.html',
  'q069.html',
  'q070.html',
  'q071.html',
  'q072.html',
  'q073.html',
  'q074.html',
  'q075.html',
  'q076.html',
  'q077.html',
  'q078.html',
  'q079.html',
  'q080.html',
  'q081.html',
  'q082.html',
  'q083.html',
  'q084.html',
  'q085.html',
  'q086.html',
  'q087.html',
  'q088.html',
  'q089.html',
  'q090.html',
  'q091.html',
  'q092.html',
  'q093.html',
  'q094.html',
  'q095.html',
  'q096.html',
  'q097.html',
  'q098.html',
  'q099.html',
  'q100.html',
  'q101.html',
  'q102.html',
  'q103.html',
  'q104.html',
  'q105.html',
  'q106.html',
  'q107.html',
  'q108.html',
  'q109.html',
  'q110.html',
  'q111.html',
  'q112.html',
  'q113.html',
  'q114.html',
  'relation.html',
  'result.html'
];

self.addEventListener('install', function(event) {
  console.log('ServiceWorker installing');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Service Worker caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('Service Worker removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  console.log('Service Worker fetching ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
