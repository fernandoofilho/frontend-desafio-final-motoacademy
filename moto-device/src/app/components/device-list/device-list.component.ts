import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Device } from '../../../shared/models/device.model';
import { DeviceCardComponent } from '../device-card/device-card.component';
import { GroupFilterService } from '../../services/group-filter.service';
import { YearFilterService } from '../../services/year-filter.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, DeviceCardComponent],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '0.8s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.8s ease-in',
          style({ transform: 'translateY(-100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css',
})
export class DeviceListComponent implements OnInit, OnDestroy {
  deviceLists: Device[] = [];

  searchQuery$!: Observable<string>;
  yearQuery$!: Observable<string>;
  GroupQuery$!: Observable<string>;

  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private FilterGroupService: GroupFilterService,
    private filterYearService: YearFilterService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.searchQuery$ = this.searchService.searchQuery$;
    this.GroupQuery$ = this.FilterGroupService.groupQuery$;
    this.yearQuery$ = this.filterYearService.yearQuery$;

    this.searchQuery$
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        if (query) {
          this.apiService.search(query).subscribe((response) => {
            this.setDeviceList(response);
          });
        } else {
          this.apiService.getRandom().subscribe((response) => {
            this.setDeviceList(response);
          });
        }
      });
  }

  setDeviceList(devices: Device[]) {
    this.deviceLists = devices;
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
