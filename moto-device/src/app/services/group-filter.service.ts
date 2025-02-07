import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupFilterService {

  private groupQuerySubject = new BehaviorSubject<string>("");

  groupQuery$:Observable<string> = this.groupQuerySubject.asObservable();

  setGroupQuery(query: string): void {
    this.groupQuerySubject.next(query);
  }

  getGroupQuery(): string {
    return this.groupQuerySubject.getValue();
  }

  constructor() { }
}
