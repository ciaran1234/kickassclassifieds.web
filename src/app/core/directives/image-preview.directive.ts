import { Directive, ElementRef, Input, Renderer, OnChanges, SimpleChanges } from '@angular/core';

@Directive({ selector: 'img[imagePreview]' })
export class ImagePreview {
    @Input() image: any;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnChanges(changes: SimpleChanges) {
        let reader = new FileReader();
        let elememt = this.el;

        reader.onloadend = function (e) {
            elememt.nativeElement.src = reader.result;
        }

        if (this.image) {
            return reader.readAsDataURL(this.image);
        }
    }
}