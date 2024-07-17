import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPagoComponent } from './ver-pago.component';

describe('VerPagoComponent', () => {
  let component: VerPagoComponent;
  let fixture: ComponentFixture<VerPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
