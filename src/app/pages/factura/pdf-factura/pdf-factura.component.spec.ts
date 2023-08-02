import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfFacturaComponent } from './pdf-factura.component';

describe('PdfFacturaComponent', () => {
  let component: PdfFacturaComponent;
  let fixture: ComponentFixture<PdfFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
