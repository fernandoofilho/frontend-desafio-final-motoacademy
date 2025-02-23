import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenResolutionFilterComponent } from './screen-resolution-filter.component';

describe('ScreenResolutionFilterComponent', () => {
  let component: ScreenResolutionFilterComponent;
  let fixture: ComponentFixture<ScreenResolutionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenResolutionFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenResolutionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
