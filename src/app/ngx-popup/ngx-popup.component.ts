import {
  Component,
  OnInit,
  ReflectiveInjector,
  Injector,
  ViewChildren,
  QueryList
} from '@angular/core';
import { NgxPopupDirective } from './ngx-popup.directive';
import { NgxPopupService } from './ngx-popup.service';
import { NgxPopupOption, NgxPopup, NgxPopupSender, ComponentRefsModel } from './ngx-popup-model';

@Component({
  selector: 'ngx-popup',
  templateUrl: './ngx-popup.component.html',
  styleUrls: ['./ngx-popup.component.scss']
})
export class NgxPopupComponent implements OnInit {
  componentRef: ComponentRefsModel[] = [];
  refInjector: ReflectiveInjector;
  injector: Injector;
  popupList: NgxPopup[] = [];

  /** default option */
  defaultOption = {
    /** Input */
    data: null,
    /** 寬度 */
    width: '30%',
    /** 高度 */
    height: 'auto',
    /** 背景色 */
    backgroungColor: '#ffffff',
    /** 是否可以點擊外面關閉popup */
    closeWithOut: false,
    /** 標題 */
    title: null,
    /** 標題顏色 */
    titleColor: '#000000',
    /** 關閉按鈕顏色 */
    closeBtnColor: '#000000',
    /** 是否顯示header */
    showHeader: false
  } as NgxPopupOption;

  @ViewChildren(NgxPopupDirective) ngxPopup: QueryList<NgxPopupDirective>;

  constructor(
    private _ngxPopupService: NgxPopupService
  ) { }

  ngOnInit() {
    this._ngxPopupService.dataChange
      .subscribe((data: NgxPopup) => {
        if (data) {
          /** Option */
          if (data.option) {
            Object.keys(this.defaultOption).map(property => {
              if (!data.option[property]) {
                data.option[property] = this.defaultOption[property];
              }
            });
          } else {
            data.option = this.defaultOption;
          }
          this.popupList.push(data);
          setTimeout(() => {
            this.openPopup(data);
          });
        }
      });

    this._ngxPopupService.closeEvent.subscribe(data => {
      this.closePopup(data);
    });
  }

  openPopup(data: NgxPopup) {
    /** createComponent */
    const viewContainerRef = this.ngxPopup.last.viewContainerRef;
    const factory = data.factory.resolver.resolveComponentFactory(data.component);
    this.refInjector = ReflectiveInjector.resolveAndCreate([{ provide: data.component, useValue: data.component }], data.factory.injector);
    this.componentRef.push({
      id: data.id,
      componentRef: viewContainerRef.createComponent(factory, 0, this.refInjector)
    });

    const componentRef = this.componentRef[this.componentRef.length - 1].componentRef;
    /** Input */
    if (data.option) {
      (componentRef.instance as NgxPopupSender).popupData = data.option.data;
    }

    /** Output */
    (componentRef.instance as NgxPopupSender).popupOutput.subscribe(x => {
      this._ngxPopupService.dataResult.next({
        id: data.id,
        result: x
      });
    });
  }

  /** 取得option的style */
  getBlockStyle(data: NgxPopup) {
    if (data.option) {
      return {
        'width': `${data.option.width}`,
        'height': `${data.option.height}`,
        'background-color': data.option.backgroundColor
      };
    }
  }

  /** 是否可以從外面關閉popup */
  closePopupByOut($event, data: NgxPopup) {
    if ($event.target.className.indexOf('popup-layout') > -1) {
      if (data.option.closeWithOut) {
        this.closePopup(data);
      }
    }
  }

  /** 關閉popup */
  closePopup(data: NgxPopup) {
    this.componentRef = this.componentRef.filter(item => {
      if (item.id === data.id) {
        this.popupList.pop();
        item.componentRef.destroy();
        return;
      }
      return item;
    });
  }

}
