import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ManufacturerFilterService {
  private manufacturerQuerySubject = new BehaviorSubject<string>('');

  manufacturerQuery$: Observable<string> =
    this.manufacturerQuerySubject.asObservable();

  setManufacturerQuery(query: string): void {
    this.manufacturerQuerySubject.next(query);
  }

  getManufacturerQuery(): string {
    return this.manufacturerQuerySubject.getValue();
  }
  constructor() {}
}
