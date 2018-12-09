import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgxPopupOption, NgxPopup, InternalNgxPopupResult, NgxFactory, NgxPopupSender } from './ngx-popup-model';

@Injectable({
  providedIn: 'root'
})
export class NgxPopupService {
  popupList: NgxPopup[] = [];

  dataChange = new Subject<NgxPopup>();
  dataResult = new Subject<InternalNgxPopupResult>();

  closeEvent = new Subject<NgxPopup>();

  constructor() { }

  open(component: Type<NgxPopupSender>, factory: NgxFactory, option?: NgxPopupOption) {
    const id = new Date().getTime();
    const popup = {
      id: id,
      component: component,
      factory: factory,
      option: option
    } as NgxPopup;
    this.popupList.push(popup);
    this.dataChange.next(popup);
    const result = new Subject<any>();
    this.dataResult
      .pipe(
        filter(x => x.id === id)
      ).subscribe(x => {
        this.closeEvent.next(popup);
        result.next(x.result);
      });
    return result;
  }


}
