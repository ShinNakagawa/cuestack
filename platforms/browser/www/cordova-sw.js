/**
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
'License'); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

// Note, these will be updated automatically at build time
var CACHE_VERSION = '1508342612470';
var CACHE_LIST = [
    "/assets/fonts/ionicons.woff",
    "/assets/fonts/ionicons.woff2",
    "/assets/fonts/roboto-bold.woff",
    "/assets/fonts/roboto-bold.woff2",
    "/assets/fonts/roboto-light.woff",
    "/assets/fonts/roboto-light.woff2",
    "/assets/fonts/roboto-medium.woff",
    "/assets/fonts/roboto-medium.woff2",
    "/assets/fonts/roboto-regular.woff",
    "/assets/fonts/roboto-regular.woff2",
    "/assets/icon/favicon.ico",
    "/build/0.js",
    "/build/0.js.map",
    "/build/1.js",
    "/build/1.js.map",
    "/build/2.js",
    "/build/2.js.map",
    "/build/3.js",
    "/build/3.js.map",
    "/build/4.js",
    "/build/4.js.map",
    "/build/5.js",
    "/build/5.js.map",
    "/build/6.js",
    "/build/6.js.map",
    "/build/7.js",
    "/build/7.js.map",
    "/build/main.css",
    "/build/main.css.map",
    "/build/main.js",
    "/build/main.js.map",
    "/build/polyfills.js",
    "/build/sw-toolbox.js",
    "/build/vendor.js",
    "/build/vendor.js.map",
    "/config.xml",
    "/cordova-sw.js",
    "/cordova.js",
    "/cordova_plugins.js",
    "/favicon.ico",
    "/index.html",
    "/manifest.json",
    "/plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
    "/plugins/cordova-plugin-device/www/device.js",
    "/plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
    "/plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "/plugins/cordova-plugin-statusbar/src/browser/StatusBarProxy.js",
    "/plugins/cordova-plugin-statusbar/www/statusbar.js",
    "/plugins/ionic-plugin-keyboard/www/browser/keyboard.js",
    "/service-worker.js"
];

this.addEventListener('install', function (event) {
    // Perform install steps
    console.log('cordova service worker is installing.');
    event.waitUntil(caches.open(CACHE_VERSION) /* eslint no-undef : 0 */
        .then(function (cache) {
            return cache.addAll(CACHE_LIST);
        }));
});

this.addEventListener('activate', function (event) {
    // Perform activate steps
    console.log('cordova service worker is activated.');
});

this.addEventListener('fetch', function (event) {
    console.log('cordova service worker : fetch : ' + event.request.url);

    event.respondWith(caches.match(event.request).then(function (response) { /* eslint no-undef : 0 */
        // Cache hit? return response else fetch it
        return response || fetch(event.request); /* eslint no-undef : 0 */
    }));
});
