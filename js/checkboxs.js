function initialBoxs(){
    d3.selectAll('.circleMap').classed('cir-rev-selected', false).classed("cir-cat-selected",false)
        .classed('cir-star-selected', false).classed('cir-mul-selected', false);
    d3.selectAll('.circleMap').classed('cir-notslected', false);

    d3.selectAll(".selected-bar").classed("selected-bar",false);
    // d3.selectAll("check").setAttribute("checked", "");
    // var checked = document.getElementsByClassName('check')..setAttribute("checked", "");;

}

// *********************** checkbox status *****************************
function toggleCheckbox(element){
    if (element.checked) {
        element.setAttribute("checked", "checked");
        selectBoxs(element);
    } else {
        element.setAttribute("checked", "");
        unselectBoxs(element);
    }
}
// *********************** checkbox status *****************************

function star_filter(data) {
    if (window.star_state === undefined)
        console.error("should not happen");

    var star_state = window.star_state;
    if (!star_state.size)
        return data;

    var star_allowed = new Set();
    for (let el of star_state) {
        star_allowed.add(el);
        star_allowed.add(el + 0.5);
    }

    var ans = data.filter(d => star_allowed.has(d.stars));

    return ans;
}

var star_state = new Set();
var review_state = new Set();

function selectBoxs(target) {
    var targetid = target.id;

    var ident = targetid.charAt(0);

    if (ident === "c") {
        let star = parseInt(targetid.charAt(1));
        console.log("target is the stars", star);
        star_state.add(star);
        if (window.updateMap)
            window.updateMap();
    }
    else {
        let review = parseInt(targetid.charAt(1));
        console.log("target is the review box", review);
        review_state.add(review);
        if (window.updateMap)
            window.updateMap();
    }

}


function unselectBoxs(target) {

    var targetid = target.id;

    var ident = targetid.charAt(0);

    if (ident === "c") {
        let star = parseInt(targetid.charAt(1));
        console.log("Remove star", star);
        star_state.delete(star);
        if (window.updateMap)
            window.updateMap();
    }
    else {
        let review = parseInt(targetid.charAt(1));
        console.log("Remove review", review);
        review_state.delete(review);
        if (window.updateMap)
            window.updateMap();
    }

}


