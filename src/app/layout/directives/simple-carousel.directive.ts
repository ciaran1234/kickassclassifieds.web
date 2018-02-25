import {
    Component, ElementRef, Input, ViewChild,
    Renderer, ContentChildren, AfterContentInit, AfterContentChecked, OnInit,
    QueryList, EventEmitter, Output, HostListener
} from '@angular/core';
import { SimpleCarouselItemDirective } from './simple-carousel-item.directive';

@Component({
    selector: 'simple-carousel',
    template: `  
    <div [class]="options.carouselClasses.join(' ')">
		<div class="owl-stage-outer">
            <div class="owl-stage" #stage>                                    
                 <ng-content></ng-content>      
            </div>             
        </div>
        <div [class]="options.navContainerClass">         
			<div class="tg-prev">
				<span [class]="options.navPreviousClass"></span>
			</div>
			<div class="tg-next">
				<span [class]="options.navNextClass"></span>
			</div>
        </div>
	</div>
  `
})

export class SimpleCarouselDirective implements AfterContentInit, AfterContentChecked, OnInit {
    private _selectedIndex: number = 0;

    @ViewChild('stage') stage: ElementRef;
    @ContentChildren("carouselItem") carousel;

    defaults: any = {
        items: 2,
        carouselClasses: ['tg-categoriesslider', 'tg-categories', 'owl-carousel', 'owl-loaded', 'owl-drag'],
        navContainerClass: 'tg-slidernav',
        navPreviousClass: 'icon-chevron-left',
        navNextClass: 'icon-chevron-right'
    }

    @Input() options: any;

    @HostListener('window:resize', ['$event']) onResize(event) {
        this.resize();
    }

    @HostListener('click', ['$event']) onClick(event: Event) {
        let targetElement = event.srcElement;

        if (!targetElement) return false;

        let elementClass = targetElement.attributes.getNamedItem('class');
        let previousClicked = elementClass.value.indexOf(this.options.navPreviousClass) !== -1;

        if (previousClicked) {
            this.onPrevious();
            return false;
        }

        let nextClicked = elementClass.value.indexOf(this.options.navNextClass) !== -1;

        if (nextClicked) {
            this.onNext();
            return false;
        }
    }

    @Output() next: EventEmitter<any> = new EventEmitter();

    constructor(el: ElementRef) { }

    ngOnInit() {
        this.options = Object.assign(this.defaults, this.options);
    }

    ngAfterContentInit() {
        let width = this.stage.nativeElement.clientWidth;
        let itemCount = this.getItemCount();

        this.carousel.changes.subscribe((c) => {
            c.forEach((item, idx) => {
                if (idx > (this._selectedIndex + (itemCount - 1))) {
                    item.hide();
                }
                else {
                    item.show();
                }

                item.setWidth(width / itemCount);
            });
        });
    }

    ngAfterContentChecked() {
        this.resize();
    }

    private onNext() {
        this._selectedIndex = this._selectedIndex >= (this.carousel.length - this.getItemCount()) ? this._selectedIndex : this._selectedIndex + 1;
        this.moveCarousel();
    }

    private onPrevious() {
        this._selectedIndex = this._selectedIndex <= 0 ? 0 : this._selectedIndex - 1;
        this.moveCarousel();
    }

    private moveCarousel() {
        this.carousel.forEach((item, idx) => {
            if (idx >= this._selectedIndex && idx <= (this._selectedIndex + this.getItemCount() - 1)) {
                item.show();
            }
            else {
                item.hide();
            }
        });
    }

    private getItemCount(): number {
        let itemCount = this.options.items;
        let width = this.stage.nativeElement.clientWidth;

        if (width > 610) {
            itemCount = this.options.items;
        }
        else if (width >= 350 && width < 610) {
            itemCount = this.options.items < 3 ? this.options.items: 3;
        }
        else if (width >= 250 && width < 430) {
            itemCount = this.options.items < 3 ? this.options.items: 2;
        }
        else if (width < 250) {
            itemCount = this.options.items < 3 ? this.options.items: 1;
        }

        return itemCount;
    }

    resize() {
        let width = this.stage.nativeElement.clientWidth;
        let itemCount = this.getItemCount();       

        this.carousel.forEach((item, idx) => {
            if (idx >= this._selectedIndex && idx <= (this._selectedIndex + itemCount - 1)) {
                item.show();
            }
            else {
                item.hide();
            }

            item.setWidth(width / itemCount);
        });
    }
}