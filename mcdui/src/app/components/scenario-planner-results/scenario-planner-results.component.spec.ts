import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioPlannerResultsComponent } from './scenario-planner-results.component';

describe('ScenarioPlannerResultsComponent', () => {
  let component: ScenarioPlannerResultsComponent;
  let fixture: ComponentFixture<ScenarioPlannerResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioPlannerResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioPlannerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
