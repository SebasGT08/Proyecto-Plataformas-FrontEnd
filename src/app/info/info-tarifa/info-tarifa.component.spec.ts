import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTarifaComponent } from './info-tarifa.component';

describe('InfoTarifaComponent', () => {
  let component: InfoTarifaComponent;
  let fixture: ComponentFixture<InfoTarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTarifaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
