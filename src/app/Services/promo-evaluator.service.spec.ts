import { TestBed } from '@angular/core/testing';

import { PromoEvaluatorService } from './promo-evaluator.service';

describe('PromoEvaluatorService', () => {
  let service: PromoEvaluatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoEvaluatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
