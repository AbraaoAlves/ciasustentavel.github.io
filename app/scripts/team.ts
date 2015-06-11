/// <reference path="../typings/tsd.d.ts" />

var Shapes = (function() {
	var nav = $('.section__nav');
	var link = $('.section__nav-link');
	var section = $('.section');
	var svg = $('.section__nav-link > svg');
	var body = $('body, html');
	
	var toggleSection = function(e:Event) {
		e.preventDefault();
		
		var i = $(this).parents('li').index();

		link.removeClass('active')
		svg.removeAttr('style');
		$(this).addClass('active');

		// section.css({
		// 	'transform': 'translateY(-' + i + '00%)',
		// 	'-webkit-transform': 'translateY(-' + i + '00%)'
		// });

		return false;
	};

	var toggleSpace = function() {

// 		if ($(this).parent().hasClass('active')) {
// 			link.removeClass('active');
// 			section.css('opacity', 0);
// 
// 			section.on('transitionend', function() {
// 				section.css({
// 					'transform': 'translateY(-400%)',
// 					'-webkit-transform': 'translateY(-400%)',
// 				});
// 				section.on('transitionend', function() {
// 					section.css('opacity', '1');
// 					section.off('transitionend');
// 				});
// 			});
// 
// 			return false;
// 		}
	};
	var isTeamArea = function(){
		var heightPrevius = $('header').height();
		
		for (var index = 0; index < 3; index++) {
			heightPrevius += $('main').find('section').eq(index).height();	
		}
		var heightNext = heightPrevius + $('main section:eq(4)').height();
		
		return body.scrollTop() >= heightPrevius || body.scrollTop() < heightNext;
	}
	
	var scrollBehavior = function(e){
		nav.toggleClass('fixed', isTeamArea());
	};

	var bindActions = function() {
		link.on('click', toggleSection);
		body.on('scroll', scrollBehavior);	
	};

	var init = function() {
		bindActions();
	};

	return {
		init: init
	};

} ());

Shapes.init();