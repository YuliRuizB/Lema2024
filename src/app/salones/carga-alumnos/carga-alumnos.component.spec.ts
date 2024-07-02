import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaAlumnosComponent } from './carga-alumnos.component';

describe('CargaAlumnosComponent', () => {
  let component: CargaAlumnosComponent;
  let fixture: ComponentFixture<CargaAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargaAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
