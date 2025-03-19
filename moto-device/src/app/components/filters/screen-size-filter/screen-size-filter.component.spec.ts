import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSizeFilterComponent } from './screen-size-filter.component';

describe('ScreenSizeFilterComponent', () => {
  let component: ScreenSizeFilterComponent;
  let fixture: ComponentFixture<ScreenSizeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenSizeFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenSizeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
