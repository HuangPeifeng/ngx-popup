import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPopupComponent } from './ngx-popup.component';

describe('NgxPopupComponent', () => {
  let component: NgxPopupComponent;
  let fixture: ComponentFixture<NgxPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
