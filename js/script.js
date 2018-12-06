// *********************** show/hide sidebar *****************************
var showfilter = document.getElementById("map");
var reset = document.getElementById("reset");
var checked = document.getElementsByClassName('check');
var close = document.getElementById('close');


showfilter.addEventListener('click', function(){
   document.getElementById('filterbar').style.width = '0px';
   // document.getElementById('detailbar').style.display = "none";
});

close.addEventListener('click', function(){
   document.getElementById('detailbar').style.display = 'none';
});

reset.addEventListener('click', function(){
   document.getElementById('filterbar').style.width = '470px';
   var checked = document.getElementsByName('check');
   for (var i = 0; i < checked.length; i++) {
      if (document.getElementsByName("check")[i].checked) {
               document.getElementsByName("check")[i].checked = false;
           }
   }
   window.star_state.clear();
   window.review_state.clear();

   d3.selectAll('.circleMap').style("opacity", 1);
   d3.selectAll('.cir-star-selected').class('cir-star-selected', false);
   d3.selectAll('.cir-rev-selected').class('cir-rev-selected', false);
   d3.selectAll('.cir-cat-selected').class('cir-cat-selected', false);
   d3.selectAll('.selected-bar').class('selected-bar', false);


});

// *********************** show/hide sidebar end *****************************

