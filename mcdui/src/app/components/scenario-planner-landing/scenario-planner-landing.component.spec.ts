import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioPlannerLandingComponent } from './scenario-planner-landing.component';

describe('ScenarioPlannerLandingComponent', () => {
  let component: ScenarioPlannerLandingComponent;
  let fixture: ComponentFixture<ScenarioPlannerLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScenarioPlannerLandingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioPlannerLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
