import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class YearFilterService {

  private yearQuerySubject = new BehaviorSubject<string>("");

  yearQuery$: Observable<string> = this.yearQuerySubject.asObservable();

  setYearQuery(query: string): void {
    this.yearQuerySubject.next(query);
  }

  getYearQuery(): string {
    return this.yearQuerySubject.getValue();
  }

  constructor() { }
}
