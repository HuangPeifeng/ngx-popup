import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPopupComponent } from './ngx-popup.component';
import { NgxPopupDirective } from './ngx-popup.directive';

@NgModule({
  declarations: [
    NgxPopupComponent,
    NgxPopupDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxPopupComponent
  ]
})
export class NgxPopupModule {}
