import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoDialogComponent } from './promo-dialog.component';

describe('PromoDialogComponent', () => {
  let component: PromoDialogComponent;
  let fixture: ComponentFixture<PromoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
