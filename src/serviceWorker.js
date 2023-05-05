/* eslint-disable no-restricted-globals, no-console */
self.addEventListener('fetch', () => {});

self.addEventListener('install', () => {
  console.log('Installing service worker');
});

self.addEventListener('activate', () => {
  console.log('Service worker ready');
});
