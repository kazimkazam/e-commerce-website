import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]',
    exportAs:'appDropDown'
})
export class DropdownDirective {
    @HostBinding('class.show') isShowing = false;
    @HostBinding('class.collapsed') isCollapsed = false;
    // @HostBinding('class.collapse') isCollapse = true;

    // @HostListener('click') toggleShow() {
    //     this.isShowing = !this.isShowing;
    // }

    @HostListener('document:click', ['$event']) toggleShow() {
        this.isShowing = this.elRef.nativeElement.contains(event!.target) ? !this.isShowing : false;
        this.isCollapsed = this.elRef.nativeElement.contains(event!.target) ? !this.isCollapsed : false;
        // this.isCollapse = this.elRef.nativeElement.contains(event!.target) ? !this.isCollapse : false;
    }

    constructor(private elRef: ElementRef) {}
}