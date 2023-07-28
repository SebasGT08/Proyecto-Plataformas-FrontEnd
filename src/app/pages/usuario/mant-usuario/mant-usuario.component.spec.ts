import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantUsuarioComponent } from './mant-usuario.component';

describe('MantUsuarioComponent', () => {
  let component: MantUsuarioComponent;
  let fixture: ComponentFixture<MantUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
