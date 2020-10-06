importScripts('sw-runtime-resources-precache.js');
import {skipWaiting, clientsClaim} from 'workbox-core';
import {precacheAndRoute, createHandlerBoundToURL} from 'workbox-precaching';
import {NavigationRoute, registerRoute} from 'workbox-routing';

skipWaiting();
clientsClaim();

// __WB_MANIFEST is injected by the InjectManifest plugin
let manifestEntries = self.__WB_MANIFEST;
// additionalManifestEntries is defined in sw-runtime-resources-precache.js
if (self.additionalManifestEntries && self.additionalManifestEntries.length) {
    manifestEntries = [...manifestEntries, ...self.additionalManifestEntries];
}

// read this from the @PWA annotation
manifestEntries = [...manifestEntries,
    { url: "images/logo.png", revision: null },
    { url: "images/user.svg", revision: null }
];

precacheAndRoute(manifestEntries);

// This assumes / has been precached.
const handler = createHandlerBoundToURL('/');

// Custom response processing to rewrite the base URL.
// That's required in order to use the app shell cached for the `/` URL
// when responding to URLs like `/non/root/path`.
// TODO: do not assume the app is deployed to `/`
const myHandler = async ({url}) => {
    const baseUrlParts = new Array(url.pathname.match(/\//g).length).fill('..');
    baseUrlParts[0] = '.';
    const baseUrl = baseUrlParts.join('/')
    const response = await handler();
    const html = await response.text();
    const newHtml = html.replace(/<base\s+href=([^>]+)>/, `<base href="${baseUrl}">`);
    console.log(`base URL rewritten to ${baseUrl}`);
    return new Response(newHtml, {
        headers: {'content-type': 'text/html;charset=utf-8'}
    });
}

const navigationRoute = new NavigationRoute(myHandler);
registerRoute(navigationRoute);
