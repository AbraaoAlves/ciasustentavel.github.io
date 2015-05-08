(function () {
    "use strict";
    var links = document.querySelectorAll(".depoimentos a.showModal");
    var dialog = document.querySelector("dialog");
    var dialog_content = dialog.querySelector(".content");
    function showImage(e) {
        var self = this;
        e.preventDefault();
        var content = self.parentElement.querySelector(".content");
        dialog_content.innerHTML = content.innerHTML;
        dialog.showModal();
    }
    dialog.querySelector("button.close").addEventListener("click", function () {
        dialog_content.innerHTML = "";
        dialog.close();
    });
    var testdialog = document.createElement("dialog");
    testdialog.setAttribute("open", "");
    if (!testdialog.open) {
        dialogPolyfill.registerDialog(dialog);
    }
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", showImage);
    }
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
