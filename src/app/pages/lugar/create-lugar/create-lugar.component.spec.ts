import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLugarComponent } from './create-lugar.component';

describe('CreateLugarComponent', () => {
  let component: CreateLugarComponent;
  let fixture: ComponentFixture<CreateLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLugarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
