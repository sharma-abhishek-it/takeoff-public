//= require jquery.lettering
//= require swiper.min
//= require bootstrap-paginator.min

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
    // ******************** Mobile code
    var cssRule = "width:" + $(window).width() + 'px' + ";height:" + $(window).height() + 'px;';
    addCSSRule(document.styleSheets[0], ".swiper-container", cssRule);
    $('.swiper-container').swiper(
        {
            mode: 'horizontal'    
        });      
    
    var arrows = $('#arrows img');
    TweenMax.staggerFrom([arrows[2], arrows[1], arrows[0]], 0.6, {opacity: 0, repeat: -1, yoyo: true, delay: 1, repeatDelay: 0.4}, 0.20); 

    
    // ******************** Desktop code
    var wibesInterval = null;
    var wibeTween = null;
    var onHomePage = true;
    var paginator = $('#paginator');
    var slides = $('.desktop-layout .slide');
    $('#logo-content').show();

    function showDesktopSlide(page, fromHomePage) {
        TweenMax.killAll();

        slides.removeClass('active');
        $(slides[page-1]).addClass('active');

        var animationProp = {scale: 1, opacity: 1};
        if (fromHomePage) {
            animationProp.onComplete = function() {
                $('#footer-logo').fadeIn();
            }
        }
        TweenMax.fromTo(slides[page-1], 0.6, {scale: 0, opacity: 0}, animationProp);
    }
    
    paginator.bootstrapPaginator(
        {
            currentPage: 1, 
            totalPages: slides.length,
            onPageChanged: function(e,oldPage,newPage) {
                showDesktopSlide(newPage);
                console.log("Page changed is - " + newPage);
            },
            onPageClicked: function(e,originalEvent,type,page) {
                e.stopImmediatePropagation();
                showDesktopSlide(page);
                console.log("Page clicked is - " + page);
            }
        });

    TweenMax.fromTo($('#hider')[0], 1, {left: 0}, {left: '100%', delay: 0.6, ease: Linear.easeNone, 
        onComplete: function(){
            wibeTween = TweenMax.fromTo($('#gola-wibe')[0], 1, {scale: 1, opacity: 1}, {scale: 6, opacity: 0, delay: 1});
            wibesInterval = setInterval(function(){
                wibeTween = TweenMax.fromTo($('#gola-wibe')[0], 1, {scale: 1, opacity: 1}, {scale: 6, opacity: 0});
            }, 3200);
        }});
    
    $('#gola').click(function(){
        if (onHomePage) {
            $('#logo-content').hide();
            clearInterval(wibesInterval);
            if (wibeTween != null) {
                wibeTween.seek(10);
            }
            
            $('#slides-container').show();
            $('#footer-logo').fadeIn();
            
            showDesktopSlide(1);
            onHomePage = false;
        } else {
            pages = paginator.bootstrapPaginator("getPages");
            console.log(pages.current + ' - ' + pages.total);

            if ( pages.current == pages.total ) {
                paginator.bootstrapPaginator("showFirst");
            } else {
                paginator.bootstrapPaginator("showNext");
            }
        }
    })

    /*for(var i=1; i<totalCirclesOnScreenAtAnyMoment; i++) {
        var circle = document.createElement('div');
        circle.id = "circle-" + i;
        $('body').append(circle);
        animateRandomCircle(circle);
    }*/
})