import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedSelectionComponent } from './feed-selection.component';

describe('FeedSelectionComponent', () => {
  let component: FeedSelectionComponent;
  let fixture: ComponentFixture<FeedSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
