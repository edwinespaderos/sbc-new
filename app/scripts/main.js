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


$(document).ready(function() {
	$('#contact_form').bootstrapValidator({
			// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
			feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
			},

			fields: {
					first_name: {
							validators: {
											stringLength: {
											min: 2,
									},
											notEmpty: {
											message: 'Please supply your first name'
									}
							}
					},

					 last_name: {
							validators: {
									 stringLength: {
											min: 2,
									},
									notEmpty: {
											message: 'Please supply your last name'
									}
							}
					},

					email: {
							validators: {
									notEmpty: {
											message: 'Please supply your email address'
									},
									emailAddress: {
											message: 'Please supply a valid email address'
									}
							}
					},

					phone: {
							validators: {
									notEmpty: {
											message: 'Please supply your phone number'
									},
									phone: {
											country: 'US',
											message: 'Please supply a vaild phone number with area code'
									}
							}
					},
					address: {
							validators: {
									 stringLength: {
											min: 8,
									},
									notEmpty: {
											message: 'Please supply your street address'
									}
							}
					},
					city: {
							validators: {
									 stringLength: {
											min: 4,
									},
									notEmpty: {
											message: 'Please supply your city'
									}
							}
					},
					state: {
							validators: {
									notEmpty: {
											message: 'Please select your state'
									}
							}
					},
					zip: {
							validators: {
									notEmpty: {
											message: 'Please supply your zip code'
									},
									zipCode: {
											country: 'US',
											message: 'Please supply a vaild zip code'
									}
							}
					},
					comment: {
							validators: {
										stringLength: {
											min: 10,
											max: 200,
											message:'Please enter at least 10 characters and no more than 200'
									},
									notEmpty: {
											message: 'Please supply a description of your project'
									}
									}
							}
					}
			})
			.on('success.form.bv', function(e) {
					$('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
							$('#contact_form').data('bootstrapValidator').resetForm();

					// Prevent form submission
					e.preventDefault();

					// Get the form instance
					var $form = $(e.target);

					// Get the BootstrapValidator instance
					var bv = $form.data('bootstrapValidator');

					// Use Ajax to submit form data
					$.post($form.attr('action'), $form.serialize(), function(result) {
							console.log(result);
					}, 'json');
			});
});
