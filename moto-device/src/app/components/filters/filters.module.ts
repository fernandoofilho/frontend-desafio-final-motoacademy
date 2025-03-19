import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { CoreCpuFilterComponent } from './core-cpu-filter/core-cpu-filter.component';
import { GroupFilterComponent } from './group-filter/group-filter.component';
import { ManufacturerFilterComponent } from './manufacturer-filter/manufacturer-filter.component';
import { MemoryFilterComponent } from './memory-filter/memory-filter.component';
import { ScreenSizeFilterComponent } from './screen-size-filter/screen-size-filter.component';
import { YearFilterComponent } from './year-filter/year-filter.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PhoneOrWatchComponent } from './phone-or-watch/phone-or-watch.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    YearFilterComponent,
    GroupFilterComponent,
    CoreCpuFilterComponent,
    ManufacturerFilterComponent,
    MemoryFilterComponent,
    ScreenSizeFilterComponent,
    PhoneOrWatchComponent,
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  exports: [
    YearFilterComponent,
    GroupFilterComponent,
    CoreCpuFilterComponent,
    ManufacturerFilterComponent,
    MemoryFilterComponent,
    ScreenSizeFilterComponent,
    PhoneOrWatchComponent,
  ],
})
export class FiltersModule {}
