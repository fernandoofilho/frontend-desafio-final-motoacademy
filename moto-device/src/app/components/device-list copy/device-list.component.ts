import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Device } from '../../shared/models/device.model';
import { DeviceCardComponent } from '../device-card/device-card.component';
@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, DeviceCardComponent],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css',
})
export class DeviceListComponent implements OnInit, OnDestroy {
  searchQuery$!: Observable<string>;
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private apiService: ApiService
  ) {}
  deviceLists: Device[] = [];

  setDeviceList(devices: Device[]) {
    this.deviceLists = devices;
    console.log(this.deviceLists);
  }

  getDeviceName(device: Device): string {
    return String(device['Model']);
  }

  getDeviceDescription(device: Device): string {
    const data = {
      'Lançado em': device.info['released'],
      'Anunciado em': device.info['Announced'],
      Bluetooth: device.specs['Bluetooth'],
      'CPU Clock': device.specs['CPU Clock'],
      Dimensões: device.specs['Dimensions'],
      Plataforma: device.specs['Platform'],
      Resolução: device.specs['Resolution'],
      USB: device.specs['USB'],
    };

    const description =
      Object.entries(data)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}: ${value}`)
        .join('. ') + '.';

    return `Lançado em ${description}`;
  }

  ngOnInit(): void {
    this.searchQuery$ = this.searchService.searchQuery$;
    this.searchQuery$
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        if (query) {
          this.apiService.search(query).subscribe((response) => {
            this.setDeviceList(response);
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
