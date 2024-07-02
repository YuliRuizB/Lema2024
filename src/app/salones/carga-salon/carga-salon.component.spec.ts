import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaSalonComponent } from './carga-salon.component';

describe('CargaSalonComponent', () => {
  let component: CargaSalonComponent;
  let fixture: ComponentFixture<CargaSalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargaSalonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
