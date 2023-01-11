import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioComparisionGraphComponent } from './scenario-comparision-graph.component';

describe('ScenarioComparisionGraphComponent', () => {
  let component: ScenarioComparisionGraphComponent;
  let fixture: ComponentFixture<ScenarioComparisionGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioComparisionGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioComparisionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
