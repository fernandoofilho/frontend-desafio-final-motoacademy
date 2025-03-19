import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDialogComponent } from '../device-dialog/device-dialog.component';
import { Device } from '../../../shared/models/device.model';
@Component({
  selector: 'app-device-card',
  imports: [CommonModule],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.css',
})
export class DeviceCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() image: string | undefined;
  @Input() deviceData: Device | undefined;
  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      data: this.deviceData,
      // width: '70%',
      height: 'auto',
      // maxWidth: '90vw',
      minWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
