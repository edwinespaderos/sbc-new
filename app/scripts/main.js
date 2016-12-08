/***************** Waypoints ******************/

$(document).ready(function() {

	$('.wp1').waypoint(function() {
		$('.wp1').addClass('animated fadeInLeft');
	}, {
		offset: '75%'
	});
	$('.wp2').waypoint(function() {
		$('.wp2').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp3').waypoint(function() {
		$('.wp3').addClass('animated fadeInDown');
	}, {
		offset: '55%'
	});
	$('.wp4').waypoint(function() {
		$('.wp4').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp5').waypoint(function() {
		$('.wp5').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp6').waypoint(function() {
		$('.wp6').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});

});

/***************** Slide-In Nav ******************/

$(window).load(function() {

	$('.nav_slide_button').click(function() {
		$('.pull').slideToggle();
	});

});

/***************** Smooth Scrolling ******************/

$(function() {

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 2000);
				return false;
			}
		}
	});

});

/***************** Nav Transformicon ******************/

document.querySelector("#nav-toggle").addEventListener("click", function() {
	this.classList.toggle("active");
});

/***************** Overlays ******************/

$(document).ready(function(){
    if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".img").click(function(e){
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img").hasClass("hover")) {
                $(this).closest(".img").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $(".img").mouseenter(function(){
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .mouseleave(function(){
            $(this).removeClass("hover");
        });
    }
});

/***************** Flexsliders ******************/

$(window).load(function() {

	$('#portfolioSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: false,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

	$('#servicesSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

	$('#teamSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

});


$(function () {
  $('[data-toggle="popover"]').popover()
})

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})

$('#confirm').click(function(){
    $("#underage").fadeOut("slow");
});

(function () {
    // https://gist.github.com/padolsey/6008842
    var makeInterpolator = (function() {
        var rc = {'\n': '\\n', '\"': '\\\"', '\u2028': '\\u2028', '\u2029': '\\u2029'};
        return function makeInterpolator(str) {
            return new Function(
                'o',
                'return "' + (
                    str
                    .replace(/["\n\r\u2028\u2029]/g, function($0) {
                    return rc[$0];
                    })
                    .replace(/\{([\s\S]+?)\}/g, '" + o["$1"] + "')
                ) + '";'
                );
        };
    }());

    function getQuery (postalCode) {
        return [
            'query {',
                // customize the zip based on what the user is looking at
                'locations(brand:ALL, zip:' + postalCode + ') {',
                    // all the fields we care about for our UI
                    'name street city state zip lat long distance',
                '}',
            '}',
        ].join('');
    }

    function request(postalCode) {
        if (finder.insertBefore) {
            const text = document.createElement('div');
            text.style = 'margin: 1em auto 3em;';
            text.textContent = 'Searching in ' + postalCode + '...';
            finder.insertBefore(text, finder.firstChild);
        }

        fetch('https://stoutbrewingcompanyapi.com/product-finder', {
            headers: {'Content-Type': 'application/graphql'},
            method: 'POST',
            mode: 'cors',
            body: getQuery(postalCode)
        })
        .then(function(resp) { return resp.json(); })
        .then(function (resp) { draw(resp.data.locations); })
        .catch(function (err) {
            console.log(err);
            return err;
        });
    }

    const finder = document.getElementById('finder-box');
    const form = document.getElementById('search-form');
    const input = document.getElementById('zip-field');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        request(input.value);
    }, false);

    const tmpl = [
        '<div class="col-md-4">',
            '<div class="dark-box box-hover">',
                '<h2><i class="fa fa-map-marker"></i><span>{name}</span></h2>',
                '<p>{street} {city} {state} {zip}</p>',
                '<a href="http://maps.google.com/?q={name} {street} {city} {zip}"><p>link to map</p></a>',
            '</div>',
        '</div>'
    ].join('');
    const template = makeInterpolator(tmpl);

    const draw = (locations) => {
        if (locations.length === 0) {
            finder.innerHTML = '<div>Unfortunately our products are not available in this location</div>';
        } else {
            finder.innerHTML = locations.reduce((html, location) => html + template(location), '');
        }
    };

    request(input.value || '28086');
})();

