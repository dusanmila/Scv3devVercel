import { TestBed } from '@angular/core/testing';

import { FeedbackCategoryService } from './feedback-category.service';

describe('FeedbackCategoryService', () => {
  let service: FeedbackCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
