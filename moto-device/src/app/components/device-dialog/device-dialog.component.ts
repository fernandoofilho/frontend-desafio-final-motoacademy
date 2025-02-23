import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Device } from '../../../shared/models/device.model';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import getSrc from '../../shared/functions/get_src';
@Component({
  selector: 'app-device-dialog',
  imports: [CommonModule],
  templateUrl: './device-dialog.component.html',
  styleUrl: './device-dialog.component.css',
})
export class DeviceDialogComponent implements OnInit {
  dataSource: Device | undefined;

  getImageLink(path: string) {
    return getSrc(path);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Device
  ) {
    this.dataSource = { ...data };
  }

  ngOnInit(): void {}
}
