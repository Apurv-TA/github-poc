import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McdComponent } from './mcd.component';

describe('McdComponent', () => {
  let component: McdComponent;
  let fixture: ComponentFixture<McdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
