import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioComparisionTableComponent } from './scenario-comparision-table.component';

describe('ScenarioComparisionTableComponent', () => {
  let component: ScenarioComparisionTableComponent;
  let fixture: ComponentFixture<ScenarioComparisionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioComparisionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioComparisionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
