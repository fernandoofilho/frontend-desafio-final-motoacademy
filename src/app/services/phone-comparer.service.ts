import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Device } from '../../shared/models/device.model';

@Injectable({
  providedIn: 'root',
})
export class PhoneComparerService {
  private device1Subject = new BehaviorSubject<Device | null>(null);
  private device2Subject = new BehaviorSubject<Device | null>(null);

  device1$ = this.device1Subject.asObservable();
  device2$ = this.device2Subject.asObservable();

  constructor() {}

  setDevice1(device: Device) {
    this.device1Subject.next(device);
  }
  clearDevice1(){
    this.device1Subject.next(null);
  }
  clearDevice2(){
    this.device2Subject.next(null);
  }
  setDevice2(device: Device) {
    this.device2Subject.next(device);
  }

  getDevice1(): Device | null {
    return this.device1Subject.value;
  }

  getDevice2(): Device | null {
    return this.device2Subject.value;
  }
}
