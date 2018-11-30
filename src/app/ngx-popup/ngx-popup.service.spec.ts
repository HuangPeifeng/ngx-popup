import { TestBed } from '@angular/core/testing';

import { NgxPopupService } from './ngx-popup.service';

describe('NgxPopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxPopupService = TestBed.get(NgxPopupService);
    expect(service).toBeTruthy();
  });
});
