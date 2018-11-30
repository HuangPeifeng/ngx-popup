import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { NgxPopupModule } from './ngx-popup/ngx-popup.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    NgxPopupModule
  ],
  entryComponents: [TestComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
