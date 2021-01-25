//Service worker

if('serviceWorker' in navigator){
	console.log("ok serviceWorker");
	navigator.serviceWorker.register('./sw.js')
	.then(res => console.log("serviceWorker cargado correctamente", res))
	.catch(err=> console.log("no se pudo registrar el serviceWorker", err));
} else{
	console.log("error serviceWorker");
}
