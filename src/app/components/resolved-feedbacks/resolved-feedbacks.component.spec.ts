import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedFeedbacksComponent } from './resolved-feedbacks.component';

describe('ResolvedFeedbacksComponent', () => {
  let component: ResolvedFeedbacksComponent;
  let fixture: ComponentFixture<ResolvedFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolvedFeedbacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
