import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferConfigurationComponent } from './offer-configuration.component';

describe('OfferConfigurationComponent', () => {
  let component: OfferConfigurationComponent;
  let fixture: ComponentFixture<OfferConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
