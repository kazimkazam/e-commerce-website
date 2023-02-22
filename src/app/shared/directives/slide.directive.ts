import { Directive, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
    selector: '[appSlide]',
    exportAs: 'appSlider'
})
export class SlideDirective implements OnInit {
    @HostBinding('class.active') isActive = 0;

    @HostListener('click') slideRight() {
        if (this.isActive < 4) {
            this.isActive++;
        } else {
            this.isActive = 0;
        }
    }

    ngOnInit(): void {
        setInterval(() => {
            this.slideRight();
        }, 5000);
    }
}