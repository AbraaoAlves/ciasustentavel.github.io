(function($){
 
    $.fn.relativeText = function(ev) {
      var elem = $(this);
      var font = elem.css('font-size');
      //alert(font);
      function relative(ev){
      var screenH = $(window).height();
      var screenW = $(window).width();
      
      var screenDiagonal = Math.sqrt(Math.pow(screenH, 2)+Math.pow(screenW, 2));
      var tam = screenDiagonal*ev/100;
      elem.css('font-size', tam+'px');
      
       }
      $(window).resize(function(){
          relative(ev);
      });
      relative(ev);
     
        
  };
  
   
})(jQuery);
