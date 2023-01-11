import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioComparisionDetailComponent } from './scenario-comparision-detail.component';

describe('ScenarioComparisionDetailComponent', () => {
  let component: ScenarioComparisionDetailComponent;
  let fixture: ComponentFixture<ScenarioComparisionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioComparisionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioComparisionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
