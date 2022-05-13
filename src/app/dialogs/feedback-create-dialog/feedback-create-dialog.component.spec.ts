import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackCreateDialogComponent } from './feedback-create-dialog.component';

describe('FeedbackCreateDialogComponent', () => {
  let component: FeedbackCreateDialogComponent;
  let fixture: ComponentFixture<FeedbackCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
