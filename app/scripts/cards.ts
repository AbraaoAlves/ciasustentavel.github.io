/// <reference path="../typings/tsd.d.ts" />


var Cards = (function() {
	'use strict';

	var view = $('.view');
	var vw = view.innerWidth();
	var vh = view.innerHeight();
	var vo = view.offset();
	var list = $('.card__list');
	var card = $('.card__item');
	var cardfull = $('.card__full');
	var cardfulltop = cardfull.find('.card__full-top');
	var arrow = cardfulltop.find('svg');
	var cardnum = cardfulltop.find('.card__full-num');
	var cardtitle = cardfulltop.find('.card__full-title');
	var cardhandle = cardfull.find('.card__full-handle');
	var cardinfo = cardfull.find('.card__full-info');
	var w = $(window);
	var body = $('body, html');
	
	var title = $('.subsection-title');
	var moveCard = function() {
		var self = $(this);
		var selfIndex = self.index();
		var selfO = self.offset();
		var ty = selfO.top - title.offset().top;
		
		//var ty = title.offset().top-self.offset().top;

		var color = self.css('border-top-color');
		//		cardfulltop.css('background-color', color);
		//		cardhandle.css('color', color);
		
		updateData(selfIndex, self.data('name'));
		// setTimeout(() => {
		// 	if (cardfull.css('height', w.outerHeight())) {
		// 		cardfull.addClass('active');
		// 		list.hide();
		// 	}
		// }, 500);
		
//		TODO: move center
		self.addClass('active-card');
//		card.filter(':not(.active-card)').each((i, item) => $(item).hide());
		// self.css({
		// 	'transform': 'translateY(' + -ty + 'px)'
		// });
		
		body.animate({scrollTop:title.offset().top}, 500, ()=>{
			!cardfull.hasClass('active') && cardfull.addClass('active');
			list.is(':visible') && list.hide();
		});
		
		// self.on('transitionend', () => {
		// 	!cardfull.hasClass('active') && cardfull.addClass('active');
		// 	list.is(':visible') && list.hide();
		// 	
		// 	self.off('transitionend');
		// });
		
		return false;
	};

	var closeCard = function() {
		list.show();
		cardfull.removeClass('active');
		[cardnum, cardinfo, cardhandle].forEach((item)=>item.hide());
		
		cardfull.on('transitionend', function() {
			//card.removeAttr('style');
			
			[cardnum, cardinfo, cardhandle].forEach((item)=>item.show());
			
			cardfull.off('transitionend');

			setTimeout(function() {
				var activateCard = card.filter('.active-card');
				if(!activateCard.length) return;
				
				body.animate({scrollTop:activateCard.offset().top}, 500);
				card.filter('.active-card').removeClass('active-card');
			}, 100);
		});
	};

	var updateData = function(index, name) {
		var img = $('img[src*="' + name + '.jpg"]', '.card__list').clone();
		var text = $('[data-name="' + name + '"]', '.card__texts').clone();

		cardnum.html('').append(img);
		cardinfo.html('').append(text);

		cardtitle.html('')
			.append($('<h2>').text(name.replace(/_/g, ' ')))
			.append($('<hr>'))
			.append($('<h3>').text(img.attr('title')));
	};

	var bindActions = function() {
		var escape = 27;
		card.on('click', moveCard);
		arrow.on('click', closeCard);
		w.on('keydown', (e) => e.keyCode === escape && cardfull.hasClass('active') && closeCard());
	};

	var init = function() {
		bindActions();
	};

	return {
		init: init
	};

} ());

Cards.init();