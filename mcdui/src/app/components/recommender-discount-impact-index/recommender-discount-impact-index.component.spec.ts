import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommenderDiscountImpactIndexComponent } from './recommender-discount-impact-index.component';

describe('RecommenderDiscountImpactIndexComponent', () => {
  let component: RecommenderDiscountImpactIndexComponent;
  let fixture: ComponentFixture<RecommenderDiscountImpactIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommenderDiscountImpactIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommenderDiscountImpactIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
