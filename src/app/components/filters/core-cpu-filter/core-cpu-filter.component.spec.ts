import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreCpuFilterComponent } from './core-cpu-filter.component';

describe('CoreCpuFilterComponent', () => {
  let component: CoreCpuFilterComponent;
  let fixture: ComponentFixture<CoreCpuFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreCpuFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreCpuFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
