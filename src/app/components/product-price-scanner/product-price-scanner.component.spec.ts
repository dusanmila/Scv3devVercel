import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceScannerComponent } from './product-price-scanner.component';

describe('ProductPriceScannerComponent', () => {
  let component: ProductPriceScannerComponent;
  let fixture: ComponentFixture<ProductPriceScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPriceScannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriceScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
