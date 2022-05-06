import { TestBed } from '@angular/core/testing';

import { StoreCheckService } from './store-check.service';

describe('StoreCheckService', () => {
  let service: StoreCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
