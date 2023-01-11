import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedImpactComponent } from './recommended-impact.component';

describe('RecommendedImpactComponent', () => {
  let component: RecommendedImpactComponent;
  let fixture: ComponentFixture<RecommendedImpactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedImpactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
