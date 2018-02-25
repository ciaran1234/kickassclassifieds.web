import { Component, ElementRef, Renderer2, Renderer, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'simple-carousel-item',
    template: `  
         <ng-content></ng-content>         
  `
})

export class SimpleCarouselItemDirective {

    private _renderer: Renderer2;
    private _el: ElementRef;

    constructor(private renderer: Renderer2, private el: ElementRef) {
        this._renderer = renderer;
        this._el = el;
    }

    ngOnChanges(changes: SimpleChanges) {

    }

    hide() {
        this._renderer.setAttribute(this._el.nativeElement, 'hidden', '');   
    }

    show() {
        this._renderer.removeAttribute(this._el.nativeElement, 'hidden');
    }

    setWidth(width: number) {
        this._renderer.setStyle(this.el.nativeElement, 'width', width + 'px')
    }

    whoAmI() {
        return '👶 I am a child!!';
    }
}