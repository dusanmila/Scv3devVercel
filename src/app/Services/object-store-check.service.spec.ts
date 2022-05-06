import { TestBed } from '@angular/core/testing';

import { ObjectStoreCheckService } from './object-store-check.service';

describe('ObjectStoreCheckService', () => {
  let service: ObjectStoreCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectStoreCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
