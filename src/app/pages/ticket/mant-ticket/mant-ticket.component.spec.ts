import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantTicketComponent } from './mant-ticket.component';

describe('MantTicketComponent', () => {
  let component: MantTicketComponent;
  let fixture: ComponentFixture<MantTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
