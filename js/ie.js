// Headroom

var navigationHeadroomIE = (function() {

    var docElem = document.documentElement,
        nav = document.querySelector("#navigation"),
        didScroll = false,
        changeHeaderOn = 600;

    function init() {
        window.addEventListener("scroll", function(event) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout(scrollPage, 0);
            }
        }, false);
    }

    var lastScrollTop = 0;

    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
             $(nav).removeClass("pinned");
        } else {
            var sy = scrollY();
            if ( sy >= changeHeaderOn ) {
                $(nav).addClass("pinned");
            } else {
                $(nav).removeClass("pinned");
            }
            didScroll = false;  
        }
        lastScrollTop = st;
    });
 
    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();

})();