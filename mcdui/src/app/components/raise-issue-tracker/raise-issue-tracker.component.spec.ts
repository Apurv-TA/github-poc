import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseIssueTrackerComponent } from './raise-issue-tracker.component';

describe('RaiseIssueTrackerComponent', () => {
  let component: RaiseIssueTrackerComponent;
  let fixture: ComponentFixture<RaiseIssueTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseIssueTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseIssueTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
