import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDeviceListComponent } from './skeleton-device-list.component';

describe('SkeletonDeviceListComponent', () => {
  let component: SkeletonDeviceListComponent;
  let fixture: ComponentFixture<SkeletonDeviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonDeviceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonDeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
