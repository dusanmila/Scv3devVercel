import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChart3Component } from './pie-chart3.component';

describe('PieChart3Component', () => {
  let component: PieChart3Component;
  let fixture: ComponentFixture<PieChart3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChart3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
