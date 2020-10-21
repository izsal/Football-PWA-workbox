importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: "/", revision: '1' },
        { url: "/manifest.json", revision: '1' },
        { url: "/nav.html", revision: '1' },
        { url: "/bola.png", revision: '1' },
        { url: "/index.html", revision: '1' },
        { url: "/images/izsal_qurlinas_afandi.jpg", revision: '1' },
        { url: "/images/premier.png", revision: '1' },
        { url: "/images/laliga.png", revision: '1' },
        { url: "/pages/home.html", revision: '1' },
        { url: "/pages/premier.html", revision: '1' },
        { url: "/pages/laliga.html", revision: '1' },
        { url: "/pages/favorite.html", revision: '1' },
        { url: "/team.html", revision: '1' },
        { url: "/css/materialize.min.css", revision: '1' },
        { url: "/js/materialize.min.js", revision: '1' },
        { url: "/js/main.js", revision: '1' },
        { url: "/js/nav.js", revision: '1' },
        { url: "/js/football_api.js", revision: '1' },
        { url: "/js/idb.js", revision: '1' },
        { url: "/js/database.js", revision: '1' },
      ],{
        ignoreUrlParametersMatching: [/.*/]
      });

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
        );


    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate()
        )

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
    );

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

}else{
  console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/default.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
