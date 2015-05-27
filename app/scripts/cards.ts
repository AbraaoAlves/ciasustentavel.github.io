/// <reference path="../typings/tsd.d.ts" />


var Cards = (function() {
	'use strict';
		
	var view 	= $('.view');
	var vw 		= view.innerWidth();
	var vh	 	= view.innerHeight();
	var vo 		= view.offset();
	var card 	= $('.card__item');
	var cardfull = $('.card__full');
	var cardfulltop = cardfull.find('.card__full-top');
	var arrow = cardfulltop.find('svg');
	var cardnum = cardfulltop.find('.card__full-num');
	var cardtitle = cardfulltop.find('.card__full-title');
	var cardhandle = cardfull.find('.card__full-handle');
	var cardinfo = cardfull.find('.card__full-info');
	var w 		= $(window);
	
	var moveCard = function() {
		var self = $(this);
		var selfIndex = self.index();
		var selfO = self.offset();
		var ty = w.innerHeight()/2 - selfO.top -4;
		
		var color = self.css('border-top-color');
//		cardfulltop.css('background-color', color);
//		cardhandle.css('color', color);
		
		updateData(selfIndex, self.data('name'));
		setTimeout(()=> cardfull.css('height', w.outerHeight()) && cardfull.addClass('active'), 500);
		
//TODO: move center
//		self.css({
//			'transform': 'translateY(' + ty + 'px)'
//		});
//				
//		self.on('transitionend', function() {
//			cardfull.addClass('active');
//			self.off('transitionend');
//		});
		
		return false;
	};
	
	var closeCard = function() {
		cardfull.removeClass('active');
		cardnum.hide();
		cardinfo.hide();
		cardhandle.hide();
		cardfull.on('transitionend', function() {
			card.removeAttr('style');
			cardnum.show();
			cardinfo.show();
			cardhandle.show();
			cardfull.off('transitionend');
		});
	};
	
	var updateData = function(index, name) {
		var img = $('img[src*="'+name+'.jpg"]', '.card__list').clone();
		var text = $('[data-name="'+name+'"]', '.card__texts').clone(); 
		
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
	
}());

Cards.init();