'use strict';

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

workbox.setConfig({ debug: true });
workbox.skipWaiting();
workbox.clientsClaim();

const precacheCacheName = workbox.core.cacheNames.precache;
const runtimeCacheName = workbox.core.cacheNames.runtime;

const staticAssets =[
	{url: '/', revision: '783676'}
];

workbox.precaching.precacheAndRoute(staticAssets);

workbox.routing.registerRoute(
	/.*\.css/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'css-cache'
	})
);

workbox.routing.registerRoute(
	new RegExp('.*\.js'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'js-cache'
	})
);

workbox.routing.registerRoute(
	/.*\.(?:png|jpg|jpeg|svg|gif|ico)/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'image-cache',
		cacheExpiration: {
	      maxEntries: 300
	    },
	    cacheableResponse: {statuses: [0, 200]}
	})
);

workbox.routing.registerRoute(
	/.*\.(?:woff2|woff|ttf|eot)/,
	workbox.strategies.cacheFirst({
		cacheName: 'font-cache'
	})
);

workbox.routing.registerRoute(
	new RegExp('.*\.html|.*\.php|/'),
	workbox.strategies.networkFirst({
		cacheName: 'html-cache'
	})
);

workbox.googleAnalytics.initialize();
