import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresardatosclienteComponent } from './ingresardatoscliente.component';

describe('IngresardatosclienteComponent', () => {
  let component: IngresardatosclienteComponent;
  let fixture: ComponentFixture<IngresardatosclienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresardatosclienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresardatosclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
