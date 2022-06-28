import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCheckReceiverDialogComponent } from './store-check-receiver-dialog.component';

describe('StoreCheckReceiverDialogComponent', () => {
  let component: StoreCheckReceiverDialogComponent;
  let fixture: ComponentFixture<StoreCheckReceiverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCheckReceiverDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCheckReceiverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
