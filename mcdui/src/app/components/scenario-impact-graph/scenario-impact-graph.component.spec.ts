import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioImpactGraphComponent } from './scenario-impact-graph.component';

describe('ScenarioImpactGraphComponent', () => {
  let component: ScenarioImpactGraphComponent;
  let fixture: ComponentFixture<ScenarioImpactGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioImpactGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioImpactGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
