/// <reference path="../../typings/flexSlider/flexSlider.d.ts" />

(function(){
	"use strict";
	
	$(".flexslider").flexslider({
		animation:"fade",
		animationLoop: true,
		minItems: 2,
		maxItems: 3
	});
})();