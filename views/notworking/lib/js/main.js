// responsive images & breakpoints
var largeQuery = 1023,
mediumQuery = 699,
smallQuery = 320;

$(window).load(function () {
    loader();
});

$(document).ready(function(){
	// fade loader
	$('body').addClass('disable-scroll');
	$('.loader').addClass('fade');
	// start laoding animation
	setTimeout(function(){
		$('.loader.fade').addClass('loading');
	}, 500);

	// Set bg images
    if ($('img.bg').length) { 
        srcSetToBg();
    }

}); 

$(window).resize(function () {

});
