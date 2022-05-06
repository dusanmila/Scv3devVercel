import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCheckPageComponent } from './store-check-page.component';

describe('StoreCheckPageComponent', () => {
  let component: StoreCheckPageComponent;
  let fixture: ComponentFixture<StoreCheckPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCheckPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCheckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
