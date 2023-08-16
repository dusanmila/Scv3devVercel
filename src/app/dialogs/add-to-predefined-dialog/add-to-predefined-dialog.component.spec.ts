import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToPredefinedDialogComponent } from './add-to-predefined-dialog.component';

describe('AddToPredefinedDialogComponent', () => {
  let component: AddToPredefinedDialogComponent;
  let fixture: ComponentFixture<AddToPredefinedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToPredefinedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToPredefinedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
