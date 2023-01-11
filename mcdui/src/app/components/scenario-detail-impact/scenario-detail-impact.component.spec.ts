import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioDetailImpactComponent } from './scenario-detail-impact.component';

describe('ScenarioDetailImpactComponent', () => {
  let component: ScenarioDetailImpactComponent;
  let fixture: ComponentFixture<ScenarioDetailImpactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioDetailImpactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioDetailImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
