//= require_tree .

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

$(document).ready(function() {
    $('.heading h1').lettering();
    /*for(var i=1; i<totalCirclesOnScreenAtAnyMoment; i++) {
        var circle = document.createElement('div');
        circle.id = "circle-" + i;
        $('body').append(circle);
        animateRandomCircle(circle);
    }*/
})