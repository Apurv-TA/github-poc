import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportRecommenderComponent } from './import-recommender.component';

describe('ImportRecommenderComponent', () => {
  let component: ImportRecommenderComponent;
  let fixture: ComponentFixture<ImportRecommenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportRecommenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportRecommenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
