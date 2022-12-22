import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoEvaluatorComponent } from './promo-evaluator.component';

describe('PromoEvaluatorComponent', () => {
  let component: PromoEvaluatorComponent;
  let fixture: ComponentFixture<PromoEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoEvaluatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
