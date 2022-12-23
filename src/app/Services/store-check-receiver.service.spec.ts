import { TestBed } from '@angular/core/testing';

import { StoreCheckReceiverService } from './store-check-receiver.service';

describe('StoreCheckReceiverService', () => {
  let service: StoreCheckReceiverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreCheckReceiverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
