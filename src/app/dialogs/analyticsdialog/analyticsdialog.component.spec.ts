import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsdialogComponent } from './analyticsdialog.component';

describe('AnalyticsdialogComponent', () => {
  let component: AnalyticsdialogComponent;
  let fixture: ComponentFixture<AnalyticsdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
