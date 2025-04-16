import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerFilterComponent } from './manufacturer-filter.component';

describe('ManufacturerFilterComponent', () => {
  let component: ManufacturerFilterComponent;
  let fixture: ComponentFixture<ManufacturerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturerFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
