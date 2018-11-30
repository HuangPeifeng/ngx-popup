import { Component } from '@angular/core';
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
    private _ngxPopupService: NgxPopupService
  ) { }

  openPopup() {
    this._ngxPopupService.open(TestComponent, {
      width: 400,
      height: 400
    }).subscribe(x => { });
  }
}
