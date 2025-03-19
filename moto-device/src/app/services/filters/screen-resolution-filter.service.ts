import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ScreenResolutionFilterService {
  private screenResolutionQuerySubject = new BehaviorSubject<string>('');

  screenResolutionQuery$: Observable<string> =
    this.screenResolutionQuerySubject.asObservable();

  setScreenResolutionQuery(query: string): void {
    this.screenResolutionQuerySubject.next(query);
  }

  getScreenResolutionQuery(): string {
    return this.screenResolutionQuerySubject.getValue();
  }
  constructor() {}
}
