var leafletMap = L.map('map').setView([36.18, -115.17], 10);
L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',{
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
}).addTo(leafletMap);

	var svgMap = d3.select(leafletMap.getPanes().overlayPane).append("svg").attr("width", 2000).attr("height", 2500);
	var circleGroup = svgMap.append("g").attr("class", "leaflet-zoom-hide");
	var tooltipmap = d3.select("#map").append("div").attr("class", "toolTipMap");
	
	d3.json('data/Las\ Vegas.json', function(error, data){
		if(error) throw error;
		/*data = data.filter(function(d) {
			if(d.categories){
				if(d.categories.includes("Restaurant")|| d.categories.includes("Food")){
					return !isNaN(d.longitude) & !isNaN(d.latitude);
				}
			}
			return false;
		});*/

    // Assign data globally!!
    window.las_vegas_data = data;

		data.forEach(function(d){
			d.LatLng = new L.LatLng(d.latitude, d.longitude);
		});
		var circleBind = circleGroup.selectAll("g")
		    .data(data, d => d.business_id);
		var mapCircles = circleBind.enter()
		.append("g")
		.append("circle")
		.attr("pointer-events", "visible")
		.attr("r", 5)
		.attr("class", "circleMap")
		.on('click',function(d){
			remove();
			d3.select('#detailbar').style('display', 'block');
			d3.select('#storename').html(d.name);
			d3.select('#storeaddress').html(d.address);
			d3.select('#d-t-rating').html('· Average Rating:\t\t'+d.stars);
			d3.select('#d-t-keyword').html('· Keywords');
			d3.select('#d-t-imgwords').html('· Selected Pictures');
			drawdonut(d);
			d3.select("#keywords").selectAll("g").remove();
			d3.selectAll("image").remove();
			drawkeyword(d);
			appendpics(d);

			console.log(d.business_id);
		});


		function updateMap() {
        console.log("-- updateMap --");

        // Global variable
        las_vegas_data;

        var new_data = review_filter(star_filter(las_vegas_data));
        var circleBind = circleGroup.selectAll("g")
            .data(new_data, d => d.business_id);

		    circleBind.enter()
		        .append("g")
		        .append("circle")
		        .attr("pointer-events", "visible")
		        .attr("r", 5)
		        .attr("class", "circleMap")
		        .on('click',function(d){
			          remove();
			          d3.select('#detailbar').style('display', 'block');
			          d3.select('#storename').html(d.name);
			          d3.select('#storeaddress').html(d.address);
			          d3.select('#d-t-rating').html('· Average Rating:\t\t'+d.stars);
			          d3.select('#d-t-keyword').html('· Keywords');
			          d3.select('#d-t-imgwords').html('· Selected Pictures');
			          drawdonut(d);
			          d3.select("#keywords").selectAll("g").remove();
			          d3.selectAll("image").remove();
			          drawkeyword(d);
			          appendpics(d);

			          console.log(d.business_id);
		        });
        circleBind.exit().remove();
        circleBind
            .attr("transform", function(d) {
				        return "translate("+leafletMap.latLngToLayerPoint(d.LatLng).x +","+leafletMap.latLngToLayerPoint(d.LatLng).y +")";
            });
		}
    window.updateMap = updateMap;

		leafletMap.on("viewreset", updateMap);
		updateMap();
	});
var dd = [0,0,0,0,0];
var keyword = ["","","","","","","","","",""];
var salesData=[
	{label:"one", color:"#3366CC"},
	{label:"two", color:"#DC3912"},
	{label:"three", color:"#FF9900"},
	{label:"four", color:"#109618"},
	{label:"five", color:"#990099"}
];
function remove(){
	d3.select("#keywords").selectAll("g").remove();
	
}
function getData(){
	return salesData.map(function(d, i){
		return {label:d.label, value:dd[i], color:d.color};});
}
// Returns a flattened hierarchy containing all leaf nodes under the root.
function flatten(root) {
  var nodes = [];

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    else nodes.push({name: node.name, value: node.size});
  }

  recurse(root);
  return {children: nodes};
}
function drawkeyword(d){
	var bleed = 100,
    width = 250,
    height = 250;
	var pack = d3.layout.pack()
	    .sort(null)
		.size([width, height + bleed * 2])
	    .padding(2);
	var svg=d3.select("#keywords")
		.attr("width", width)
		.attr("height", height)
		.append("g")
	    .attr("transform", "translate(0," + -bleed + ")");
	var keywords_file="data/key/"+d.business_id+".json";
	d3.json(keywords_file, function(error, json) {
		if (error) throw error;

		var node = svg.selectAll(".node")
			.data(pack.nodes(flatten(json))
			.filter(function(d) { return !d.children; }))
			.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

		node.append("circle")
			.attr("fill", 'grey')
			.attr("r", function(d) { return d.r; });

		node.append("text")
			.text(function(d) { return d.name; })
			.attr("class", "keyword")
			.style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 20) + "px"; })
			.attr("dy", ".35em");
	});	
	
}
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
