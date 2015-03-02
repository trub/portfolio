// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation({
  	orbit: {
		animation: 'fade', // Sets the type of animation used for transitioning between slides, can also be 'fade'
		timer_speed: 5000, // Sets the amount of time in milliseconds before transitioning a slide
		pause_on_hover: false, // Pauses on the current slide while hovering
		resume_on_mouseout: false, // If pause on hover is set to true, this setting resumes playback after mousing out of slide
		animation_speed: 500, // Sets the amount of time in milliseconds the transition between slides will last
		slide_number: false,
		navigation_arrows: true,
		swipe: true
  	}
});


// Scroll

function scrollToDiv(element,navheight){
	var offset = element.offset();
  	var offsetTop = offset.top;
  	var totalScroll = offsetTop-navheight;
  	$('body, html').animate({scrollTop: totalScroll}, 800);
}

$('#menu a, #scroll').click(function(e) { 
	e.preventDefault(); 
  	var el = $(this).attr('href');
  	var elWrapped = $(el);
  	scrollToDiv(elWrapped,0);    
});

$('.section').waypoint(function(direction) {
    var $active = $(this);
    if (direction === "up") {
    	$active = $active.prev();
    }
    if (!$active.length) {
    	$active.end();
    }
    var currentId = $active.attr('id');
    $('#menu a').removeClass('active');
    $('#menu a[href=#'+currentId+']').addClass('active');
    }, { offset: '30%' }
);


// Headroom

var navigationHeadroom = (function() {

    var docElem = document.documentElement,
        nav = document.querySelector("#navigation"),
        didScroll = false,
        changeHeaderOn = 600;

	var headroom = new Headroom(nav, {
	  	"tolerance": 0,
	  	"offset": 600,
	  	"classes": {
	    	"initial": "headroom",
	    	"pinned": "pinned",
	    	"unpinned": "unpinned"
	  	}
	});

    function init() {
        window.addEventListener("scroll", function(event) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout(scrollPage, 0);
            }
        }, false);
    }
 
    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
        	headroom.init();
        } else {
        	headroom.destroy();
        }
        didScroll = false;    
    }
 
    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();

})();


// Animate On Scroll

new AnimOnScroll(document.getElementById('grid'), {
	minDuration : 0.4,
	maxDuration : 0.6,
	viewportFactor : 0.2
});


// Open Project

$('.project-item').click(function () {

    var projectID = '#' + $(this).data('project-id');
    
    $('.project').hide();
    
    $(projectID).show();

    $('html, body').animate({
        scrollTop: $(projectID).offset().top - 76
    }, 600);

});

$('.project-close').click(function () {

    $(this).closest('.project').hide();

    $('html, body').animate({
        scrollTop: $('#portfolio').offset().top - 76
    }, 600);

});


// Menu On Small Screen

$('#menu a').click(function() { 
    $('#top-bar').removeClass('expanded'); 
});


// Contact Form

$( "#contact-form" ).submit(function( event ) {

    $(this).each(function(){
        var count = $(this).find(':input[data-invalid]').length;
        if (count === 0) {
            
            var url = "./php/form.php";
            var data = $(this).serialize();
            var success = $(this).append( "<p>Thank You! Your message has been sent.</p>" );

            $.ajax({
              type: "POST",
              url: url,
              data: data,
              success: success
            });

        }
    });

    event.preventDefault();

});


// Google Maps Theme

var googlemaptheme = [
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#acbcc9"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#f2e5d4"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5c6c6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e4d7c6"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbfaf7"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5dac6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 33
            }
        ]
    },
    {
        "featureType": "road"
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 20
            }
        ]
    },
    {},
    {
        "featureType": "road",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    }
];


  

// Google Maps Initialize

function initialize() {
  	var mapOptions = {
    	zoom: 12,
    	center: new google.maps.LatLng(47.614848,-122.3358423),
    	scrollwheel: false,
    	mapTypeControl: false,
    	styles: googlemaptheme
  	}

  	
  	var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
  	var myLatLng = new google.maps.LatLng(47.614848,-122.3358423);
  	var image = 'images/google-maps/pin.png';

  	var contentString = '<h3>Seattle, WA</h3>';

  	var infowindow = new google.maps.InfoWindow({
    	content: contentString
  	});

  	var marker = new google.maps.Marker({
      	position: myLatLng,
      	map: map,
      	icon: image,
      	title: "Hi there"
  	});

  	infowindow.open(map,marker);

  	google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map,marker);
	});
}

google.maps.event.addDomListener(window, 'load', initialize); 


