import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDashboardComponent } from './return-dashboard.component';

describe('ReturnDashboardComponent', () => {
  let component: ReturnDashboardComponent;
  let fixture: ComponentFixture<ReturnDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
