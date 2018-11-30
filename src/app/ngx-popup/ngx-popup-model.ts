export interface NgxPopupOption {
    width?: Number;
    height?: Number;
    backgroundColor?: string;
    closeWithOut?: boolean;
    title?: string;
    titleColor?: string;
}

export interface NgxPopup {
    id?;
    component;
    option?: NgxPopupOption;
}

export interface InternalNgxPopupResult {
    id?;
    result;
}

export interface NgxPopupOutput {
    result;
}
