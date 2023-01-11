import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioPlannerDiscountComponent } from './scenario-planner-discount.component';

describe('ScenarioPlannerDiscountComponent', () => {
  let component: ScenarioPlannerDiscountComponent;
  let fixture: ComponentFixture<ScenarioPlannerDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioPlannerDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioPlannerDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
