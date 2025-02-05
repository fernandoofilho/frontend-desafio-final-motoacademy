import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  searchQuery: string = '';

  constructor(private searchService: SearchService){}

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.searchService.setSearchQuery(this.searchQuery);
  }

}
  // onSearchChange(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   this.searchQuery = input.value;
  //   console.log("Search query:", this.searchQuery, " Aguardando integração com backend");
  // }

