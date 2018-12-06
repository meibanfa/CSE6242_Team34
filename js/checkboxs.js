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

function review_filter(data) {
    if (window.review_state === undefined)
        console.error("should not happen");

    let review_state = window.review_state;
    if (!review_state.size)
        return data;

    const range_map = {
        1: [3500 , 4500],
        2: [3000 , 3500],
        3: [2500 , 3000],
        4: [2000 , 2500],
        5: [1500 , 2000],
        6: [1000 , 1500],
        7: [500 , 1000],
        8: [100 , 500]
    };

    let ans = data.filter(d => {
        for (let review_sel of review_state) {
            let range = range_map[review_sel];
            if (d.review_count >= range[0] && d.review_count <= range[1])
                return true;
        }
        return false;
    });

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


