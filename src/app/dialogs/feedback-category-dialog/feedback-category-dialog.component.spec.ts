import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackCategoryDialogComponent } from './feedback-category-dialog.component';

describe('FeedbackCategoryDialogComponent', () => {
  let component: FeedbackCategoryDialogComponent;
  let fixture: ComponentFixture<FeedbackCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackCategoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
