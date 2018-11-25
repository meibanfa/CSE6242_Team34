var bar = d3.select("#cates_filter"),
    margin_bar = {top: 40, right: 20, bottom: 30, left: 130},
    b_w = +bar.attr("width") - margin_bar.left - margin_bar.right,
    b_h = +bar.attr("height") - margin_bar.top - margin_bar.bottom;

var x_bar = d3.scale.linear().range([0, b_w]);
var y_bar = d3.scale.ordinal().rangeBands([b_h, 0], 0.1);

var g = bar.append("g")
      .attr("transform", "translate(" + margin_bar.left + "," + margin_bar.top + ")");

d3.csv("data/business-100-categ-frequence.csv", function(error, data) {
   if (error) throw error;

   data.sort(function(a, b) { return a.count - b.count; });
    console.log(data);

   x_bar.domain([50, 1250]).nice();
   y_bar.domain(data.filter(function(d){ return d.count >= 100;}).map(function(d) { return d.categs; }));

    g.append("g")
        .attr("class", "x_bar axis")
        .call(d3.svg.axis().orient("top").scale(x_bar))
          .selectAll("text")
      .attr("dx", "0.7em")
      .attr("dy", ".5em")
      .attr("transform", "rotate(-65)")
      .style("text-anchor", "start")
      .style("fill", "#fff")
      .style("font-family", "'latolight'");

    g.append("g")
        .attr("class", "y_bar axis")
        .call(d3.svg.axis().orient("left").scale(y_bar))
        .selectAll("text")
      .style("text-anchor", "end")
      .style("fill", "#fff")
      .style("font-family", "'latolight'");

    g.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("cat-class", function (d) {
            return d.categs.split(' ').join('-');
        })
        .attr("x", 0)
        .attr("height", y_bar.rangeBand())
        .attr("y", function(d) { return y_bar(d.categs); })
        .attr("width", function(d) { return x_bar(d.count); });

    g.selectAll(".bar")
        .on("mouseover", function(d){
          d3.select(this).attr("opacity","0.8"); })
         .on("mouseout", function(d){
           d3.select(this).attr("opacity","1"); })
         .on('click', selectCat);
});

function selectCat() {
    if(d3.select(this).classed("selected-bar")) {
        d3.select(this).classed("selected-bar",false);

        var target =d3.select(this).attr("cat-class");

        var targetcir = d3.selectAll('.cir-rev-selected').each(function (d) {
            var match = d3.select(this).attr("cat1-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat2-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat3-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat4-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat5-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat6-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat7-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat8-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat9-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat10-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat11-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat12-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat13-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }
            match = d3.select(this).attr("cat14-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', false);
            }


        });
        // d3.selectAll('.cir-rev-selected').style("opacity", 0);
        // d3.selectAll('.cir-cat-selected').style("opacity", 1);
        //

        var temp = 0;
        d3.selectAll('.cir-rev-selected').each(function (d) {
            if(d3.select(this).classed('cir-cat-selected')){
                temp = 1;
            }
        });

        if(temp != 1){
            d3.selectAll('.cir-rev-selected').style("opacity", 1);
        }
        else{
            d3.selectAll('.cir-rev-selected').style("opacity", 0);
        }
        d3.selectAll('.cir-cat-selected').style("opacity", 1);
        // d3.selectAll('.cir-rev-selected.cir-rev-selected.cir-cat-selected').classed('cir-notslected', false);
        // d3.selectAll('.circleMap').classed('cir-notslected', false);



    }
    else{
        d3.select(this).classed("selected-bar",true);

        var target =d3.select(this).attr("cat-class");

        var targetcir = d3.selectAll('.cir-rev-selected').each(function (d) {
            var match = d3.select(this).attr("cat1-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat2-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat3-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat4-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat5-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat6-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat7-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat8-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat9-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat10-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat11-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat12-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat13-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }
            match = d3.select(this).attr("cat14-class");
            if(target == match) {
                d3.select(this).classed('cir-cat-selected', true);
            }


        });

        d3.selectAll('.cir-rev-selected').style("opacity", 0);
        d3.selectAll('.cir-cat-selected').style("opacity", 1);

    }

    // d3.selectAll('.circleMap').classed('cir-notslected', true);
    // d3.selectAll('.cir-rev-selected.cir-rev-selected.cir-cat-selected').classed('cir-notslected', false);


}
