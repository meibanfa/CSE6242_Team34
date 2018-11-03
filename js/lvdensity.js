var leafletMap = L.map('map').setView([36.18, -115.17], 10);

// load the basemap
L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',{
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
}).addTo(leafletMap);

// load the restaurant data
d3.json('data/Las\ Vegas.json', function(error, data){
	if(error) throw error;
	var locations = data.map(function(restaurant) {
            var location = [restaurant['latitude'], restaurant['longitude'], 1];
            return location;
    });

    var heat = L.heatLayer(locations, {radius: 15});
    leafletMap.addLayer(heat);
});

