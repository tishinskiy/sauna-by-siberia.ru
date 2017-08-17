'use strict;'

function heaerFixed(val) {
	if(val > 0) {
		$('.header-block').addClass('header-block__fixed');
		$('body').css({'padding-top': 68});
	}
	else {
		$('.header-block').removeClass('header-block__fixed');
		$('body').css({'padding-top': 187});
	}
}

(function(){

	$(document)
		.on('click', '#top-menu-toggle-button', function(){
			$('.top-menu__mobile').slideToggle('fast')
		});

}())

$(window).scroll(function() {
	heaerFixed($(this).scrollTop());
});


$(document).ready(function(){
	heaerFixed($(this).scrollTop());

	if($(".main-slider--list").length){
		$(".main-slider--header").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			arrows: false,
			fade: true,
			swipe:false,
		});

		$(".main-slider--list").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			appendDots: $('#main-slider--dots'),
			prevArrow: $("#main-slider--prew"),
			nextArrow: $("#main-slider--next"),
			dots: true,
			asNavFor: '.main-slider--header',
		});
	}

	if($('.photogalery--list').length){
		$('.photogalery--list').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: true,
			appendDots: $('#photogalery--dots'),
			prevArrow: $("#photogalery--prew"),
			nextArrow: $("#photogalery--next"),

			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
	}

	if($('.reviews-slider').length){
		$('.reviews-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			appendDots: $('#reviews--dots'),
			prevArrow: $("#reviews--prew"),
			nextArrow: $("#reviews--next"),
			fade: true,
			dots: true,
		});
	}


	$('.map-filter-block select').styler({});

	if($(".mouse-scrol").length) {
		var msa;
		(function msa(){
			$(".mouse-scrol").animate({
				top: '10px',
				opacity: 0,
			}, 1000, function(){
				$(".mouse-scrol").css({top: '0px', opacity: 1});
				msa();
			});
		}())
	}

	$('a[href^="#"]').click(function () {
		elementClick = $(this).attr("href");
		elementClick = elementClick.substring(1);
		destination = $("a[name='"+elementClick+"'").offset().top;
		  $('html, body').animate( { scrollTop: destination-50 }, 1100 );
		return false;
	});

});