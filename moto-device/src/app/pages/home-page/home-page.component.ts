import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { DeviceListComponent } from '../../components/device-list/device-list.component';
import { YearFilterComponent } from '../../components/year-filter/year-filter.component';
@Component({
  selector: 'app-home-page',
  imports: [NavbarComponent,SearchBarComponent,DeviceListComponent, YearFilterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
