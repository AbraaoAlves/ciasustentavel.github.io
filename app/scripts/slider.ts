/// <reference path="../typings/flexSlider/flexSlider.d.ts" />

(function(){
	"use strict";
	
	var options:FlexSliderOptions = {
		animation:"slide",
		minItems: 2,
		maxItems: 3,		
		slideshow:false
	};
	
	$(".flexslider").flexslider(options);
})();