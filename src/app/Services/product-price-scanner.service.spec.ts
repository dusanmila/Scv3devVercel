import { TestBed } from '@angular/core/testing';

import { ProductPriceScannerService } from './product-price-scanner.service';

describe('ProductPriceScannerService', () => {
  let service: ProductPriceScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPriceScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
