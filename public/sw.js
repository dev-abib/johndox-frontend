/* public/sw.js */
/* eslint-disable no-restricted-globals */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", event => {
  if (!event.data || event.data.type !== "SHOW_NOTIFICATION") return;

  const payload = event.data.payload || {};

  const title = payload.title || "New Message";
  const options = {
    body: payload.body || "You have a new message",
    icon: payload.icon || "/default_avatar.jpg",
    tag: payload.tag || "chat-notification",
    renotify: true,
    vibrate: [200, 100, 200],
    data: {
      url: "/messages",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  const url = event.notification.data?.url || "/messages";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url.includes(url) && "focus" in client) {
            return client.focus();
          }
        }
        return self.clients.openWindow(url);
      }),
  );
});
