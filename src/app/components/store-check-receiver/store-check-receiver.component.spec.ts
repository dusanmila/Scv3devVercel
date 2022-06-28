import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCheckReceiverComponent } from './store-check-receiver.component';

describe('StoreCheckReceiverComponent', () => {
  let component: StoreCheckReceiverComponent;
  let fixture: ComponentFixture<StoreCheckReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCheckReceiverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCheckReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
