import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaPagoComponent } from './carga-pago.component';

describe('CargaPagoComponent', () => {
  let component: CargaPagoComponent;
  let fixture: ComponentFixture<CargaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargaPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
