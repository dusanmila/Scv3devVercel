import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedFeedbackComponent } from './resolved-feedback.component';

describe('ResolvedFeedbackComponent', () => {
  let component: ResolvedFeedbackComponent;
  let fixture: ComponentFixture<ResolvedFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolvedFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
