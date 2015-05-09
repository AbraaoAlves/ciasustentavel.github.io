
interface HTMLDialogElement extends HTMLDivElement{
	show:(e?: MouseEvent | Element )=>void;
	showModal:(e?: MouseEvent | Element )=>void;
	close:(returnvalue?:DOMStringList | string)=>void;
	open:boolean;
}

declare var dialogPolyfill:any;

(function() {
	"use strict";

	var links = document.querySelectorAll(".depoimentos a.showModal");
	var	dialog = <HTMLDialogElement>document.querySelector("dialog");
	var	dialog_content = <HTMLElement>dialog.querySelector(".content");
	
	function showImage(e) {
		var self = <HTMLElement>this;
		e.preventDefault();
		
		var content = <HTMLElement>self.parentElement.querySelector(".content");
		
		dialog_content.innerHTML =  content.innerHTML;
		dialog.showModal();
	}
	
	dialog.querySelector("button.close").addEventListener("click", function() {
		dialog_content.innerHTML = "";
		dialog.close();
	});
	
	var testdialog = <HTMLDialogElement>document.createElement("dialog");
	testdialog.setAttribute("open", "");
	
	if (!testdialog.open) { 
		console.log("registrando dialog-polyfill")
		dialogPolyfill.registerDialog(dialog); 
	}
	
	for (var i = 0; i < links.length; i++) { links[i].addEventListener("click", showImage); }
})();