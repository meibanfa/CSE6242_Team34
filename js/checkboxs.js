function initialBoxs(){
    d3.selectAll('.circleMap').classed('cir-rev-selected', false).classed("cir-cat-selected",false)
        .classed('cir-star-selected', false).classed('cir-mul-selected', false);
    d3.selectAll('.circleMap').classed('cir-notslected', false);

    d3.selectAll(".selected-bar").classed("selected-bar",false);
    // d3.selectAll("check").setAttribute("checked", "");
    // var checked = document.getElementsByClassName('check')..setAttribute("checked", "");;

}


function selectBoxs(target) {
    var targetid = target.id;

    var ident = targetid.charAt(0);

    // var multifilter = 0;
    //
    // d3.selectAll('.circleMap').each(
    //     if(d3.select(this).classed('cir-cat-selected')){
    //         multifilter = 1;
    // });

    if(ident == 'c'){
        // console.log(" target is the stars");

        var targetstar1 = targetid.charAt(1);
        var targetstar2 = targetid.charAt(1) +".5";

        d3.selectAll('.circleMap').each(function (d) {
            var match = d3.select(this).attr("star-class");
            if (targetstar1 == match || targetstar2 == match) {
                d3.select(this).classed('cir-star-selected', true);
            }
        });


        d3.selectAll('.circleMap').style("opacity", 0);
        d3.selectAll('.cir-star-selected').style("opacity", 1);
        // d3.selectAll('.circleMap').classed('cir-notslected', true);
        // d3.selectAll('.cir-star-selected.cir-rev-selected.cir-cat-selected').classed('cir-notslected', false);

    }
    else{

        console.log(" target is review boxs");

        var targetstar1 = targetid.charAt(1);


        d3.selectAll('.cir-star-selected').each(function (d) {
            var match = d3.select(this).attr("review-class");
            // (d3.select(this).classed('cir-star-selected')) &&

            if ( targetstar1 =="8" && parseInt(match)>= 100 && parseInt(match)< 500 ){
                d3.select(this).classed('cir-rev-selected', true);
            }

            if ( targetstar1 =="7" && parseInt(match)>= 500 && parseInt(match)< 1000 ){
                d3.select(this).classed('cir-rev-selected', true);
            }
            if ( targetstar1 =="6" && parseInt(match)>= 1000 && parseInt(match)< 1500 ){
                d3.select(this).classed('cir-rev-selected', true);
            }
            if ( targetstar1 =="5" && parseInt(match)>= 1500 && parseInt(match)< 2000 ){
                d3.select(this).classed('cir-rev-selected', true);
            }
            if ( targetstar1 =="4" && parseInt(match)>= 2000 && parseInt(match)< 2500 ){
                d3.select(this).classed('cir-rev-selected', true);
            }
            if ( targetstar1 =="3" && parseInt(match)>= 2500 && parseInt(match)< 3000 ){
                d3.select(this).classed('cir-rev-selected', true);
            }
            if ( targetstar1 =="2" && parseInt(match)>= 3000 && parseInt(match)< 3500 ){
                d3.select(this).classed('cir-rev-selected', true);
            }
            if ( targetstar1 =="1" && parseInt(match)>= 3500 && parseInt(match)< 4500 ){
                d3.select(this).classed('cir-rev-selected', true);
            }
        });

        d3.selectAll('.circleMap').style("opacity", 0);
        d3.selectAll('.cir-rev-selected').style("opacity", 1);

    }



}


function unselectBoxs(target) {

    var targetid = target.id;

    var ident = targetid.charAt(0);

    if(ident == 'c'){
        console.log(" target is the stars");

        var targetstar1 = targetid.charAt(1);

        d3.selectAll('.circleMap').each(function (d) {
            var match = d3.select(this).attr("star-class");
            if (targetstar1 == match.charAt(0)){
                d3.select(this).classed('cir-star-selected', false);
            }
        });

        var temp = 0;
        d3.selectAll('.circleMap').each(function (d) {
            if(d3.select(this).classed('cir-star-selected')){
                temp = 1;
            }
        });

        if(temp != 1){
            d3.selectAll('.circleMap').style("opacity", 0);
        }
        else{
            d3.selectAll('.circleMap').style("opacity", 1);
        }
        d3.selectAll('.cir-star-selected').style("opacity", 1);
    }
    else{

        console.log(" target is review boxs");

        var targetstar1 = targetid.charAt(1);


        d3.selectAll('.cir-star-selected').each(function (d) {
            var match = d3.select(this).attr("review-class");

            if ( targetstar1 =="8" && parseInt(match)>= 100 && parseInt(match)< 500 ){
                d3.select(this).classed('cir-rev-selected', false);
            }

            if ( targetstar1 =="7" && parseInt(match)>= 500 && parseInt(match)< 1000 ){
                d3.select(this).classed('cir-rev-selected', false);
            }
            if ( targetstar1 =="6" && parseInt(match)>= 1000 && parseInt(match)< 1500 ){
                d3.select(this).classed('cir-rev-selected', false);
            }
            if ( targetstar1 =="5" && parseInt(match)>= 1500 && parseInt(match)< 2000 ){
                d3.select(this).classed('cir-rev-selected', false);
            }
            if ( targetstar1 =="4" && parseInt(match)>= 2000 && parseInt(match)< 2500 ){
                d3.select(this).classed('cir-rev-selected', false);
            }
            if ( targetstar1 =="3" && parseInt(match)>= 2500 && parseInt(match)< 3000 ){
                d3.select(this).classed('cir-rev-selected', false);
            }
            if ( targetstar1 =="2" && parseInt(match)>= 3000 && parseInt(match)< 3500 ){
                d3.select(this).classed('cir-rev-selected', false);
            }
            if ( targetstar1 =="1" && parseInt(match)>= 3500 && parseInt(match)< 4500 ){
                d3.select(this).classed('cir-rev-selected', false);
            }
        })


        var temp = 0;
        d3.selectAll('.circleMap').each(function (d) {
            if(d3.select(this).classed('cir-rev-selected')){
                temp = 1;
            }
        });

        if(temp != 1){
            d3.selectAll('.cir-star-selected').style("opacity", 1);
        }
        else{
            d3.selectAll('.cir-star-selected').style("opacity", 0);

        }
        d3.selectAll('.cir-rev-selected').style("opacity", 1);



    }


    // d3.selectAll('.cir-star-selected.cir-rev-selected.cir-cat-selected').classed('cir-notslected', false);

}


