import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosAprobadosComponent } from './eventos.aprobados.component';

describe('EventosAprobadosComponent', () => {
  let component: EventosAprobadosComponent;
  let fixture: ComponentFixture<EventosAprobadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosAprobadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
