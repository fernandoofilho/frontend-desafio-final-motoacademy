import { Component} from '@angular/core';
import { YearFilterService } from '../../services/year-filter.service';
import { MatSliderModule } from '@angular/material/slider'
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-year-filter',
  standalone: true,
  imports: [MatSliderModule, ],
  templateUrl: './year-filter.component.html',
  styleUrl: './year-filter.component.css'
})
export class YearFilterComponent {



  constructor (private yearFilterService: YearFilterService) {}

  


}
