import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MemoryFilterService {
  private memoryQuerySubject = new BehaviorSubject<string>("");

  memoryQuery$:Observable<string> = this.memoryQuerySubject.asObservable();

  setMemoryQuery(query: string): void {
    this.memoryQuerySubject.next(query);
  }

  getMemoryQuery(): string {
    return this.memoryQuerySubject.getValue();
  }
  constructor() { }
}
