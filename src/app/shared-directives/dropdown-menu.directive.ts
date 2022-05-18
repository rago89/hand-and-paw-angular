import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownMenu]',
})
export class DropdownMenuDirective {
  @HostBinding('class.show') isOpen: boolean = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
