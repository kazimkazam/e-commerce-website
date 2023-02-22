import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appCollapse]',
    exportAs:'appCollapsed'
})
export class CollapseDirective {
    @HostBinding('class.collapsed') isCollapsed = false;

    @HostListener('click') toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }
}