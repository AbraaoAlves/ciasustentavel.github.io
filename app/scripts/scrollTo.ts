/// <reference path="../typings/tsd.d.ts" />


$(function(){
	var body = $('body, html');
	$('a[href^=#]').on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		var targetName = $this.attr('href').replace('#', '');
		var targetEl = $('a[name='+ targetName +']');
		
		var distance = $this.offset().top - targetEl.offset().top;
		
		// body.css({
		// 	transform:'translateY(' +  distance + 'px)',
		// 	'-ms-transform':'translateY(' +  distance + 'px)',
		// 	'-webkit-transform':'translateY(' +  distance + 'px)'
		// });
		//setTimeout(function() {
			body.animate({scrollTop: targetEl.offset().top});
		//}, 1);
	});
});

