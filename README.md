# NgxPopup

NgxPopup

## 安裝

```bash
npm install pf-ngx-popup
```

## 引用

`app.module.ts`
```typescript
...something...
import { NgxPopupModule } from '@hamastar/ngx-popup';

@NgModule({
  ...something...
  imports: [...something..., NgxPopupModule],
  ...something...
})
export class YourModule {}
```
`app.component.html`
```html
<ngx-popup></ngx-popup>
```

## 快速上手

### 一、建立popup組件(Component)

此popup可以客製化內容，所以每個popup都需建立Component，這個組件必須要`implements NgxPopupSender`，這個介面將提供參考。

本範例使用 Angular CLI 建立用以顯示節點的組件 (TestComponent):

```bash
ng g c Test
```

如此已經建立一個`TestComponent`，但是由於這個組件是**動態載入**的，所以我們需要
再使用到popup的`Module`中加入以下內容 :

```typescript
@NgModule({
  ...something...
  entryComponents: [...something..., TestComponent]
})
export class YourModule {}
```

建立組件後於`test.component.ts`中實作介面`NgxPopupSender`，`popupData`為傳入popup的資訊，`popupOutput`為關閉popup後可以帶出的資訊。

```typescript
import { NgxPopupSender } from '../ngx-popup/ngx-popup-model';

export class TestComponent implements NgxPopupSender {
    @Input() popupData;
    @Output() popupOutput = new EventEmitter;
}
```

### 二、開啟Popup

由 `NgxPopupService` 的 `open` 方法呼叫，考慮到lazy load module，必須將 `ComponentFactoryResolver` 與 `Injector` 帶入，以**動態載入**的方式產生popup
```typescript
import { Component, ComponentFactoryResolver, Injector } from '@angular/core';
import { NgxPopupService } from './ngx-popup/ngx-popup.service';
import { TestComponent } from './test/test.component';

export class YourComponent {

  constructor(
    private _ngxPopupService: NgxPopupService,
    private _resolver: ComponentFactoryResolver,
    private _injector: Injector
  ) { }

  openPopup() {
    this._ngxPopupService.open(TestComponent, {
      resolver: this._resolver,
      injector: this._injector
    }).subscribe(x => { });
  }
}
```

`open` 方法可引入三個參數
```typescript

component: Type<NgxPopupSender>

factory: NgxFactory = {
    resolver: ComponentFactoryResolver;
    injector: Injector;
}

option?: NgxPopupOption = {

    /** 
     * Input
     * default: null
     */
    data: null,

    /** 
     * 寬度
     * default: '30%'
     *  */
    width: '30%',

    /** 
     * 高度
     * default: auto
     *  */
    height: 'auto',

    /** 
     * 背景色
     * default: '#ffffff'
     *  */
    backgroungColor: '#ffffff',

    /** 
     * 是否可以點擊外面關閉popup
     * default: false
     *  */
    closeWithOut: false,

    /** 
     * 標題
     * default: null
     *  */
    title: null,

    /** 
     * 標題顏色
     * default: '#000000'
     *  */
    titleColor: '#000000',

    /** 
     * 關閉按鈕顏色
     * default: '#000000'
     *  */
    closeBtnColor: '#000000'

    /**
     * 是否顯示header
     * default: false
     * */
    showHeader: false
}
```
