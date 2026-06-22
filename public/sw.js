if (!self.define) {
  let e,
    s = {};
  const a = (a, t) => (
    (a = new URL(a + '.js', t).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, c) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[n]) return;
    let i = {};
    const r = (e) => a(e, n),
      o = { module: { uri: n }, exports: i, require: r };
    s[n] = Promise.all(t.map((e) => o[e] || r(e))).then((e) => (c(...e), i));
  };
}
define(['./workbox-f52fd911'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: 'c7d25fe22acca5b02e0298f471e6cbcd',
        },
        {
          url: '/_next/static/2QVOMVAYj4fEXT-PaF9U7/_buildManifest.js',
          revision: '2ec694eb52ae4f523f265a46bae4d768',
        },
        {
          url: '/_next/static/2QVOMVAYj4fEXT-PaF9U7/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/227.161403a48c8ca4aa.js',
          revision: '161403a48c8ca4aa',
        },
        {
          url: '/_next/static/chunks/228-c4e4e6442f0bc62a.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/23-296f9fd92dec333f.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/231-a2a427c06416a563.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/323.971d120569004946.js',
          revision: '971d120569004946',
        },
        {
          url: '/_next/static/chunks/331-47d9ba6a7575a75d.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/431.756d20a407d6a6ca.js',
          revision: '756d20a407d6a6ca',
        },
        {
          url: '/_next/static/chunks/472-65c43d3c955ec7e0.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/492-ddcaa8dba7cf0703.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/4a7b0c69.a7a04b8e1b42dca1.js',
          revision: 'a7a04b8e1b42dca1',
        },
        {
          url: '/_next/static/chunks/678-da282c6448dce8b6.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/761.bdb85bac7d7dfd28.js',
          revision: 'bdb85bac7d7dfd28',
        },
        {
          url: '/_next/static/chunks/777-ef695478aad6326a.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/881-882e94f75011c239.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/974-57066734e6a85a3e.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/admin/page-dc4a650ee0f2dc12.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/layout-9624bff681220864.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/page-7389d081796c1e0b.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/player/%5Bid%5D/page-ac65a3f4e218ef55.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/player/page-0c0c39b356697eab.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/scout/layout-2856f523411dc10e.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/scout/page-f661459445d3bf49.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/scout/subscribe/page-1f9b91e865214889.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/validator/page-1a717209d29955fb.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-fff67d89ee026635.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/error-dd104aa8a57b2223.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/layout-a88bcbf3ff14c76d.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/app/not-found-9e1a404876bb35a4.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/eef1a047-b736a2acea7ef590.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/fd9d1056-7c1de419a05cfab3.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/framework-f66176bb897dc684.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/main-app-4f6264409bb72ade.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/main-c9f1770146efeb0e.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/pages/_app-6a626577ffa902a4.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/pages/_error-1be831200e60c5c0.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/webpack-7013683b7c738e03.js',
          revision: '2QVOMVAYj4fEXT-PaF9U7',
        },
        {
          url: '/icons/icon.svg',
          revision: '43f2053bd3171717e9cf0eed5f19f587',
        },
        { url: '/manifest.json', revision: '5a46fcd44e813f470362ba18fe80c339' },
        { url: '/og-image.svg', revision: '6e2a4972ab43c039002e36cfd9d17d45' },
        { url: '/robots.txt', revision: '8f4cd5cbd3f24e427168ebe48d2c9b87' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: t,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/(soroban-testnet|horizon-testnet|soroban)\.stellar\.org\/.*/i,
      new e.NetworkFirst({
        cacheName: 'stellar-rpc-cache',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 60 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/api\/.*/i,
      new e.NetworkFirst({
        cacheName: 'api-cache',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 60 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf|eot)$/i,
      new e.CacheFirst({
        cacheName: 'static-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 128, maxAgeSeconds: 2592e3 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js|css)$/i,
      new e.CacheFirst({
        cacheName: 'static-js-css',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET',
    ));
});
