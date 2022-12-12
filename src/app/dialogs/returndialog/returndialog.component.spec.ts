import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDialogComponent } from './returndialog.component';

describe('ReturndialogComponent', () => {
  let component: ReturnDialogComponent;
  let fixture: ComponentFixture<ReturnDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
