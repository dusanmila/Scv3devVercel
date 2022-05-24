import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectDialogComponent } from './objectdialog.component';

describe('ObjectdialogComponent', () => {
  let component: ObjectDialogComponent;
  let fixture: ComponentFixture<ObjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
