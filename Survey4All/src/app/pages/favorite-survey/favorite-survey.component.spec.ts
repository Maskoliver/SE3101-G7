import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteSurveyComponent } from './favorite-survey.component';

describe('FavoriteSurveyComponent', () => {
  let component: FavoriteSurveyComponent;
  let fixture: ComponentFixture<FavoriteSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
