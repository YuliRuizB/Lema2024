import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricionPageComponent } from './nutricion-page.component';

describe('NutricionPageComponent', () => {
  let component: NutricionPageComponent;
  let fixture: ComponentFixture<NutricionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutricionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutricionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
