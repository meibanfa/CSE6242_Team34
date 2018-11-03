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
		data = data.filter(function(d) {
			if(d.categories){
				if(d.categories.includes("Restaurant")|| d.categories.includes("Food")){
					return !isNaN(d.longitude) & !isNaN(d.latitude);
				}
			}
			return false;
		});
		data.forEach(function(d){
			console.log(1);
			d.LatLng = new L.LatLng(d.latitude, d.longitude);
		});
		var circleBind = circleGroup.selectAll("g")
		.data(data);
		var mapCircles = circleBind.enter()
		.append("g")
		.append("circle")
		.attr("pointer-events", "visible")
		.attr("r", 5)
		.attr("class", "circleMap")
		.on('click',function(d){
			d3.select('#detailbar').style('display', 'block');
			d3.select('#storename').html(d.name);
			d3.select('#storeaddress').html(d.address);
			d3.select('#d-t-rating').html('· Average Rating:\t\t'+d.stars);
			drawdonut(d);
//			chosen(d);
//			stack(d.business_id);
			console.log(d.business_id);
		});


		function updateMap() {
			mapCircles.attr("transform",function(d) {
				return "translate("+leafletMap.latLngToLayerPoint(d.LatLng).x +","+leafletMap.latLngToLayerPoint(d.LatLng).y +")";
			});
		}

		leafletMap.on("viewreset", updateMap);
		updateMap();
	});
