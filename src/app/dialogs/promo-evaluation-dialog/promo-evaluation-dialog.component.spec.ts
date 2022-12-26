import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoEvaluationDialogComponent } from './promo-evaluation-dialog.component';

describe('PromoEvaluationDialogComponent', () => {
  let component: PromoEvaluationDialogComponent;
  let fixture: ComponentFixture<PromoEvaluationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoEvaluationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoEvaluationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
