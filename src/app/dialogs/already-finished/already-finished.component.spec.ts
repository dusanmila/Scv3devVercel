import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyFinishedComponent } from './already-finished.component';

describe('AlreadyFinishedComponent', () => {
  let component: AlreadyFinishedComponent;
  let fixture: ComponentFixture<AlreadyFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyFinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
