
interface HTMLDialogElement extends HTMLDivElement{
	show:(e?: MouseEvent | Element )=>void;
	showModal:(e?: MouseEvent | Element )=>void;
	close:(returnvalue?:DOMStringList | string)=>void;
	open:boolean;
}

declare var dialogPolyfill:any;

(function() {
	"use strict";
	
	var links = document.querySelectorAll(".figure-list figure");
	var	dialog = <HTMLDialogElement>document.querySelector("dialog");
	var	dialog_content = <HTMLElement>dialog.querySelector(".content");
	var closeButton = <HTMLButtonElement>dialog.querySelector(".close");
	 
	function onClick(el:HTMLElement, handler:(e:Event)=>any){
		["click"].forEach(e => el.addEventListener(e, handler));
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
	
	function closeDialog(e?:Event){
		e.preventDefault();	
//		dialog_content.innerHTML = "";
		dialog.close();
	}
	
	function dialogSuported(){
		var testdialog = <HTMLDialogElement>document.createElement("dialog");
		testdialog.setAttribute("open", "");
		
		return testdialog.open;
	}
	
	onClick(closeButton, closeDialog);
	
	document.addEventListener("keydown", (e)=>{
		if(e.keyCode === 27 && dialog.open){
			//esc press with dialog opened
			closeDialog();
		}
	});
	
	if(!dialogSuported()){ 
		dialogPolyfill.registerDialog(dialog); 
	}		
	
	for (var i = 0; i < links.length; i++) { onClick(<HTMLElement>links[i], showDialog); }
})();