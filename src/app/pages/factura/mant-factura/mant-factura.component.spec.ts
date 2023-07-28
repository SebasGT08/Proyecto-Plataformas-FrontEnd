import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantFacturaComponent } from './mant-factura.component';

describe('MantFacturaComponent', () => {
  let component: MantFacturaComponent;
  let fixture: ComponentFixture<MantFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
