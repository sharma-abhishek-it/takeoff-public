//= require jquery.lettering
//= require swiper.min

var colors = ['#E74C3C', '#22A7F0', '#03A678', '#EB974E'];
var radius = 120; // in px
var minTimeForTween = 3; //in seconds
var scales = [1, 2, 3, 4];

var totalCirclesOnScreenAtAnyMoment = 5;

function animateRandomCircle(circle) {
    circle.style.position = 'absolute';
    circle.style.zIndex = '1';
    
    var randomScale = scales[Math.floor(Math.random()*5)];
    var randomRadius = radius / randomScale;
    
    circle.style.width = randomRadius + "px";
    circle.style.height = randomRadius + "px";
    circle.style.borderRadius = randomRadius + "px";
    circle.style.backgroundColor = colors[Math.floor(Math.random()*3)];

    circle.style.top = "";
    circle.style.opacity = "1";
    circle.style.bottom = (0) + "px";
    circle.style.left = Math.floor(document.body.clientWidth * Math.random()) + "px";

    TweenMax.to(circle, minTimeForTween * randomScale, 
        {
            top: (0) + "px", opacity: 0.15,
            ease: Linear.easeNone,
            onComplete: function() {
                animateRandomCircle(circle);
            }
        });
}


var sheet = (function() {
    // Create the <style> tag
    var style = document.createElement("style");

    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute("media", "screen")
    // style.setAttribute("media", "@media only screen and (max-width : 1024px)")

    // WebKit hack :(
    style.appendChild(document.createTextNode(""));

    // Add the <style> element to the page
    document.head.appendChild(style);

    return style.sheet;
})();
function addCSSRule(sheet, selector, rules, index) {
    if(sheet.insertRule) {
        sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else {
        sheet.addRule(selector, rules, index);
    }
}

$(document).ready(function() {
    var cssRule = "width:" + $(window).width() + 'px' + ";height:" + $(window).height() + 'px;';
    addCSSRule(document.styleSheets[0], ".swiper-container", cssRule);

    $('.swiper-container').swiper(
        {
            mode: 'horizontal'    
        });      
    /*for(var i=1; i<totalCirclesOnScreenAtAnyMoment; i++) {
        var circle = document.createElement('div');
        circle.id = "circle-" + i;
        $('body').append(circle);
        animateRandomCircle(circle);
    }*/
})