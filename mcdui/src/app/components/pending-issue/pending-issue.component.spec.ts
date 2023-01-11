import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingIssueComponent } from './pending-issue.component';

describe('PendingIssueComponent', () => {
  let component: PendingIssueComponent;
  let fixture: ComponentFixture<PendingIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
