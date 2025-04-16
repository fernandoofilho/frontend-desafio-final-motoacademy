import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-device-list',
  imports: [CommonModule],
  templateUrl: './skeleton-device-list.component.html',
  styleUrl: './skeleton-device-list.component.css',
})
export class SkeletonDeviceListComponent implements OnInit {
  @Input() total: number = 5;
  arrayElements: number[] = [];
  
  ngOnInit(): void {
    this.arrayElements = Array.from({ length: this.total }, () => 0);
  }
}
