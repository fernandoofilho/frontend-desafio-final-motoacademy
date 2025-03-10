import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/filters/search.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchOptionsEnum } from '../../shared/enums/search-options.enum';
import { FilterManagerService } from '../../services/filters/filter-manager.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatTooltipModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private aiText = 'Pergunte para a AI 🧠';
  text = this.aiText;
  private modelText = 'Busque um Modelo 📱';
  private textSubject = new BehaviorSubject<string>(this.text);
  isLoading: boolean = false;
  searchQuery: string = '';
  Loading$!: Observable<boolean>;
  altText = this.modelText;
  option = SearchOptionsEnum.AI;
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private filterManager: FilterManagerService
  ) {
    this.textSubject.subscribe((newText) => {
      const showFilter = newText !== this.aiText;
      filterManager.setShowFilter(showFilter);
    });
  }
  ngOnInit(): void {
    this.Loading$ = this.filterManager.loading$;
    this.Loading$.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  execute() {
    if (this.option === SearchOptionsEnum.AI) {
      this.filterManager.setLoading(true);
      this.filterManager.setExecuteAISearch(true);
    } else {
      this.filterManager.setLoading(true);
      this.filterManager.setExecuteSearch(true);
    }
  }

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
