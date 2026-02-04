// public/sw.js

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const payload = event.data.payload || {};

    const title = payload.title || "New Message";
    const body = payload.body || "You have a new message";
    const icon = payload.icon || "/default-avatar.jpg";
    const tag = payload.tag || "chat-notification";

    const options = {
      body: body,
      icon: icon,
      // badge: '/badge.png',           // ← remove this line if you don't have badge.png
      tag: tag,
      renotify: true,
      vibrate: [200, 100, 200],
      data: {
        url: "/messages", // or your messages page route
      },
    };

    event.waitUntil(
      self.registration.showNotification(title, options).catch(err => {
        console.error("[SW] Notification failed:", err);
      }),
    );
  }
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/messages";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url.includes(urlToOpen) && "focus" in client) {
            return client.focus();
          }
        }
        // No matching tab found → open new one
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
      .catch(err => {
        console.error("[SW] Notification click failed:", err);
      }),
  );
});
