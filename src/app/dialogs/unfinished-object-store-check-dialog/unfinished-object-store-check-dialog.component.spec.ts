import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfinishedObjectStoreCheckDialogComponent } from './unfinished-object-store-check-dialog.component';

describe('UnfinishedObjectStoreCheckDialogComponent', () => {
  let component: UnfinishedObjectStoreCheckDialogComponent;
  let fixture: ComponentFixture<UnfinishedObjectStoreCheckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnfinishedObjectStoreCheckDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfinishedObjectStoreCheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
