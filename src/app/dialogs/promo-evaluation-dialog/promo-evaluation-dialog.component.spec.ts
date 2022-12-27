import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoEvaluatorDialogComponent } from './promo-evaluation-dialog.component';

describe('PromoEvaluationDialogComponent', () => {
  let component: PromoEvaluatorDialogComponent;
  let fixture: ComponentFixture<PromoEvaluatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoEvaluatorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoEvaluatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
