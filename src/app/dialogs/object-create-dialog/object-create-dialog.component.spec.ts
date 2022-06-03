import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCreateDialogComponent } from './object-create-dialog.component';

describe('ObjectCreateDialogComponent', () => {
  let component: ObjectCreateDialogComponent;
  let fixture: ComponentFixture<ObjectCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
