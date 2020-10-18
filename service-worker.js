importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/bola.png', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
]);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
  );

workbox.routing.registerRoute(
  new RegExp('/images/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'images'
    })
);

workbox.routing.registerRoute(
  new RegExp('/js/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'javascript'
    })
);



  self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'bola.png',
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