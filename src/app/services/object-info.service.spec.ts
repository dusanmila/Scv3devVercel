import { TestBed } from '@angular/core/testing';

import { ObjectInfoService } from './object-info.service';

describe('ObjectInfoService', () => {
  let service: ObjectInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
