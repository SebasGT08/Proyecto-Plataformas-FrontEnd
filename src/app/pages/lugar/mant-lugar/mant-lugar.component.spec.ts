import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantLugarComponent } from './mant-lugar.component';

describe('MantLugarComponent', () => {
  let component: MantLugarComponent;
  let fixture: ComponentFixture<MantLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantLugarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
