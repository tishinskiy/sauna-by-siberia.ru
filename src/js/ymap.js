"use strict";

console.log("ymap.js");

$(window).ready(function(){

	ymaps.ready(init);
	var myMap;

	function init(){
		myMap = new ymaps.Map("ymap", {
			center: [55.76, 37.64],
			zoom: 10,
		},{

		});

		myMap.behaviors
			.disable('scrollZoom');

		myMap.controls
			.remove('zoomControl')
			.remove('trafficControl')
			.remove('searchControl')
			.remove('typeSelector')
			.remove('scaleLine')
			.remove('mapTools')
			.remove('mapTools')
			.remove('miniMap')
			.remove('searchControl');
	}
});

