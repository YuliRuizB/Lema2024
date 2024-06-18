import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaAlumnoComponent } from './carga-alumno.component';

describe('CargaAlumnoComponent', () => {
  let component: CargaAlumnoComponent;
  let fixture: ComponentFixture<CargaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargaAlumnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
