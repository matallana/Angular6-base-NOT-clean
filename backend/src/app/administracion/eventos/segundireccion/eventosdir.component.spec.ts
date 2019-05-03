import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosdirComponent } from './eventosdir.component';

describe('EventosComponent', () => {
  let component: EventosdirComponent;
  let fixture: ComponentFixture<EventosdirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosdirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosdirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
