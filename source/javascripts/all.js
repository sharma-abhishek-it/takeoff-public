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
    /*$('.heading h1').lettering();
    var left = $('.section.one')[0];
    var right = $('.section.two')[0];
    $('.section.two').css({left: $('.section.one').width()});
    Hammer(left).on("swipeleft", function() {
        TweenMax.to(right, 100, {left: "0px"});
    })*/

    /*Hammer($('#front-logo')[0]).on("dragleft", function() {
        $('#slides-container').addClass('active');
        $(slides[0]).addClass('active');
        $(headings[0]).addClass('active');
        currentlyActive = 0;
        TweenMax.to($('#slides-container')[0], 0.5, 
            {marginLeft: '0'})
    });

    var slides = $('.slide');
    var headings = $('.heading-content');
    var currentlyActive = -1; 
    $('#slides-container'[0]).on("dragleft", function(){
        var newActive = currentlyActive + 1;
        if (newActive == slides.length) return;
        var oldActive = currentlyActive;

        $(slides[newActive]).addClass('active');
        $(headings[newActive]).addClass('active');
        TweenMax.to(slides[newActive], 0.5, 
            {marginLeft: '0', onComplete: function(){
                if (oldActive >= 0) $(slides[oldActive]).removeClass('active');
            }});
        if (oldActive >= 0) TweenMax.to(headings[oldActive], 0.5, {scale: 0, onComplete: function(){
                if (oldActive >= 0) $(headings[oldActive]).removeClass('active');
            }});
        TweenMax.to(headings[newActive], 0.5, {scale: 1});

        currentlyActive = newActive;;
    })*/
    var slides = $('.slide');
    var currentSlide = 0;
    var sliding = false;
    Hammer($('#sliding-layout')[0]).on("dragleft", function() {
        console.log('Next - ' + currentSlide);
        var nextSlide = currentSlide + 1;
        if (nextSlide == slides.length || sliding) return;
        
        sliding = true;
        currentSlide = nextSlide;
        var left = Math.floor($('.slide:eq('+nextSlide+')').position().left);
        TweenMax.to(window, 0.5, {scrollTo:{x: left}, ease: Power3.easeOut, onComplete: function(){
            sliding = false;
        }})
    });
    Hammer($('#sliding-layout')[0]).on("dragright", function() {
        console.log('Back - ' + currentSlide);
        var prevSlide = currentSlide - 1;
        if (prevSlide < 0 || sliding) return;
        
        sliding = true;
        currentSlide = prevSlide;
        var left = Math.floor($('.slide:eq('+prevSlide+')').position().left);
        TweenMax.to(window, 0.5, {scrollTo:{x: left}, ease: Power3.easeOut, onComplete: function(){
            sliding = false;
        }})
    });
    
    /*for(var i=1; i<totalCirclesOnScreenAtAnyMoment; i++) {
        var circle = document.createElement('div');
        circle.id = "circle-" + i;
        $('body').append(circle);
        animateRandomCircle(circle);
    }*/
})