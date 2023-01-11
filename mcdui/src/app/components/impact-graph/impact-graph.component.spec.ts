import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactGraphComponent } from './impact-graph.component';

describe('ImpactGraphComponent', () => {
  let component: ImpactGraphComponent;
  let fixture: ComponentFixture<ImpactGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
