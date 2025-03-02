import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceTypeFilterService {
  private deviceTypeQuerySubject = new BehaviorSubject<string>('');

  deviceType$: Observable<string> = this.deviceTypeQuerySubject.asObservable();

  setDeviceType(query: string): void {
    this.deviceTypeQuerySubject.next(query);
  }

  getDeviceType(): string {
    return this.deviceTypeQuerySubject.getValue();
  }

  constructor() {}
}
