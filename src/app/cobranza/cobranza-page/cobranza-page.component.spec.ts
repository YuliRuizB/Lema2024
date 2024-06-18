import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobranzaPageComponent } from './cobranza-page.component';

describe('CobranzaPageComponent', () => {
  let component: CobranzaPageComponent;
  let fixture: ComponentFixture<CobranzaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CobranzaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CobranzaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
