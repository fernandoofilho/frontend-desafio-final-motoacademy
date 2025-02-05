import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-device-list',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit{

  searchQuery!: Observable<string>;

  constructor(private searchService: SearchService){}

  ngOnInit(): void {
    this.searchQuery = this.searchService.searchQuery$;
  }

}
