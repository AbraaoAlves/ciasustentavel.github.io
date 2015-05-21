(function () {
    "use strict";
    var links = document.querySelectorAll(".figure-list figure");
    var dialog = document.querySelector("dialog");
    var dialog_content = dialog.querySelector(".content");
    var closeButton = dialog.querySelector(".close");
    function onClick(el, handler) {
        ["click"].forEach(function (e) { return el.addEventListener(e, handler); });
    }
    function showDialog(e) {
        //		var self = <HTMLElement>this;
        e.preventDefault();
        //		
        //		var content = <HTMLElement>self.parentElement.querySelector(".content");
        //		
        //		dialog_content.innerHTML =  content.innerHTML;
        document.body.className = "dialog-open";
        dialog.showModal();
    }
    function closeDialog(e) {
        e.preventDefault();
        //		dialog_content.innerHTML = "";
        dialog.close();
    }
    function dialogSuported() {
        var testdialog = document.createElement("dialog");
        testdialog.setAttribute("open", "");
        return testdialog.open;
    }
    //	onClick(closeButton, closeDialog);
    //	
    //	document.addEventListener("keydown", (e)=>{
    //		if(e.keyCode === 27 && dialog.open){
    //			//esc press with dialog opened
    //			closeDialog();
    //		}
    //	});
    //	
    //	if(!dialogSuported()){ 
    //		dialogPolyfill.registerDialog(dialog); 
    //	}		
    //	
    //	for (var i = 0; i < links.length; i++) { onClick(<HTMLElement>links[i], showDialog); }
})();

(function () {
    'use strict';
    var querySelector = document.querySelector.bind(document);
    var navdrawerContainer = querySelector('.navdrawer-container');
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

//# sourceMappingURL=main.js.map