function drawdonut(d){
	Donut3D.draw("donut", randomData(), 100, 120, 90, 75, 30, 0.4);
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

var salesData=[
	{label:"one", color:"#3366CC"},
	{label:"two", color:"#DC3912"},
	{label:"three", color:"#FF9900"},
	{label:"four", color:"#109618"},
	{label:"five", color:"#990099"}
];
function randomData(){
	return salesData.map(function(d){
		return {label:d.label, value:1000*Math.random(), color:d.color};});
}
function chosen(d){
	(function(d3) {
		'use strict';
		var widthpie = 230;
		var heightpie = 230;
		var radiuspie = Math.min(widthpie, heightpie) / 2;
		var donutWidth = 55;
		var legendRectSizePie = 12;
		var legendSpacingPie = 3;
		var colorpie = d3.scaleOrdinal()
		.range(["#fcd6d6", "#ff9e9e", "#e26c6c","#db4c4c","#d32828"]);
		var svgDonut = d3.select('#donut')
			.attr('width', widthpie)
			.attr('height', heightpie)
			.append('g')
			.attr('class', 'legendDonutG')
			.attr('transform', 'translate(' + (widthpie / 2) +
				',' + (heightpie / 2) + ')');
		var arcDonut = d3.arc()
          .innerRadius(radiuspie - donutWidth)
          .outerRadius(radiuspie);

        var pie = d3.pie()
          .value(function(d) { return d.count; })
          .sort(null);

        var tooltipDonut = d3.select('#donut')
           .append('div')
           .attr('class', 'tooltipDonut');

        tooltipDonut.append('div')
           .attr('class', 'label');

        tooltipDonut.append('div')
           .attr('class', 'count');
        tooltipDonut.append('div')
           .attr('class', 'percent');

        //test: id: _3olhuCXhoqjy4M2rBp1YA
        var prefix="data/";
        //var filename=prefix.concat("tmp")+".csv";
        var filename=prefix+"tmp.csv";

        d3.csv(filename, function(error, dataset) {
		    dataset.forEach(function(d) {
            d.count = +d.count;
          });

          var path = svgDonut.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('class', 'donutPath')
            .attr('d', function(d){
				return arcDonut(d);
			})
            .attr('fill', function(d, i) {
              return colorpie(d.data.star);
            });

          path.on('mouseover', function(d) {
            var total = d3.sum(dataset.map(function(d) {
               return d.count;
            }));
            var percent = Math.round(1000 * d.data.count / total) / 10;
              tooltipDonut.select('.label').html("Number of "+d.data.star + " rating:");
              tooltipDonut.select('.count').html(d.data.count);
              tooltipDonut.select('.percent').html(percent + '% of total');
              tooltipDonut.style('display', 'block');
          });

          path.on('mouseout', function() {
             tooltipDonut.style('display', 'none');
           });

          path.on('mousemove', function(d) {
            tooltipDonut.style('top', (d3.event.pageY -50) + 'px')
              .style('left', (d3.event.pageX -50) + 'px');
          });
          path.on('click',function(d){
              var index =d.data.star.substring(4,6);
              var index2 =d.data.star.substring(5,6);
              d3.select(".starword").html("· Keyword of " +index2+" Star Rating ·");

              var BID=businessid;
              var nextFile=BID.concat(index)+".csv";
               console.log(nextFile);
             //word(nextFile);
          });

          var legendDonut = svgDonut.selectAll('.legendDonut')
            .data(colorpie.domain())
            .enter()
            .append('g')
            .attr('class', 'legendDonut')
            .attr('transform', function(d, i) {
              var heightpie = legendRectSizePie + legendSpacingPie;
              var offset =  heightpie * colorpie.domain().length / 2;
              var horz = -2 * legendRectSizePie;
              var vert = i * heightpie - offset;
              return 'translate(' + horz + ',' + vert + ')';
            });

          legendDonut.append('rect')
            .attr('width', legendRectSizePie)
            .attr('height', legendRectSizePie)
            .style('fill', colorpie)
            .style('stroke', colorpie)

          legendDonut.append('text')
            .attr('x', legendRectSizePie + legendSpacingPie)
            .attr('y', legendRectSizePie - legendSpacingPie)
            .text(function(d) { return d; });

        });

})(window.d3);
   d3.selectAll(".donutPath").remove();
}

function stack(businessid){

  var margin_s = {top: 20, right: 20, bottom: 60, left: 40},
      s_w = 620 - margin_s.left - margin_s.right,
      s_h = 340 - margin_s.top - margin_s.bottom;

  var s_x = d3.scaleBand()
      .rangeRound([0, s_w], .1);

  var s_y = d3.scaleLinear()
      .rangeRound([s_h, 0]);

  var s_color = d3.scaleOrdinal()
      .range(["#fcd6d6", "#ff9e9e", "#e26c6c","#db4c4c","#d32828"]);

  var stack_svg = d3.select("#stack")
      .attr("width", s_w + margin_s.left + margin_s.right)
      .attr("height", s_h + margin_s.top + margin_s.bottom)
    .append("g")
      .attr("transform", "translate(" + margin_s.left + "," + margin_s.top + ")");

  var active_link = "0"; //to control legend selections and hover
  var legendClicked; //to control legend selections
  var legendClassArray = []; //store legend classes to select bars in plotSingle()
  var y_orig; //to store original y-posn
  
  var prefix ="data/stack.csv";
//  var filename = prefix.concat(businessid)+".csv";
  var filename = prefix;
  d3.csv(filename, function(error, data) {
    if (error) throw error;

    s_color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

    data.forEach(function(d) {
      var mydate = d.date; //add to stock code
      var y0 = 0;
      //d.ages = s_color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.ages = s_color.domain().map(function(name) { return {mydate:mydate, name: name, y0: y0, y1: y0 += +d[name]}; });
      d.total = d.ages[d.ages.length - 1].y1;

    });

    data.sort(function(a, b) { return d3.ascending(a.date, b.date); });

    s_x.domain(data.map(function(d) { return d.date; }));
    s_y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();

    stack_svg.append("g")
        .attr("class", "x axis_s")
        .attr("transform", "translate(0," + s_h + ")")
        .call(d3.axisBottom(s_x))
        .selectAll("text")
         .attr("transform", "rotate(-90)")
         .attr("dy", "-0.52em")
        .attr("dx", "-1em")
        .style("font-family", "'latolight")
        .style("font-size", '8px')
        .style("text-anchor", "end")
        .style("fill", "#fff")
        ;

    stack_svg.append("g")
        .attr("class", "y axis_s")
        .call(d3.axisLeft(s_y))
        .selectAll("text")
        .style("font-family", "'latolight")
        .style("fill", "#fff");

    stack_svg.append("g")
        .attr("class", "y axis_s")
        .append("text")
        .attr("x", 2)
        .attr("y", s_y(s_y.ticks()) - 6)
        .attr("dy", "-0.32em")
        .style("text-anchor", "start")
        .style("fill", "#fff")
        .style("font-size", "12px")
        .text("Total of New Star Ratings")

    var date = stack_svg.selectAll(".date")
        .data(data)
      .enter().append("g")
        .attr("class", "g s_rect")
        .attr("transform", function(d) { return "translate(" + "0" + ",0)"; });
        //.attr("transform", function(d) { return "translate(" + x(d.date) + ",0)"; })

    date.selectAll("rect")
        .data(function(d) {
          return d.ages;
        })
      .enter().append("rect")
        .attr("width", s_x.bandwidth()-3)
        .attr("y", function(d) { return s_y(d.y1); })
        .attr("x",function(d) { //add to stock code
            return s_x(d.mydate)
          })
        .attr("height", function(d) { return s_y(d.y0) - s_y(d.y1); })
        .attr("class", function(d) {
          classLabel = d.name.replace(/\s/g, ''); //remove spaces
          return "class" + classLabel;
        })
        // .attr("transition", "0.2s")
        .style("fill", function(d) { return s_color(d.name); });

    date.selectAll("rect")
         .on("mouseover", function(d){

            var delta = d.y1 - d.y0;
            var xPos = parseFloat(d3.select(this).attr("x"));
            var yPos = parseFloat(d3.select(this).attr("y"));
            var s_h = parseFloat(d3.select(this).attr("height"))

            d3.select(this).attr("opacity","0.8");

            stack_svg.append("text")
            .attr("x",xPos)
            .attr("y",yPos +s_h/2)
            .attr("class","tooltip_stack")
            .text(d.name +": "+ delta);

         })
         .on("mouseout",function(){
            stack_svg.select(".tooltip_stack").remove();
            d3.select(this).attr("opacity","1");

          })


    var legend = stack_svg.selectAll(".legend")
        .data(s_color.domain().slice().reverse())
      .enter().append("g")
        //.attr("class", "legend")
        .attr("class", function (d) {
          legendClassArray.push(d.replace(/\s/g, '')); //remove spaces
          return "legend";
        })
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    //reverse order to match order in which bars are stacked
    legendClassArray = legendClassArray.reverse();

    legend.append("rect")
        .attr("x", s_w - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", s_color)
        .attr("id", function (d, i) {
          return "id" + d.replace(/\s/g, '');
        })
        .on("mouseover",function(){

          if (active_link === "0") d3.select(this).style("cursor", "pointer");
          else {
            if (active_link.split("class").pop() === this.id.split("id").pop()) {
              d3.select(this).style("cursor", "pointer");
            } else d3.select(this).style("cursor", "auto");
          }
        })
        .on("click",function(d){

          if (active_link === "0") { //nothing selected, turn on this selection
            d3.select(this)
              .style("stroke", "#fff")
              .style("stroke-width", 2);

              active_link = this.id.split("id").pop();
              plotSingle(this);

              //gray out the others
              for (i = 0; i < legendClassArray.length; i++) {
                if (legendClassArray[i] != active_link) {
                  d3.select("#id" + legendClassArray[i])
                    .style("opacity", 0.5);
                }
              }

          } else { //deactivate
            if (active_link === this.id.split("id").pop()) {//active square selected; turn it OFF
              d3.select(this)
                .style("stroke", "none");

              active_link = "0"; //reset

              //restore remaining boxes to normal opacity
              for (i = 0; i < legendClassArray.length; i++) {
                  d3.select("#id" + legendClassArray[i])
                    .style("opacity", 1);
              }

              //restore plot to original
              restorePlot(d);

            }

          } //end active_link check


        });

    legend.append("text")
        .attr("x", s_w - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("fill", "#fff")
        .style("font-size", "14px")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

    function restorePlot(d) {

      date.selectAll("rect").each(function (d, i) {
        //restore shifted bars to original posn
        d3.select(d[idx])
          .transition()
          .duration(200)
          .attr("y", y_orig[i]);
      })

      //restore opacity of erased bars
      for (i = 0; i < legendClassArray.length; i++) {
        if (legendClassArray[i] != class_keep) {
          d3.selectAll(".class" + legendClassArray[i])
            .transition()
            .duration(200)
            // .delay(350)
            .style("opacity", 1);
        }
      }

    }

    function plotSingle(d) {

      class_keep = d.id.split("id").pop();
      idx = legendClassArray.indexOf(class_keep);

      //erase all but selected bars by setting opacity to 0
      for (i = 0; i < legendClassArray.length; i++) {
        if (legendClassArray[i] != class_keep) {
          d3.selectAll(".class" + legendClassArray[i])
            .transition()
            .duration(200)
            .style("opacity", 0);
        }
      }

      //lower the bars to start on x-axis
      y_orig = [];
      date.selectAll("rect").each(function (d, i) {

        //get height and y posn of base bar and selected bar
        h_keep = d3.select(d[idx]).attr("height");
        y_keep = d3.select(d[idx]).attr("y");
        //store y_base in array to restore plot
        y_orig.push(y_keep);

        h_base = d3.select(d[0]).attr("height");
        y_base = d3.select(d[0]).attr("y");

        h_shift = h_keep - h_base;
        y_new = y_base - h_shift;

        //reposition selected bars
        d3.select(d[idx])
          .transition()
          .ease("bounce")
          .duration(200)
          .delay(750)
          .attr("y", y_new);

      })

    }

  });
   d3.selectAll(".axis_s").remove();
   d3.selectAll(".s_rect").remove();
}

