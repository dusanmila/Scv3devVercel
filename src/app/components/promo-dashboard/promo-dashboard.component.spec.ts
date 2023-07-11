import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoDashboardComponent } from './promo-dashboard.component';

describe('PromoDashboardComponent', () => {
  let component: PromoDashboardComponent;
  let fixture: ComponentFixture<PromoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
