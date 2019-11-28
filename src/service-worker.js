importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js');

// Set workbox config
workbox.setConfig({debug: false});

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim();

// Skip over the SW waiting lifecycle stage
workbox.core.skipWaiting();

// Find and remove any of the older precaches that might have been used by previous versions of Workbox.
workbox.precaching.cleanupOutdatedCaches()

workbox.precaching.precacheAndRoute([]);
