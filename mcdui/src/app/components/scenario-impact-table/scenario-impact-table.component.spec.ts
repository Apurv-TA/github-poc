import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioImpactTableComponent } from './scenario-impact-table.component';

describe('ScenarioImpactTableComponent', () => {
  let component: ScenarioImpactTableComponent;
  let fixture: ComponentFixture<ScenarioImpactTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioImpactTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioImpactTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
