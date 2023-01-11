import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferRecommenderComponent } from './offer-recommender.component';

describe('OfferRecommenderComponent', () => {
  let component: OfferRecommenderComponent;
  let fixture: ComponentFixture<OfferRecommenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferRecommenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferRecommenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
