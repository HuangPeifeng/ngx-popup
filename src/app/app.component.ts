import { Component, ComponentFactoryResolver, Injector } from '@angular/core';
import { NgxPopupService } from './ngx-popup/ngx-popup.service';
import { TestComponent } from './test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-popup';

  constructor(
    private _ngxPopupService: NgxPopupService,
    private _resolver: ComponentFactoryResolver,
    private _injector: Injector
  ) { }

  openPopup() {
    this._ngxPopupService.open(TestComponent, {
      resolver: this._resolver,
      injector: this._injector
    }, {
      width: '70%'
    }).subscribe(x => { });
  }

  openPopup2() {
    this._ngxPopupService.open(TestComponent, {
      resolver: this._resolver,
      injector: this._injector
    }).subscribe(x => { });
  }
}
