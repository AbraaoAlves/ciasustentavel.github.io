/// <reference path="../typings/tsd.d.ts" />
var Cards = (function () {
    'use strict';
    var view = $('.view');
    var vw = view.innerWidth();
    var vh = view.innerHeight();
    var vo = view.offset();
    var card = $('.card__item');
    var cardfull = $('.card__full');
    var cardfulltop = cardfull.find('.card__full-top');
    var arrow = cardfulltop.find('svg');
    var cardnum = cardfulltop.find('.card__full-num');
    var cardtitle = cardfulltop.find('.card__full-title');
    var cardhandle = cardfull.find('.card__full-handle');
    var cardinfo = cardfull.find('.card__full-info');
    var w = $(window);
    var moveCard = function () {
        var self = $(this);
        var selfIndex = self.index();
        var selfO = self.offset();
        var ty = w.innerHeight() / 2 - selfO.top - 4;
        var color = self.css('border-top-color');
        //		cardfulltop.css('background-color', color);
        //		cardhandle.css('color', color);
        updateData(selfIndex, self.data('name'));
        setTimeout(function () { return cardfull.css('height', w.outerHeight()) && cardfull.addClass('active'); }, 500);
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
    var closeCard = function () {
        cardfull.removeClass('active');
        cardnum.hide();
        cardinfo.hide();
        cardhandle.hide();
        cardfull.on('transitionend', function () {
            card.removeAttr('style');
            cardnum.show();
            cardinfo.show();
            cardhandle.show();
            cardfull.off('transitionend');
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
    'use strict';
    $('.flexslider').flexslider({
        selector: '.slides > div',
        directionNav: false,
        controlNav: false
    });
});

//# sourceMappingURL=main.js.map