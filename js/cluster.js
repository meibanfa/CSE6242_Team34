var leafletMap = L.map('map').setView([36.18, -115.17], 10);
L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',{
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
}).addTo(leafletMap);

var svgMap = d3.select(leafletMap.getPanes().overlayPane).append("svg").attr("width", 2000).attr("height", 2500);
var circleGroup = svgMap.append("g").attr("class", "leaflet-zoom-hide");
var tooltipmap = d3.select("#map").append("div").attr("class", "toolTipMap");

d3.json('data/Las_Vegas_geo.json', function(error, data) {
    if(error) throw error;
    // only allow the restaurant data
    data.features = data.features.filter(function(d) {
        if(d.properties && d.properties.categories) {
            if(d.properties.categories.includes('Restaurant') || d.properties.categories.includes('Food')) {
                return !isNaN(d.properties.longitude) && !isNaN(d.properties.latitude);
            }
        }
        return false;
    });

    // add GeoJSON layer to the map once the file is loaded
	var restaurants = L.geoJson(data, {
		pointToLayer: function(feature,latlng){
			var marker = L.marker(latlng);
            marker.on('click', function(d){
                d = d.target.feature.properties;
                d3.select('#detailbar').style('display', 'block');
                d3.select('#storename').html(d.name);
                d3.select('#storeaddress').html(d.address);
                d3.select('#d-t-rating').html('· Average Rating:\t\t'+d.stars);
                drawdonut(d);
            });
			return marker;
		}
	});

    // cluster markers
	var clusters = L.markerClusterGroup();
	clusters.addLayer(restaurants);
	leafletMap.addLayer(clusters);
});

function drawdonut(d){
	var review_cnt="data/stars/"+d.business_id+".csv";
    d3.csv(review_cnt, function(error, dataset) {
		dataset.forEach(function(d, i) {
			dd[i]=d.count;
		})
		Donut3D.draw("donut", getData(), 100, 120, 90, 75, 30, 0.4);
	});
	var legend = d3.select("#donut").selectAll(".legend")
		.data(salesData)
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) { return "translate(" + ( 205) + "," + (20 + i * 20) + ")"; });
	legend.append("rect")
		.attr("width", 30)
		.attr("height", 20)
		.style("fill", function(d){
			return d.color;
		});
	legend.append("text")
		.attr("x", 40)
		.attr("y", 15)
		.attr("class", "legendtext")
		.text(function(d){ return d.label;});
}
function appendpics(d){
    var width = 600;
    var height = 300;
	var bleed=0;
	var srcfile="data/photo/"+d.business_id;
    var src1 =null;//= "data/yelp_photos/yelp_academic_dataset_photos/ddInj8TpFIcsI6Nv3o2rgQ.jpg";
	var src2 =null;//= "data/yelp_photos/yelp_academic_dataset_photos/bbbTygqirJqd32W1pQHlNg.jpg";
	d3.csv(srcfile, function(d){
		if(d.length>=1){
			src1="data/yelp_photos/yelp_academic_dataset_photos/"+d[0].photo+".jpg";
		}
		if(d.length>=2){
			src2="data/yelp_photos/yelp_academic_dataset_photos/"+d[1].photo+".jpg";
		}
//	document.body.append
    var svg=d3.select("#d-b").select("#stack")
		.attr("width", width)
		.attr("height", height);
	var imgs=svg.selectAll("image").data([0,0]);
	imgs.enter()
		.append("svg:image")
		.attr("xlink:href", function(d,i){
							if (i==0) return src1;
							else return src2;
		}) 
        .attr("x", function(d,i){ 
							if (i==0) return "30";
							else return "320";
		})
        .attr("y", "10")
        .attr("width", "210")
        .attr("height", "210");
	})
}
