import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportObjectsDialogComponent } from './export-objects-dialog.component';

describe('ExportObjectsDialogComponent', () => {
  let component: ExportObjectsDialogComponent;
  let fixture: ComponentFixture<ExportObjectsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportObjectsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportObjectsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
