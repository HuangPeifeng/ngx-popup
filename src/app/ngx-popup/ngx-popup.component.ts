import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentRef, OnDestroy } from '@angular/core';
import { NgxPopupDirective } from './ngx-popup.directive';
import { NgxPopupService } from './ngx-popup.service';
import { Subject } from 'rxjs';
import { NgxPopupOption, NgxPopup } from './ngx-popup-model';
import { NgxPopupOutput } from 'dist/app/ngx-popup/ngx-popup';

@Component({
  selector: 'app-ngx-popup',
  templateUrl: './ngx-popup.component.html',
  styleUrls: ['./ngx-popup.component.scss']
})
export class NgxPopupComponent implements OnInit, OnDestroy {
  componentRef: ComponentRef<any>;
  popupIsShow = false;

  /** default option */
  option = {
    /** 寬度 */
    width: 300,
    /** 高度 */
    height: 300,
    /** 背景色 */
    backgroungColor: '#ffffff',
    /** 是否可以點擊外面關閉popup */
    closeWithOut: false,
    /** 標題 */
    title: null,
    /** 標題顏色 */
    titleColor: '#000000'
  } as NgxPopupOption;

  @ViewChild(NgxPopupDirective) ngxPopup: NgxPopupDirective;

  constructor(
    private resolver: ComponentFactoryResolver,
    private _ngxPopupService: NgxPopupService
  ) { }

  ngOnInit() {
    this._ngxPopupService.dataChange
      .subscribe((data: NgxPopup) => {
        if (data) {
          this.popupIsShow = true;
          this.openPopup(data);
        }
      });
  }

  openPopup(data: NgxPopup) {
    const viewContainerRef = this.ngxPopup.viewContainerRef;
    const factory = this.resolver.resolveComponentFactory<NgxPopupOutput>(data.component);
    this.componentRef = viewContainerRef.createComponent<NgxPopupOutput>(factory);
    (this.componentRef.instance as NgxPopupOutput).result = new Subject<any>();

    (this.componentRef.instance as NgxPopupOutput).result.subscribe(x => {
      this._ngxPopupService.dataResult.next({
        id: data.id,
        result: x
      });
    });

    if (data.option) {
      Object.keys(data.option).map(property => {
        this.option[property] = data.option[property];
      });
    }
  }

  getBlockStyle() {
    return {
      'width': `${this.option.width}px`,
      'height': `${this.option.height}px`,
      'background-color': this.option.backgroundColor
    };
  }

  closePopupByOut($event) {
    if ($event.target.className.indexOf('popup-layout') > -1) {
      if (this.option.closeWithOut) {
        this.closePopup();
      }
    }
  }

  closePopup() {
    this.popupIsShow = false;
    this.componentRef.destroy();
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

}
