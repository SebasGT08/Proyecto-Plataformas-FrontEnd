import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLugarComponent } from './info-lugar.component';

describe('InfoLugarComponent', () => {
  let component: InfoLugarComponent;
  let fixture: ComponentFixture<InfoLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoLugarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
