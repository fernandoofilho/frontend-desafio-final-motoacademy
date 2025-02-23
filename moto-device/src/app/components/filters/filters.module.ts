import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearFilterComponent } from './year-filter/year-filter.component';
import { GroupFilterComponent } from './group-filter/group-filter.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { CoreCpuFilterComponent } from './core-cpu-filter/core-cpu-filter.component';
import { ManufacturerFilterComponent } from './manufacturer-filter/manufacturer-filter.component';
import { MemoryFilterComponent } from './memory-filter/memory-filter.component';
import { ScreenResolutionFilterComponent } from './screen-resolution-filter/screen-resolution-filter.component';
import { ScreenSizeFilterComponent } from './screen-size-filter/screen-size-filter.component';
@NgModule({
  declarations: [
    YearFilterComponent,
    GroupFilterComponent,
    CoreCpuFilterComponent,
    ManufacturerFilterComponent,
    MemoryFilterComponent,
    ScreenResolutionFilterComponent,
    ScreenSizeFilterComponent,
  ],
  imports: [CommonModule, MatSliderModule, MatSelectModule],
  exports: [
    YearFilterComponent,
    GroupFilterComponent,
    CoreCpuFilterComponent,
    ManufacturerFilterComponent,
    MemoryFilterComponent,
    ScreenResolutionFilterComponent,
    ScreenSizeFilterComponent,
  ],
})
export class FiltersModule {}
