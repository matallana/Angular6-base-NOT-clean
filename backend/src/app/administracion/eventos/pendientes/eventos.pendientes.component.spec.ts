import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosPendientesComponent } from './eventos.pendientes.component';

describe('EventosReformuladosComponent', () => {
  let component: EventosPendientesComponent;
  let fixture: ComponentFixture<EventosPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
