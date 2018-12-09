import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, Injector } from '@angular/core';
import { NgxPopupSender } from '../ngx-popup/ngx-popup-model';
import { NgxPopupService } from '../ngx-popup';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, NgxPopupSender {
  @Input() popupData;
  @Output() popupOutput = new EventEmitter;

  constructor(
    private _ngxPopupService: NgxPopupService,
    private _resolver: ComponentFactoryResolver,
    private _injector: Injector
  ) { }

  ngOnInit() { }

  open() {
    this._ngxPopupService.open(TestComponent, {
      resolver: this._resolver,
      injector: this._injector
    }, {
        width: '30%'
      }).subscribe(x => {

      });
  }

  close() {
    this.popupOutput.next(123123);
  }
}
