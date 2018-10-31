var leafletMap = L.map('map').setView([36.18, -115.17], 10);
L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',{
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
}).addTo(leafletMap);

	var svgMap = d3.select(leafletMap.getPanes().overlayPane).append("svg").attr("width", 2000).attr("height", 2500);
	var circleGroup = svgMap.append("g").attr("class", "leaflet-zoom-hide");
	var tooltipmap = d3.select("#map").append("div").attr("class", "toolTipMap");
	
	d3.json('data/Las\ Vegas1.json', function(error, data){
		if(error) throw error;
		data.forEach(function(d){
			d.LatLng = new L.LatLng(d.latitude, d.longitude);
		});
		var circleBind = circleGroup.selectAll("g")
		.data(data);
		var mapCircles = circleBind.enter()
		.append("g")
		.append("circle")
		.attr("pointer-events", "visible")
		.attr("r", 7)
		.attr("class", "circleMap");

		function updateMap() {
			mapCircles.attr("transform",function(d) {
				return "translate("+leafletMap.latLngToLayerPoint(d.LatLng).x +","+leafletMap.latLngToLayerPoint(d.LatLng).y +")";
			});
		}

		leafletMap.on("viewreset", updateMap());
		updateMap();
	});
