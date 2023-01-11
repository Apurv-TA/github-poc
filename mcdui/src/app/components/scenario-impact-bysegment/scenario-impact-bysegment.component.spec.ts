import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioImpactBysegmentComponent } from './scenario-impact-bysegment.component';

describe('ScenarioImpactBysegmentComponent', () => {
  let component: ScenarioImpactBysegmentComponent;
  let fixture: ComponentFixture<ScenarioImpactBysegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioImpactBysegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioImpactBysegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
