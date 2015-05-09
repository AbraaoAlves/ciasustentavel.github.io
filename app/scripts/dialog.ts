
interface HTMLDialogElement extends HTMLDivElement{
	show:(e?: MouseEvent | Element )=>void;
	showModal:(e?: MouseEvent | Element )=>void;
	close:(returnvalue?:DOMStringList | string)=>void;
	open:boolean;
}

declare var dialogPolyfill:any;

(function() {
	"use strict";

	var links = document.querySelectorAll(".depoimentos figure");
	var	dialog = <HTMLDialogElement>document.querySelector("dialog");
	var	dialog_content = <HTMLElement>dialog.querySelector(".content");
	
	function showDialog(e) {
//		var self = <HTMLElement>this;
//		e.preventDefault();
//		
//		var content = <HTMLElement>self.parentElement.querySelector(".content");
//		
//		dialog_content.innerHTML =  content.innerHTML;
		dialog.showModal();
	}
	function closeDialog(){
//		dialog_content.innerHTML = "";
		dialog.close();
	}
	
	dialog.querySelector("button.close").addEventListener("click", closeDialog);
	document.addEventListener("keydown", (e)=>{
		if(e.keyCode === 27 && dialog.open){
			//esc press with dialog opened
			closeDialog();
		}
	});

	var testdialog = <HTMLDialogElement>document.createElement("dialog");
	testdialog.setAttribute("open", "");
	
	if (!testdialog.open) { 
		console.log("registrando dialog-polyfill")
		dialogPolyfill.registerDialog(dialog); 
	}
	
	for (var i = 0; i < links.length; i++) { links[i].addEventListener("click", showDialog); }
})();