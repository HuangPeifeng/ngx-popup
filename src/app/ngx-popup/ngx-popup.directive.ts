import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngxPopup]'
})
export class NgxPopupDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
