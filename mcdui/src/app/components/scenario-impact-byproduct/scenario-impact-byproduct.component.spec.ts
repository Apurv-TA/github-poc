import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioImpactByproductComponent } from './scenario-impact-byproduct.component';

describe('ScenarioImpactByproductComponent', () => {
  let component: ScenarioImpactByproductComponent;
  let fixture: ComponentFixture<ScenarioImpactByproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioImpactByproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioImpactByproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
