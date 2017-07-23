import {Directive, ElementRef, Renderer, Output, EventEmitter, HostListener} from '@angular/core';
// import $ from 'jquery';
// import * as myGlobals from './globals';
declare var $:any;
// declare $ as any;

@Directive({
  selector: '[menuToggle]',
})

export class AppMenuToggle{
    toggle:Boolean
    constructor(private _elementRef : ElementRef){
        this.toggle = true;
    }
    
    @Output()
    public menuToggle = new EventEmitter();

    @HostListener('click',['$event.target'])
    public onClick(targetElement){
        $("#page-content-wrapper").toggleClass("collapseData");
        if(this.toggle){
            $(".nav-side-menu").addClass("sidebar-collapsed").removeClass("sidebar-collapsed-back");
            this.toggle = false;
        }
        else{
            $(".nav-side-menu").removeClass("sidebar-collapsed").addClass("sidebar-collapsed-back");
            this.toggle=true;
        }
    }
}