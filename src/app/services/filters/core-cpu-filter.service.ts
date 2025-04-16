import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CoreCpuFilterService {
  private coreCPUQuerySubject = new BehaviorSubject<string>('');

  coreCPU$: Observable<string> = this.coreCPUQuerySubject.asObservable();

  setCoreCPU(query: string): void {
    this.coreCPUQuerySubject.next(query);
  }

  getCoreCPU(): string {
    return this.coreCPUQuerySubject.getValue();
  }

  constructor() {}
}
