import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanogramDialogComponent } from './planogram-dialog.component';

describe('PlanogramDialogComponent', () => {
  let component: PlanogramDialogComponent;
  let fixture: ComponentFixture<PlanogramDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanogramDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanogramDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
