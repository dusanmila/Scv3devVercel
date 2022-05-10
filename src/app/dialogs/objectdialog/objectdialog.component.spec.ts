import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectdialogComponent } from './objectdialog.component';

describe('ObjectdialogComponent', () => {
  let component: ObjectdialogComponent;
  let fixture: ComponentFixture<ObjectdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
