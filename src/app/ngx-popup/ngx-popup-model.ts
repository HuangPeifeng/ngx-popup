import { ComponentFactoryResolver, Injector, ComponentRef } from '@angular/core';

export interface NgxPopupOption {
    data?: any;
    width?: String;
    height?: String;
    backgroundColor?: string;
    closeWithOut?: boolean;
    title?: string;
    titleColor?: string;
    closeBtnColor?: string;
    showHeader?: boolean;
}

export interface NgxPopup {
    id?;
    component;
    option?: NgxPopupOption;
    factory: NgxFactory;
}

export interface NgxFactory {
    resolver: ComponentFactoryResolver;
    injector: Injector;
}

export interface InternalNgxPopupResult {
    id?;
    result;
}

export interface NgxPopupSender {
    popupData: any;
    popupOutput: any;
}

export interface ComponentRefsModel {
    id;
    componentRef: ComponentRef<any>;
}
