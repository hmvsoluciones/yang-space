// asignar nombre y version de la cache

const CACHE_NAME = 'v1_ca cache_pwa';

//Ficheros a cachear en la aplicación

var urlsToCache = [
	'./',
    './img/icons/logo36.png',
    './img/icons/logo48.png',
    './img/icons/logo72.png',
    './img/icons/logo96.png',
    './img/icons/logo144.png',
    './img/icons/logo192.png',
    './img/team/001.png',
    './img/team/002.png',
    './img/band.png',
    './img/foot1.png',
    './img/fungus.png',
    './img/header-bg.png',
    './img/header-bg1.png',
    './img/header-bg2.png',
    './img/header-bg3.png',
    './img/header-bg4.png',
    './img/header-bg5.png',
    './img/huella.png',
    './img/logo.png',
    './img/pedicure.png',
    './img/pieuna.png',
    './img/pievenda.png',
    './js/bootstrap.js',
    './js/bootstrap.min.js',
    './js/contact_me.js',
    './js/jqBootstrapValidation.js',
    './js/jquery.1.11.1.js',
    './js/jquery.counterup.js',
    './js/jquery.isotope.js',
    './js/jquery.prettyPhoto.js',
    './js/main.js',
    './js/modernizr.custom.js',
    './js/SmoothScroll.js',
    './js/waypoints.js',    
    './css/bootstrap.css',
    './css/bootstrap.min.css',
    './css/prettyPhoto.css',
    './fonts/',
    './css/style.css',
    './fonts/fonts/glyphicons-halflings-regular.eot',
    './fonts/fonts/glyphicons-halflings-regular.svg',  
    './fonts/fonts/glyphicons-halflings-regular.ttf',
    './fonts/fonts/glyphicons-halflings-regular.woff',
    './fonts/fonts/glyphicons-halflings-regular.woff2',
    './fonts/font-awesome/css/font-awesome.css',
'./fonts/font-awesome/css/font-awesome.min.css',
'./fonts/font-awesome/css/font-awesome.css',
'./fonts/font-awesome/fonts/fontawesome-webfont.eot',
'./fonts/font-awesome/fonts/fontawesome-webfont.svg',
'./fonts/font-awesome/fonts/fontawesome-webfont.ttf',
'./fonts/font-awesome/fonts/fontawesome-webfont.woff',
'./fonts/font-awesome/fonts/fontawesome-webfont.woff2',
'./fonts/font-awesome/fonts/FontAwesome.otf',
'./fonts/font-awesome/less/animated.less',
'./fonts/font-awesome/less/bordered-pulled.less',
'./fonts/font-awesome/less/core.less',
'./fonts/font-awesome/less/fixed-width.less',
'./fonts/font-awesome/less/font-awesome.less',      
'./fonts/font-awesome/less/icons.less',
'./fonts/font-awesome/less/larger.less',
'./fonts/font-awesome/less/list.less',
'./fonts/font-awesome/less/mixins.less',
'./fonts/font-awesome/less/path.less',
'./fonts/font-awesome/less/rotated-flipped.less',
'./fonts/font-awesome/less/stacked.less',
'./fonts/font-awesome/less/variables.less',
'./fonts/font-awesome/scss/font-awesome.scss',
'./fonts/font-awesome/scss/_animated.scss',
'./fonts/font-awesome/scss/_bordered-pulled.scss',
'./fonts/font-awesome/scss/_core.scss',
'./fonts/font-awesome/scss/_fixed-width.scss',
'./fonts/font-awesome/scss/_icons.scss',
'./fonts/font-awesome/scss/_larger.scss',
'./fonts/font-awesome/scss/_list.scss',
'./fonts/font-awesome/scss/_mixins.scss',
'./fonts/font-awesome/scss/_path.scss',
'./fonts/font-awesome/scss/_rotated-flipped.scss',
'./fonts/font-awesome/scss/_stacked.scss',
'./fonts/font-awesome/scss/_variables.scss'	
];

//eventos de instalacion, activacion, fetch

//Evento install, instalacion del service worker, almacena en cache los recursos estaticos de la aplicacion

self.addEventListener('install', e=> {
	e.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(urlsToCache)
					.then(() => {
						self.skipWaiting();
					})
		})
		.catch(err =>console.log("No se ha registrado el cache", err))
	);
});
//Evento activate

self.addEventListener('activate', e=>{
	const cacheWhitelist = [CACHE_NAME];

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				
				return Promise.all(
					cacheNames.map(cacheName => {
						if(cacheWhitelist.indexOf(cacheNames === -1)){
							//borra elementos que no se necesitan
							return caches.delete(cacheName);
						}
					})
				);
			})
			.then(()=>{
				// activar la cahe
				self.clients.claim();
			})
	);
});

//Evento fetch, peticiones a internet, recupera la informacion de la cache si esxite o realiza una peticion ajax
self.addEventListener('fetch', e=>{
	e.respondWith(
		caches.match(e.request)
			.then(res => {
				if(res){
					//devolviendo los datos desde cache
					return res;
				} else {
					return fetch(e.request);
				}
			})
	);
});