/// <reference path="../typings/tsd.d.ts" />
var Cards = (function () {
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
    var moveCard = function () {
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
        body.animate({ scrollTop: title.offset().top }, 500, function () {
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
    var closeCard = function () {
        list.show();
        cardfull.removeClass('active');
        [cardnum, cardinfo, cardhandle].forEach(function (item) { return item.hide(); });
        cardfull.on('transitionend', function () {
            //card.removeAttr('style');
            [cardnum, cardinfo, cardhandle].forEach(function (item) { return item.show(); });
            cardfull.off('transitionend');
            setTimeout(function () {
                var activateCard = card.filter('.active-card');
                if (!activateCard.length)
                    return;
                body.animate({ scrollTop: activateCard.offset().top }, 500);
                card.filter('.active-card').removeClass('active-card');
            }, 100);
        });
    };
    var updateData = function (index, name) {
        var img = $('img[src*="' + name + '.jpg"]', '.card__list').clone();
        var text = $('[data-name="' + name + '"]', '.card__texts').clone();
        cardnum.html('').append(img);
        cardinfo.html('').append(text);
        cardtitle.html('')
            .append($('<h2>').text(name.replace(/_/g, ' ')))
            .append($('<hr>'))
            .append($('<h3>').text(img.attr('title')));
    };
    var bindActions = function () {
        var escape = 27;
        card.on('click', moveCard);
        arrow.on('click', closeCard);
        w.on('keydown', function (e) { return e.keyCode === escape && cardfull.hasClass('active') && closeCard(); });
    };
    var init = function () {
        bindActions();
    };
    return {
        init: init
    };
}());
Cards.init();

//
//interface HTMLDialogElement extends HTMLDivElement{
//	show:(e?: MouseEvent | Element )=>void;
//	showModal:(e?: MouseEvent | Element )=>void;
//	close:(returnvalue?:DOMStringList | string)=>void;
//	open:boolean;
//}
//
//declare var dialogPolyfill:any;
//
//(function() {
//	"use strict";
//	
//	var links = document.querySelectorAll(".figure-list figure");
//	var	dialog = <HTMLDialogElement>document.querySelector("dialog");
//	var	dialog_content = <HTMLElement>dialog.querySelector(".content");
//	var closeButton = <HTMLButtonElement>dialog.querySelector(".close");
//	 
//	function onClick(el:HTMLElement, handler:(e:Event)=>any){
//		["click"].forEach(e => el.addEventListener(e, handler));
//	}
//	
//	function showDialog(e) {
////		var self = <HTMLElement>this;
//		e.preventDefault();
////		
////		var content = <HTMLElement>self.parentElement.querySelector(".content");
////		
////		dialog_content.innerHTML =  content.innerHTML;
//		document.body.className = "dialog-open";
//		dialog.showModal();
//	}
//	
//	function closeDialog(e?:Event){
//		e.preventDefault();	
////		dialog_content.innerHTML = "";
//		dialog.close();
//	}
//	
//	function dialogSuported(){
//		var testdialog = <HTMLDialogElement>document.createElement("dialog");
//		testdialog.setAttribute("open", "");
//		
//		return testdialog.open;
//	}
//	
////	onClick(closeButton, closeDialog);
////	
////	document.addEventListener("keydown", (e)=>{
////		if(e.keyCode === 27 && dialog.open){
////			//esc press with dialog opened
////			closeDialog();
////		}
////	});
////	
////	if(!dialogSuported()){ 
////		dialogPolyfill.registerDialog(dialog); 
////	}		
////	
////	for (var i = 0; i < links.length; i++) { onClick(<HTMLElement>links[i], showDialog); }
//})(); 

(function () {
    'use strict';
    var querySelector = document.querySelector.bind(document);
    var navdrawerContainer = querySelector('nav');
    var body = document.body;
    var appbarElement = querySelector('.app-bar');
    var menuBtn = querySelector('.menu');
    var main = querySelector('main');
    function closeMenu() {
        body.classList.remove('open');
        appbarElement.classList.remove('open');
        navdrawerContainer.classList.remove('open');
    }
    function toggleMenu() {
        body.classList.toggle('open');
        appbarElement.classList.toggle('open');
        navdrawerContainer.classList.toggle('open');
        navdrawerContainer.classList.add('opened');
    }
    main.addEventListener('click', closeMenu);
    menuBtn.addEventListener('click', toggleMenu);
    navdrawerContainer.addEventListener('click', function (event) {
        if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
            closeMenu();
        }
    });
})();

/// <reference path="../typings/tsd.d.ts" />
$(function () {
    var body = $('body, html');
    $('a[href^=#]').on('click', function (e) {
        e.preventDefault();
        var targetName = $(this).attr('href').replace('#', '');
        var targetEl = $('a[name=' + targetName + ']');
        body.animate({ scrollTop: targetEl.offset().top });
    });
});

/// <reference path="../typings/tsd.d.ts" />
$(function () {
    'use strict';
    $('.flexslider').flexslider({
        selector: '.slides > div',
        directionNav: false,
        controlNav: false
    });
});

/// <reference path="../typings/tsd.d.ts" />
var Shapes = (function () {
    var nav = $('.section__nav', '.team');
    var link = $('.section__nav-link', '.team');
    var section = $('.section', '.team');
    var svg = $('.section__nav-link > svg', '.team');
    var body = $('body, html');
    var toggleSection = function (e) {
        e.preventDefault();
        //var i = $(this).parents('li').index();
        link.removeClass('active');
        svg.removeAttr('style');
        $(this).addClass('active');
        //section.css({ transform: 'translateY()'})
        // section.css({
        // 	'transform': 'translateY(-' + i + '00%)',
        // 	'-webkit-transform': 'translateY(-' + i + '00%)'
        // });
        return false;
    };
    var toggleSpace = function () {
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
    function debounce(wait, func, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.apply(context, args);
        };
    }
    ;
    var scrollBehavior = function (e) {
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
                y = e + 1;
                pos = 'absolute';
            }
            else {
                if (winTop > teamTop) {
                    pos = 'fixed';
                    y = 1;
                    var sec = $('.section').first();
                    /*
                    else
                    else*/
                    if (winTop < $('footer').offset().top && winTop > sec.next().offset().top) {
                        if (winTop >= sec.last().offset().top)
                            link.removeClass('active').eq(2).addClass('active');
                        if (winTop >= navHei / 2 + sec.last().offset().top)
                            link.eq(2).removeClass('active');
                    }
                    if (winTop > sec.offset().top) {
                        if (winTop >= sec.next().offset().top)
                            link.removeClass('active').eq(1).addClass('active');
                        if (winTop >= navHei / 2 + sec.next().offset().top)
                            link.eq(1).removeClass('active');
                    }
                    if (winTop < sec.next().offset().top) {
                        if (winTop >= sec.offset().top)
                            link.removeClass('active').eq(0).addClass('active');
                        if (winTop >= navHei / 2 + sec.offset().top)
                            link.eq(0).removeClass('active');
                    }
                    var secTop = $('.section:first').offset().top;
                    console.log('section:first', secTop);
                    console.log('winTop', winTop);
                }
            }
        }
        if (pos && y) {
            nav.css({ 'top': y - 1, 'position': pos });
        }
        else {
            nav.removeAttr('style');
        }
    };
    var bindActions = function () {
        link.on('click', toggleSection);
        $(window).on('scroll', scrollBehavior);
        $('.section').on('scroll', function () {
            console.log('section: ' + $(this).find('a[name]').attr('name'), this);
        });
    };
    var init = function () {
        bindActions();
    };
    return {
        init: init
    };
}());
Shapes.init();

//# sourceMappingURL=main.js.map