// function multifilterUpdate() {
//     d3.selectAll('.circleMap').classed('cir-notslected', true);
//     d3.selectAll(".cir-star-selected").classed('cir-mul-selected', false);
//     d3.selectAll(".cir-rev-selected").classed('cir-mul-selected', false);
//     d3.selectAll(".cir-cat-selected").classed('cir-mul-selected', false);
//
//     var temp0 = 0;
//     var temp1 = 0;
//     var temp2 = 0;
//
//     d3.selectAll('.circleMap').each(function (d) {
//
//
//
//         if(d3.select(this).classed('cir-star-selected') && (d3.select(this).classed("cir-rev-selected")) && (d3.select(this).classed("cir-cat-selected"))){
//             temp0= 1;
//             temp1 = 1;
//             temp2 = 1;
//             console.log(temp0);
//
//         }
//         if( temp0 == 1 && temp1 == 1 && temp2 == 1){
//             console.log("test");
//
//         }
//         else if((temp0+temp1+temp2) == 2){
//             if((!(d3.select(this).classed('cir-star-selected'))) && (d3.select(this).classed("cir-rev-selected")) && (d3.select(this).classed("cir-cat-selected")))
//             {
//                 temp0= 0;
//                 temp1 = 1;
//                 temp2 = 1;
//             }
//             if((d3.select(this).classed('cir-star-selected')) && (!(d3.select(this).classed("cir-rev-selected"))) && (d3.select(this).classed("cir-cat-selected"))){
//                 temp0= 1;
//                 temp1 = 0;
//                 temp2 = 1;
//             }
//             if((d3.select(this).classed('cir-star-selected')) && (d3.select(this).classed("cir-rev-selected")) && (!(d3.select(this).classed("cir-cat-selected")))){
//                 temp0= 1;
//                 temp1 = 1;
//                 temp2 = 0;
//             }
//         }
//         else{
//             if(!(d3.select(this).classed('cir-star-selected'))){
//                 temp0=1;
//                 temp1= 0;
//                 temp2 = 0;
//             }
//             else if(!(d3.select(this).classed("cir-rev-selected"))){
//                 temp0=0;
//                 temp1= 1;
//                 temp2 = 0;
//             }
//             else if(!(d3.select(this).classed("cir-cat-selected"))){
//                 temp0=0;
//                 temp1= 0;
//                 temp2 = 1;
//             }
//
//         }
//
//
//     });
//     console.log(temp0 + "," + temp1 +"," + temp2 );
//
//     if( temp0 == 1 && temp1 == 1 && temp2 == 1){
//
//
//         d3.selectAll('.circleMap').classed('cir-notslected', true);
//         d3.selectAll(".cir-star-selected.cir-rev-selected.cir-cat-selected").classed('cir-mul-selected', true).classed('cir-notslected', false);
//     }
//     if( temp0 == 1 && temp1 == 0 && temp2 == 1){
//
//         d3.selectAll(".cir-star-selected.cir-cat-selected").classed('cir-mul-selected', true);
//     }
//     if( temp0 == 0 && temp1 == 1 && temp2 == 1){
//
//         d3.selectAll(".cir-rev-selected.cir-cat-selected").classed('cir-mul-selected', true);
//     }
//     if( temp0 == 1 && temp1 == 1 && temp2 == 0){
//
//         d3.selectAll(".cir-star-selected.cir-rev-selected").classed('cir-mul-selected', true);
//     }
//
//     if( temp0 == 1 && temp1 == 0 && temp2 == 0) {
//         d3.selectAll(".cir-star-selected").classed('cir-mul-selected', true);
//     }
//     if(temp0 == 0 && temp1 == 1 && temp2 == 0) {
//         d3.selectAll(".cir-rev-selected").classed('cir-mul-selected', true);
//     }
//     if(temp0 == 0 && temp1 == 0 && temp2 == 1) {
//         d3.selectAll(".cir-cat-selected").classed('cir-mul-selected', true);
//     }
//
//
//
// }