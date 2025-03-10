import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterManagerService {
  private filterManager = new BehaviorSubject<boolean>(false);
  private executeSearch = new BehaviorSubject<boolean>(false);
  private executeAISearch = new BehaviorSubject<boolean>(false);
  private loading = new BehaviorSubject<boolean>(false);



  showFilter$: Observable<boolean> = this.filterManager.asObservable();
  executeSearch$: Observable<boolean> = this.executeSearch.asObservable();
  executeAISearch$: Observable<boolean> = this.executeAISearch.asObservable();
  loading$: Observable<boolean> = this.loading.asObservable();

  setShowFilter(value: boolean): void {
    this.filterManager.next(value);
  }

  getShowFilter(): boolean {
    return this.filterManager.getValue();
  }

  setExecuteSearch(value: boolean): void {
    this.executeSearch.next(value);
  }

  getExecuteSearch(): boolean {
    return this.executeSearch.getValue();
  }

  setExecuteAISearch(value: boolean): void {
    this.executeAISearch.next(value);
  }

  getExecuteAISearch(): boolean {
    return this.executeAISearch.getValue();
  }

  setLoading(value: boolean): void {
    this.loading.next(value);
  }

  getLoading(): boolean {
    return this.loading.getValue();
  }




  constructor() {}
}
