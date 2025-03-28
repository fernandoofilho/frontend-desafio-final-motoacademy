import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearFilterComponent } from './year-filter.component';

describe('YearFilterComponent', () => {
  let component: YearFilterComponent;
  let fixture: ComponentFixture<YearFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
