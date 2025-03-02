import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/filters/search.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchOptionsEnum } from '../../shared/enums/search-options.enum';
import { FilterManagerService } from '../../services/filters/filter-manager.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatTooltipModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchQuery: string = '';

  private aiText = 'Pergunte para a AI 🧠';
  private modelText = 'Busque um Modelo 📱';

  text = this.aiText;
  altText = this.modelText;
  option = SearchOptionsEnum.AI;
  private textSubject = new BehaviorSubject<string>(this.text);

  constructor(
    private searchService: SearchService,
    showFilterManagerService: FilterManagerService
  ) {
    this.textSubject.subscribe((newText) => {
      const showFilter = newText !== this.aiText;
      showFilterManagerService.setShowFilter(showFilter);
    });
  }

  execute(){}


  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.searchService.setSearchQuery(this.searchQuery);
  }
  changeView() {
    const newText =
      this.option === SearchOptionsEnum.AI ? this.modelText : this.aiText;
    this.option =
      this.option === SearchOptionsEnum.AI
        ? SearchOptionsEnum.TEXT
        : SearchOptionsEnum.AI;
    this.altText = this.text;
    this.animateTextChange(newText);
  }

  animateTextChange(newText: string) {
    let currentText = this.text;
    let i = currentText.length;

    const eraseInterval = setInterval(() => {
      if (i > 0) {
        this.text = currentText.substring(0, i - 1);
        i--;
      } else {
        clearInterval(eraseInterval);

        let j = 0;
        const typeInterval = setInterval(() => {
          if (j < newText.length) {
            this.text += newText[j];
            j++;
          } else {
            clearInterval(typeInterval);
            this.textSubject.next(this.text);
          }
        }, 10);
      }
    }, 10);
  }
}
// onSearchChange(event: Event): void {
//   const input = event.target as HTMLInputElement;
//   this.searchQuery = input.value;
//   console.log("Search query:", this.searchQuery, " Aguardando integração com backend");
// }
