import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgxPopupOption, NgxPopup, InternalNgxPopupResult, NgxPopupOutput } from './ngx-popup-model';
@Injectable({
  providedIn: 'root'
})
export class NgxPopupService {

  dataChange = new Subject<NgxPopup>();
  dataResult = new Subject<InternalNgxPopupResult>();

  constructor() { }

  open(component: Type<NgxPopupOutput>, option?: NgxPopupOption) {
    const id = new Date().getTime();
    this.dataChange.next({
      id: id,
      component: component,
      option: option
    });
    const result = new Subject<any>();
    this.dataResult
      .pipe(
        filter(x => x.id === id)
      ).subscribe(x => {
        result.next(x.result);
      });
    return result;
  }
}
