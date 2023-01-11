import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedIssueComponent } from './closed-issue.component';

describe('ClosedIssueComponent', () => {
  let component: ClosedIssueComponent;
  let fixture: ComponentFixture<ClosedIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
