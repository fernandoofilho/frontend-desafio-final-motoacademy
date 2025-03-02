import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterManagerService {
  private filterManager = new BehaviorSubject<boolean>(false);

  showFilter$: Observable<boolean> = this.filterManager.asObservable();

  setShowFilter(query: boolean): void {
    this.filterManager.next(query);
  }

  getShowFilter(): boolean {
    return this.filterManager.getValue();
  }

  constructor() {}
}
