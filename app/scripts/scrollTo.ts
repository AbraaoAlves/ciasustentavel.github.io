/// <reference path="../typings/tsd.d.ts" />


$(function(){
	var body = $('body, html');
	$('a[href^=#]').on('click', function (e) {
		e.preventDefault();
		
		var targetName = $(this).attr('href').replace('#', '');
		var targetEl = $('a[name='+ targetName +']');
		
		body.animate({scrollTop: targetEl.offset().top});
	});
});

