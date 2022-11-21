import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturndialogComponent } from './returndialog.component';

describe('ReturndialogComponent', () => {
  let component: ReturndialogComponent;
  let fixture: ComponentFixture<ReturndialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturndialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturndialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
