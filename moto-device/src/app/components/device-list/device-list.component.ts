import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  takeUntil,
} from 'rxjs/operators';
import { Device } from '../../../shared/models/device.model';
import { ApiService } from '../../services/api.service';
import { GroupFilterService } from '../../services/filters/group-filter.service';
import { SearchService } from '../../services/filters/search.service';
import { YearFilterService } from '../../services/filters/year-filter.service';
import { searchQuery } from '../../shared/types/search';
import { DeviceCardComponent } from '../device-card/device-card.component';
import { SkeletonDeviceListComponent } from '../skeleton-device-list/skeleton-device-list.component';
import getSrc from '../../shared/functions/get_src';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, DeviceCardComponent, SkeletonDeviceListComponent],
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
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnDestroy, OnInit {
  deviceLists: Device[] = [];
  searchQuery$!: Observable<string>;
  yearQuery$!: Observable<string>;
  GroupQuery$!: Observable<string>;

  isLoading: boolean = false;
  noContent: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private FilterGroupService: GroupFilterService,
    private filterYearService: YearFilterService,
    private apiService: ApiService,
    
  ) {}

  ngOnInit(): void {
    this.searchQuery$ = this.searchService.searchQuery$;
    this.GroupQuery$ = this.FilterGroupService.groupQuery$;
    this.yearQuery$ = this.filterYearService.yearQuery$;

    combineLatest([
      this.searchQuery$.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.GroupQuery$.pipe(startWith(''), distinctUntilChanged()),
      this.yearQuery$.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([search, group, year]) => {
        this.isLoading = true; 
        this.noContent = false; 

        const query: searchQuery = { search, group, year };
        if (Object.values(query).some((value) => value?.length > 0)) {
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
    this.isLoading = false; 
    this.noContent = devices.length === 0; 
  }

  getImageLink(path: string) {
    return getSrc(path);
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
