import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceScannerDialogComponent } from './product-price-scanner-dialog.component';

describe('ProductPriceScannerDialogComponent', () => {
  let component: ProductPriceScannerDialogComponent;
  let fixture: ComponentFixture<ProductPriceScannerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPriceScannerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriceScannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
