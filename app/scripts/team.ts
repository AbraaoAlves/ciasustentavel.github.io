/// <reference path="../typings/tsd.d.ts" />

var Shapes = (function() {
	var nav = $('.section__nav', '.team');
	var link = $('.section__nav-link', '.team');
	var section = $('.section', '.team');
	var svg = $('.section__nav-link > svg', '.team');
	var body = $('body, html');
	
	var toggleSection = function(e:Event) {
		e.preventDefault();
		
		//var i = $(this).parents('li').index();

		link.removeClass('active')
		svg.removeAttr('style');
		$(this).addClass('active');
		
		
		//section.css({ transform: 'translateY()'})
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


	function debounce(wait, func, immediate? = false) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	
	var scrollBehavior = function(){
		var y;
		var pos;
		var team = $('.team');
		var teamTop = team.offset().top;
		var navHei = $(nav).height();
		var e = teamTop + team.innerHeight();
        e -= navHei;
        
        if (e > teamTop) {
            var winTop = $(window).scrollTop() + 20;
            if (winTop >= e) {
            	y = e + 1
               	pos = 'absolute';
            }else{
                if (winTop > teamTop) {
                    pos = 'fixed'; y=1;
                    
                    var sec = $('.section').first();
					
					if(winTop < sec.next().next().offset().top && winTop > sec.next().offset().top){
						if(winTop >= sec.next().next().offset().top)
							debounce(0,() => link.removeClass('active').eq(2).addClass('active'), true);
						if (winTop >=  navHei/2 + sec.last().offset().top)
							debounce(0,() => link.eq(2).removeClass('active'), true);
					}
					
					if(winTop > sec.offset().top){
						if(winTop >= sec.next().offset().top)
							debounce(0,() => link.removeClass('active').eq(1).addClass('active'), true);
						
						if (winTop >= navHei/2 + sec.next().offset().top)
							debounce(0,() => link.eq(1).removeClass('active'), true);
					}
					
					if(winTop < sec.next().offset().top){
						if(winTop >= sec.offset().top)
							debounce(0,() => link.removeClass('active').eq(0).addClass('active'), true);
						
						if (winTop >=  navHei/2 + sec.offset().top)
							debounce(0,() => link.eq(0).removeClass('active'), true);
					}
					
					
                    var secTop = $('.section:first').offset().top;
                    console.log('section:first', secTop);
                    console.log('winTop', winTop);
                    
                    //nav.css({'top': 0, 'position': 'fixed'});
                }
            }
        }
        
        if(pos && y){
        	nav.css({'top': y-1, 'position':pos});
        }else{
    		nav.removeAttr('style'); 
        }
	};

	var bindActions = function() {
		link.on('click', toggleSection);
		$(window).on('scroll', scrollBehavior);
		$('.section').on('scroll', function(){
				
			console.log('section: ' + $(this).find('a[name]').attr('name'), this);
		});
	};

	var init = function() {
		bindActions();
	};

	return {
		init: init
	};

} ());

Shapes.init();