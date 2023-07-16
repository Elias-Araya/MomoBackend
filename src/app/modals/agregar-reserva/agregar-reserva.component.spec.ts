import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarReservaComponent } from './agregar-reserva.component';

describe('AgregarReservaComponent', () => {
  let component: AgregarReservaComponent;
  let fixture: ComponentFixture<AgregarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
